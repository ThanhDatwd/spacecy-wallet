/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from 'react';
// react-hook-form
import { SubmitHandler, useForm } from 'react-hook-form';
// yup
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// model
import { Collection, CustomFile, OptionSelectCustom } from 'models';
// redux
import { useSelector } from 'react-redux';
import { selectChainId } from 'redux/slices/web3InfoSlice';
// styled
import { FieldSubTitle, FieldTitleName, PageTitle } from './styled';
import { Asterisk, ErrorMessage } from '../Common/styled';
//components
import FieldInput from 'components/CustomField/FieldInput';
import ButtonGradient from 'components/CustomUI/ButtonGradient';
import AutoCompleteCustom2 from 'components/CustomField/AutoCompleteCustom2';
import UploadMediaCustom from 'components/CustomField/UploadMediaCustom';
import SelectCustom from 'components/CustomField/SelectCustom';
// mui
import { Box, CircularProgress, Stack, Typography, useTheme } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
// constants
import { CONTRACT } from '../../../constants';
import { isOurCollection1155Address } from 'utils';
//images
import EthIcon from 'assets/images/network/eth.webp';
import BinanceIcon from 'assets/images/network/binance.webp';
import PolygonIcon from 'assets/images/network/polygon.webp';
import AvaxIcon from 'assets/images/network/avax.webp';
// hooks
import { useDebounce, useIsFirstRender } from 'hooks';
// vars
import { Category, listCategory } from 'components/CustomUI/FilterItemGroup/FilterCategory';
import ButtonWhite from 'components/CustomUI/ButtonWhite';

const listBlockchain: OptionSelectCustom<string>[] = [
	{ image: EthIcon, name: 'Rinkeby', value: '4' },
	{ image: BinanceIcon, name: 'Binance', value: '97' },
	// { image: PolygonIcon, name: 'Polygon', value: 80001 },
	// { image: AvaxIcon, name: 'Avalanche', value: 43113 },
];

export interface FormAddOrEditCollectionProps {
	isEdit: boolean;
	currentCollection?: Collection | null | undefined;
	onSubmit: SubmitHandler<IFormAddOrEditCollectionInputs>;
	checkExistCollectionName: Function;
	existed: boolean;
	loadingCheckName: boolean;
}

export interface IFormAddOrEditCollectionInputs {
	logo: any;
	background: any;
	description: string;
	collectionName: string;
	royalties: number;
	category: number;
	chainId: number;
}

export default function FormAddOrEditCollection({
	isEdit,
	currentCollection,
	onSubmit,
	checkExistCollectionName,
	existed,
	loadingCheckName,
}: FormAddOrEditCollectionProps) {
	const theme = useTheme();
	const isLightTheme = theme.palette.mode === 'light';

	// hook
	const isFirstRender = useIsFirstRender();

	// useState
	const [name, setName] = useState<string>('');
	const [description, setDesciption] = useState<string>('');
	const [logo, setLogo] = useState<CustomFile | string | null>(null);
	const [background, setBackground] = useState<CustomFile | string | null>(null);
	const [fieldCollectionNameValue, setFieldCollectionNameValue] = useState<string>('');
	const [currentCategoryTransformed, setCurrentCategoryTransformed] = useState<
		OptionSelectCustom<string> | null | undefined
	>();
	const [currentBlockchain, setCurrentBlockchain] = useState<OptionSelectCustom<string>>(
		listBlockchain[0]
	);
	const [touch, setTouch] = useState<boolean>(false);

	// hooks
	const debouncedCollectionNameValue = useDebounce<string>(fieldCollectionNameValue, 500);

	// useSelector
	const chainId = useSelector(selectChainId);

	// vars
	const listCategoryTransformed: OptionSelectCustom<string>[] = listCategory
		.map((item: Category) => ({ name: item.name, value: item.value.toString() }))
		.filter((item: OptionSelectCustom<string>, idx: number) => {
			return item.name !== 'Box';
		});

	// useEffect
	useEffect(() => {
		if (isEdit && currentCollection) {
			setValue('logo', currentCollection.logo);
			setValue('background', currentCollection.background);
			setValue('description', currentCollection.description || '');
			setValue('collectionName', currentCollection.collectionName);
			setValue('royalties', currentCollection.royalties);
			setValue('category', currentCollection.category);
			setValue('chainId', currentCollection.chainId);
			setLogo(currentCollection.logo);
			setBackground(currentCollection.background);

			const categoryFilter = listCategory.find(
				(category: Category) => category.value === currentCollection.category
			);
			setCurrentCategoryTransformed({
				name: categoryFilter!.name,
				value: categoryFilter!.value.toString(),
			});

			const blockchainFilter = listBlockchain.find(
				(blockchain: OptionSelectCustom<string>) =>
					Number(blockchain.value) === currentCollection.chainId
			);

			if (blockchainFilter) setCurrentBlockchain(blockchainFilter);
		} else {
			reset();
		}
		if (!getValues('chainId')) setValue('chainId', Number(listBlockchain[0].value));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentCollection]);

	// handle change field collection name value
	useEffect(() => {
		if (isFirstRender) return;

		setTouch(true);
		checkExistCollectionName(debouncedCollectionNameValue);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedCollectionNameValue]);

	// react hook form
	const schema = yup
		.object({
			logo: yup
				.mixed()
				.required()
				.test('Require a file', 'Logo is required!', (value: any) => {
					return Boolean(value?.length !== 0);
				}),
			background: yup
				.mixed()
				.required()
				.test('Require a file', 'Background is required!', (value: any) => {
					return Boolean(value?.length !== 0);
				}),
			description: yup.string().required(),
			collectionName: yup
				.string()
				.required()
				.test('', '', function () {
					return !existed;
				}),
			royalties: yup.number().min(0).max(100).required(),
			category: yup.number().required(),
			chainId: yup.number().required(),
		})
		.required();

	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors, isSubmitting },
		reset,
		formState,
	} = useForm<IFormAddOrEditCollectionInputs>({
		resolver: yupResolver(schema),
	});

	// functions
	const handleChangeCategory = (
		categoryTransformed: OptionSelectCustom<string> | null | undefined
	) => {
		if (categoryTransformed) {
			setValue('category', Number(categoryTransformed.value));
			setCurrentCategoryTransformed(categoryTransformed);
		} else {
			setValue('category', 0);
			setCurrentCategoryTransformed(undefined);
		}
	};

	const handleDropLogo = useCallback(
		(acceptedFiles) => {
			const file = acceptedFiles[0];
			if (file) {
				setValue('logo', { ...file, preview: URL.createObjectURL(file), raw: file });
				setLogo({ ...file, preview: URL.createObjectURL(file) });
			}
		},
		[setValue]
	);

	const handleDropBackground = useCallback(
		(acceptedFiles) => {
			const file = acceptedFiles[0];
			if (file) {
				setValue('background', {
					...file,
					preview: URL.createObjectURL(file),
					raw: file,
				});

				setBackground({ ...file, preview: URL.createObjectURL(file) });
			}
		},
		[setValue]
	);

	// Debouncing set input collection Name
	const handleChangeInputName = (e: any) => {
		const value = e.target.value;
		setName(e.target.value);
		setFieldCollectionNameValue(value);
	};

	const handleChangeBlockchain = (blockchain: OptionSelectCustom<string>) => {
		setCurrentBlockchain(blockchain);
		setValue('chainId', Number(blockchain.value));
	};

	const isEditCollectionOutsideForbitExchange = (): boolean => {
		if (
			isEdit &&
			chainId &&
			currentCollection &&
			!isOurCollection1155Address(currentCollection.collectionAddress, chainId)
		) {
			return true;
		}
		return false;
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<PageTitle> {isEdit ? 'Edit Collection' : 'Create A Collection'}</PageTitle>
			{/* <Typography variant="body2">
				<Asterisk /> Required field
			</Typography> */}
			{isEdit && (
				<Box>
					<Typography variant="body2" component="span" sx={{ mr: 1, color: 'red' }}>
						Note:
					</Typography>
					<Typography variant="body2" component="span">
						Collections outside Metaspacecy can not edit!
					</Typography>
				</Box>
			)}

			<FieldTitleName sx={{ mt: 2 }}>
				Logo Image <Asterisk />{' '}
			</FieldTitleName>

			<FieldSubTitle>
				This image will be used for navigation. 350 x 350 recommended.
			</FieldSubTitle>
			{/* <LogoBox> */}
			<UploadMediaCustom
				accept={{
					'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
				}}
				file={logo}
				maxSize={10485760}
				onDrop={handleDropLogo}
				error={Boolean(errors.logo)}
				sx={{
					borderRadius: '50%',
					margin: '1.5rem 0',
					width: 280,
					height: 280,
					border: '1px dashed #5A5D79',
				}}
			/>
			{/* </LogoBox> */}
			{errors.logo?.message && <ErrorMessage>{errors.logo?.message}</ErrorMessage>}

			<FieldTitleName>
				Banner Image <Asterisk />
			</FieldTitleName>
			<FieldSubTitle>
				This image will appear at the top of your collection page. Recommended size: 1800 x
				400.
			</FieldSubTitle>

			{/* <BannerBox> */}
			<UploadMediaCustom
				accept={{
					'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
				}}
				file={background}
				maxSize={10485760}
				onDrop={handleDropBackground}
				error={Boolean(errors.background)}
				sx={{
					borderRadius: '10px',
					margin: '1.5rem 0',
					maxWidth: 700,
					height: 280,
					border: '1px dashed #5A5D79',
				}}
			/>
			{/* </BannerBox> */}
			{errors.background?.message && (
				<ErrorMessage>{errors.background?.message}</ErrorMessage>
			)}

			<Box sx={{ marginTop: 5, position: 'relative' }}>
				<FieldTitleName>
					Name <Asterisk />{' '}
					<Box sx={{ marginLeft: '10px', fontSize: '12px', color: '#FF0000' }}>
						{name.length} of 128 characters used
					</Box>
				</FieldTitleName>
				<FieldInput
					id="collection-name"
					type="text"
					maxLength={128}
					registerHookForm={{ ...register('collectionName') }}
					placeholder="Example: Metaspacecy collection"
					value={fieldCollectionNameValue}
					onChange={handleChangeInputName}
					readOnly={isEditCollectionOutsideForbitExchange()}
				/>
				{loadingCheckName ? (
					<CircularProgress
						sx={{
							position: 'absolute',
							top: '50%',
							transform: 'translateY(-25%)',
							right: 15,
							zIndex: 10,
						}}
						size={30}
					/>
				) : (
					!existed &&
					touch && (
						<CheckIcon
							sx={{
								position: 'absolute',
								top: '50%',
								transform: 'translateY(25%)',
								right: 15,
								zIndex: 10,
								width: 30,
								height: 30,
								color: 'green',
							}}
						/>
					)
				)}

				{errors.collectionName?.message && (
					<ErrorMessage>{errors.collectionName?.message}</ErrorMessage>
				)}

				{existed && <ErrorMessage>Collection name had already exitsted</ErrorMessage>}
			</Box>
			<Box sx={{ marginTop: 5 }}>
				<FieldTitleName>
					Description <Asterisk />
					<Box sx={{ marginLeft: '10px', fontSize: '12px', color: '#FF0000' }}>
						{description.length} of 1500 characters used
					</Box>
				</FieldTitleName>
				<FieldInput
					id="description"
					type="text"
					maxLength={1500}
					registerHookForm={{ ...register('description') }}
					placeholder="Description: 0 of 1500 characters used"
					readOnly={isEditCollectionOutsideForbitExchange()}
					onChange={(e: any) => setDesciption(e.target.value)}
				/>
				{errors.description?.message && (
					<ErrorMessage>{errors.description?.message}</ErrorMessage>
				)}
			</Box>
			<Box sx={{ marginTop: 5 }}>
				<FieldTitleName>
					Category <Asterisk />
				</FieldTitleName>
				<FieldSubTitle>
					A type of characteristics that the collection belongs to. Typically, artwork,
					fan tokens, music, etc. In alpha release only artwork and its relative are
					supported.
				</FieldSubTitle>
				<AutoCompleteCustom2
					currentItem={currentCategoryTransformed}
					listItem={listCategoryTransformed}
					onChange={handleChangeCategory}
					placeholder="Category name..."
					sx={{
						border: '1px solid #E7E8EC',
						borderRadius: '12px',
					}}
				/>
				{errors.category?.message && (
					<ErrorMessage>{errors.category?.message}</ErrorMessage>
				)}
			</Box>
			<Box sx={{ marginTop: 5 }}>
				<FieldTitleName>
					Royalty <Asterisk />
				</FieldTitleName>
				<FieldSubTitle>
					Collection’s royalty fee applies to all of the items in the collection is paid
					to the NFT creator or right holder every time the NFT is sold or re-sold.
				</FieldSubTitle>

				<FieldInput
					id="royalties"
					type="number"
					registerHookForm={{ ...register('royalties') }}
					placeholder="E.g. 2.5"
					readOnly={isEdit}
				/>
				{isEdit && (
					<Box sx={{ mt: 1 }}>
						<Typography variant="body2" component="span" sx={{ mr: 1, color: 'red' }}>
							Note:
						</Typography>
						<Typography variant="body2" component="span">
							Can not edit royalties fee.
						</Typography>
					</Box>
				)}

				{errors.royalties?.message && (
					<ErrorMessage>{errors.royalties?.message}</ErrorMessage>
				)}
			</Box>
			{/* <Box sx={{ marginTop: 5 }}>
				<FieldTitleName>
					Blockchain <Asterisk />
				</FieldTitleName>
				<FieldSubTitle>
					A blockchain network where new items are minted is set to the one users connect
					to.
				</FieldSubTitle>
				<SelectCustom
					currentItem={currentBlockchain}
					listItem={listBlockchain}
					onChange={handleChangeBlockchain}
					sx={{
						padding: '12px',
					}}
					layout="flex-start"
					readOnly={isEdit}
				/>
				{errors.chainId?.message && <ErrorMessage>{errors.chainId?.message}</ErrorMessage>}
			</Box> */}
			{/* <Box sx={{ marginTop: 5 }}>
				<FieldTitleName>Explicit & sensitive content</FieldTitleName>
				<FieldSubTitle>
					This collection is set as explicit and sensitive content by default.
				</FieldSubTitle>
			</Box> */}
			<Box sx={{ marginTop: 4, width: '150px', mb: 4 }}>
				<ButtonWhite type="submit" disabled={isSubmitting}>
					<Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
						{isSubmitting && <CircularProgress sx={{ color: 'white' }} size={25} />}
						<Typography sx={{ fontSize: '14px' }}>
							{isEdit
								? isSubmitting
									? 'Updating...'
									: 'Update'
								: isSubmitting
								? 'Creating...'
								: 'Create'}
						</Typography>
					</Stack>
				</ButtonWhite>
			</Box>
		</form>
	);
}
