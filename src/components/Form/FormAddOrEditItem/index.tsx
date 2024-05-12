/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// react-hook-form
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
// yup
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// model
import { Collection, CustomFile, NFT, OptionSelectCustom } from 'models';
// styled
import {
	FieldSubTitle,
	FieldTitleName,
	PageTitle,
	InputGroup,
	FieldIcon,
	PreviewItemContainer,
	PreviewItemWrapper,
} from './styled';
import { Asterisk, ErrorMessage } from '../Common/styled';
// components
import { Box, Button, CircularProgress, Stack, Typography, useTheme } from '@mui/material';
import ButtonGradient from 'components/CustomUI/ButtonGradient';
import ButtonPlus from 'components/CustomUI/ButtonPlus';
import FieldInput from 'components/CustomField/FieldInput';
import ImageCustomInput from 'components/CustomField/ImageCustomInput';
import SwitchButton from 'components/CustomField/SwitchButton';
import AutoCompleteCustom2 from 'components/CustomField/AutoCompleteCustom2';
import PreviewItem from 'components/CustomUI/PreviewItem';
import UploadMediaCustom from 'components/CustomField/UploadMediaCustom';
// redux
import { useSelector } from 'react-redux';
import { selectListCollection } from 'redux/slices/collectionSlice';
//utils
import { getFileType } from 'utils';

import AddIcon from '@mui/icons-material/Add';

// icon
import IconHouse from 'assets/icons/icon-houses.svg';
import IconList from 'assets/icons/icon-list.svg';
import IconLock from 'assets/icons/lock-black.webp';
import IconAttendtion from 'assets/icons/icon-attendtion.svg';
import IconStar from 'assets/icons/icon-star.svg';
import IconPlus from 'assets/icons/icon-plus.svg';
import ButtonWhite from 'components/CustomUI/ButtonWhite';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';

export interface FormAddOrEditItemProps {
	isEdit: boolean;
	currentItem?: NFT | null | undefined;
	listCollectionTemp: Collection[];
	handleChangeFreezeOption: (value: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit: SubmitHandler<IFormAddOrEditItemInputs>;
}

export interface IFormAddOrEditItemInputs {
	itemMedia: string;
	itemThumbnail: string;
	itemName: string;
	description: string;
	collectionId: string;
	quantity: number;
	externalUrl: string;
	properties: any;
	// userAddress: string; //must have
	// chainId: number; //must have
}

const Default = {
	properties: [],
};

function FormAddOrEditItem({
	isEdit,
	currentItem,
	listCollectionTemp,
	handleChangeFreezeOption,
	onSubmit,
}: FormAddOrEditItemProps) {
	const { collectionId } = useParams();
	const theme = useTheme();
	// useState
	const [media, setMedia] = useState<CustomFile | string | null>(null);
	const [thumbnail, setThumbnail] = useState<CustomFile | string | null>(null);
	const [name, setName] = useState<string>('');
	const [description, setDesciption] = useState<string>('');
	// vars
	const isLightTheme = theme.palette.mode === 'light';

	const [currentCollectionTransformed, setCurrentCollectionTransformed] =
		useState<OptionSelectCustom<string>>();
	// useSelector
	// const listCollection: Collection[] = useSelector(selectListCollection);

	const listCollectionTransformed: OptionSelectCustom<string>[] = listCollectionTemp.map(
		({ collectionName, _id, logo }) => ({
			name: collectionName,
			value: _id,
			image: logo,
		})
	);

	// useEffect
	useEffect(() => {
		if (isEdit && currentItem) {
			setValue('itemMedia', currentItem.itemMedia);
			setValue('itemThumbnail', currentItem.itemPreviewMedia);
			setValue('itemName', currentItem.itemName);
			setValue('description', currentItem.description);
			setValue('collectionId', currentItem.collectionId);

			setMedia(currentItem.itemMedia);
			setThumbnail(currentItem.itemPreviewMedia);
			setName(currentItem.itemName);
		} else {
			reset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentItem]);

	useEffect(() => {
		if (isEdit && currentItem) {
			const collectionFilter = listCollectionTemp.find(
				(collection: Collection) => collection._id === currentItem.collectionId
			);

			if (collectionFilter)
				setCurrentCollectionTransformed({
					name: collectionFilter.collectionName,
					value: collectionFilter._id,
					image: collectionFilter.logo,
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [listCollectionTemp]);

	// if add item in collection page
	useEffect(() => {
		if (!isEdit && collectionId) {
			setValue('collectionId', collectionId);

			const current = listCollectionTransformed.find((item) => item.value === collectionId);
			if (current) setCurrentCollectionTransformed(current);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [listCollectionTemp]);

	// react hook form
	const schema = yup
		.object({
			// externalUrl: yup.string().required(),
			itemMedia: yup
				.mixed()
				.required()
				.test('require a file', 'File is required!', (value: any) => {
					return Boolean(value?.length !== 0);
				}),
			itemThumbnail: yup.mixed().test('require a file', 'File is required', (value: any) => {
				if (!media) return false;
				if (getFileType(media) === 'mp3' && !thumbnail) return false;
				return true;
			}),
			itemName: yup.string().required(),
			description: yup.string().required(),
			collectionId: yup.string().required(),
			properties: yup
				.array()
				.of(
					yup.object().shape({
						value: yup.string().required('Value is not valid'),
						key: yup.string().required('Key is not valid'),
					})
				)
				.required(),
			quantity: yup
				.number()
				.integer()
				.min(1)
				.max(10)
				.transform((cv, ov) => {
					// handle case not enter a number throw error: NaN cast from ""
					return ov === '' ? undefined : cv;
				})
				.test('require quantity', 'Quantity is required!', (value: any) => {
					// quantity not required when edit
					if (!isEdit) {
						return Boolean(value);
					}
					return true;
				}),
		})
		.required();

	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<IFormAddOrEditItemInputs>({
		resolver: yupResolver(schema),
		defaultValues: Default,
	});

	// functions
	const handleDropMedia = useCallback(
		(acceptedFiles) => {
			const file = acceptedFiles[0];
			if (file) {
				setValue('itemMedia', { ...file, preview: URL.createObjectURL(file), raw: file });

				setMedia({ ...file, preview: URL.createObjectURL(file) });
				if (getFileType(file) !== 'mp3') setThumbnail(null);
			}
		},
		[setValue]
	);

	const handleDropThumbnail = useCallback(
		(acceptedFiles) => {
			const file = acceptedFiles[0];
			if (file) {
				setValue('itemThumbnail', {
					...file,
					preview: URL.createObjectURL(file),
					raw: file,
				});

				setThumbnail({ ...file, preview: URL.createObjectURL(file) });
			}
		},
		[setValue]
	);

	const handleChangeCollection = (
		collectionTransformed: OptionSelectCustom<string> | null | undefined
	) => {
		if (collectionTransformed) {
			setValue('collectionId', collectionTransformed.value);
			setCurrentCollectionTransformed(collectionTransformed);
		} else {
			setValue('collectionId', '');
			setCurrentCollectionTransformed(undefined);
		}
	};
	const [listOptions, setListOptions] = useState<any[]>([]);
	// HANDLE CHANGE PROPERTIES
	const handleChangePropertiesValue = (e: any, i: any) => {
		const value = e.target.value;
		const list = listOptions.map((item) => {
			if (item.index === i) {
				return { ...item, value: value };
			}
			return item;
		});
		setListOptions(list);
	};
	const handleChangePropertiseKey = (e: any, i: any) => {
		const key = e.target.value;
		const list = listOptions.map((item) => {
			if (item.index === i) {
				return { ...item, key: key };
			}
			return item;
		});
		setListOptions(list);
	};
	// HANDLE ADD OPTION
	const [currentPropertiesKey, setCurrentPropertiesKey] = useState<string>();
	const [currentPropertiesValue, setCurrentPropertiesValue] = useState<string>();
	const handleAddOptionItem = () => {
		if (currentPropertiesKey && currentPropertiesValue) {
			if (listOptions.length > 0) {
				// const p = getValues('properties');
				// p.push({
				// 	index: listOptions[listOptions.length - 1]?.index + 1,
				// 	value: currentPropertiesValue,
				// 	key: currentPropertiesKey,
				// });
				// setValue('properties', p);
				setListOptions((prev) => [
					...prev,
					{
						index: prev[prev.length - 1]?.index + 1,
						value: currentPropertiesValue,
						key: currentPropertiesKey,
					},
				]);
				setCurrentPropertiesKey('');
				setCurrentPropertiesValue('');
				return;
			}
			setListOptions([
				{ index: 0, value: currentPropertiesValue, key: currentPropertiesKey },
			]);
			setCurrentPropertiesKey('');
			setCurrentPropertiesValue('');
		}
	};
	// HANDLE DELETE OPTION
	const handleDeleteOptionItem = (index: any) => {
		let newlist = listOptions.filter((item: any) => item.index !== index);
		setListOptions(newlist);
	};
	const handlePreSubmit = () => {
		setValue('properties', listOptions);
		console.log('listOptions', listOptions);
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<PageTitle sx={{ mt: 16, textAlign: 'center', mb: 4 }}>
				{isEdit ? 'Edit Item' : 'Create A New Item'}
			</PageTitle>
			{/* <Typography variant="body2" sx={{ mb: 2 }}>
				<Asterisk /> Required field
			</Typography> */}
			<PreviewItemContainer>
				<Box>
					<FieldTitleName>
						Image, Video, Audio, or 3D Model <Asterisk />
					</FieldTitleName>
					{/* <FieldSubTitle>
						Recommended file types: JPG, PNG, GIF, SVG, WEBM, MP4, MP3. Max size: 10 MB.
					</FieldSubTitle> */}
					<FieldSubTitle>Drag or choose your file to upload</FieldSubTitle>

					<Box sx={{ maxWidth: 320 }}>
						<Box
							sx={{
								position: 'relative',
								margin: '1.5rem 0',
								width: '100%',
								...(getFileType(media) === 'mp3'
									? {
											height: '120px',
									  }
									: {
											paddingBottom: '100%',
									  }),
							}}
						>
							<UploadMediaCustom
								accept={{
									'image/*': [
										'.png',
										'.gif',
										'.jpeg',
										'.jpg',
										'.mp3',
										'.mp4',
										'.glb',
									],
								}}
								file={media}
								maxSize={10485760}
								onDrop={handleDropMedia}
								error={Boolean(errors.itemMedia)}
								sx={{
									position: 'absolute',
									top: 0,
									left: 0,
									width: '100%',
									height: '100%',
									borderRadius: '12px',
									padding: 1,
									border: '1px dashed #5A5D79',
									objectFit: 'contain',
								}}
							/>
						</Box>
						{errors.itemMedia?.message && (
							<ErrorMessage>{errors.itemMedia?.message}</ErrorMessage>
						)}
					</Box>

					{media && getFileType(media) === 'mp3' && (
						<Fragment>
							<FieldTitleName>
								Preview Image <Asterisk />
							</FieldTitleName>
							<FieldSubTitle>
								Provide an image (PNG, JPG, or GIF) for the card display of your
								item.
							</FieldSubTitle>

							<Box sx={{ maxWidth: 320 }}>
								<Box
									sx={{
										position: 'relative',
										margin: '1.5rem 0',
										width: '100%',
										paddingBottom: '100%',
									}}
								>
									<UploadMediaCustom
										accept={{
											'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
										}}
										file={thumbnail}
										maxSize={10485760}
										onDrop={handleDropThumbnail}
										error={Boolean(errors.itemThumbnail)}
										sx={{
											position: 'absolute',
											top: 0,
											left: 0,
											width: '100%',
											height: '100%',
											borderRadius: '12px',
											padding: 1,
											border: '1px dashed',
											objectFit: 'contain',
										}}
									/>

									{errors.itemThumbnail?.message && (
										<ErrorMessage>{errors.itemThumbnail?.message}</ErrorMessage>
									)}
								</Box>
							</Box>
						</Fragment>
					)}
				</Box>
				{/* <PreviewItemWrapper>
					<PreviewItem media={media} thumbnail={thumbnail} name={name} />
				</PreviewItemWrapper> */}
			</PreviewItemContainer>

			<InputGroup sx={{ marginTop: 5 }}>
				<FieldTitleName>
					Name <Asterisk />
					<Box sx={{ marginLeft: '10px', fontSize: '12px', color: '#FF0000' }}>
						{name.length} of 128 characters used
					</Box>
				</FieldTitleName>
				<FieldInput
					id="item-name"
					type="text"
					maxLength={128}
					registerHookForm={{ ...register('itemName') }}
					placeholder="Item name"
					onChange={(e: any) => setName(e.target.value)}
				/>
				{errors.itemName?.message && (
					<ErrorMessage>{errors.itemName?.message}</ErrorMessage>
				)}
			</InputGroup>
			<InputGroup pt="20px">
				<FieldTitleName>External link</FieldTitleName>
				<FieldSubTitle>
					We will include a link to this URL on this item's detail page, so that users can
					click to learn more about it. You are welcome to link to your own webpage with
					more details.
				</FieldSubTitle>

				<FieldInput
					id="item-description"
					type="text"
					registerHookForm={{ ...register('externalUrl') }}
					placeholder="https://yoursite.io/item/123"
				/>
				{/* {errors.externalUrl?.message && (
					<ErrorMessage>{errors.externalUrl?.message}</ErrorMessage>
				)} */}
			</InputGroup>
			<InputGroup pt="20px">
				<FieldTitleName>
					Description <Asterisk />
					<Box sx={{ marginLeft: '10px', fontSize: '12px', color: '#FF0000' }}>
						{description.length} of 1500 characters used
					</Box>
				</FieldTitleName>

				<FieldInput
					id="item-description"
					type="text"
					maxLength={1500}
					registerHookForm={{ ...register('description') }}
					placeholder="Provide a detailed description of your item"
					onChange={(e: any) => setDesciption(e.target.value)}
				/>
				{errors.description?.message && (
					<ErrorMessage>{errors.description?.message}</ErrorMessage>
				)}
			</InputGroup>

			<InputGroup pt="20px">
				<FieldTitleName>
					Collection <Asterisk />
				</FieldTitleName>
				<FieldSubTitle>This is the collection where your item belongs to.</FieldSubTitle>

				<AutoCompleteCustom2
					currentItem={currentCollectionTransformed}
					listItem={listCollectionTransformed}
					onChange={handleChangeCollection}
					placeholder="Collection name..."
					disabled={isEdit}
					sx={{
						borderRadius: '12px',
						border: '1px solid #E7E8EC',
					}}
				/>

				{errors.collectionId?.message && (
					<ErrorMessage>{errors.collectionId?.message}</ErrorMessage>
				)}
			</InputGroup>

			<InputGroup pt="20px">
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					spacing={2}
					paddingBottom="20px"
					borderBottom="1px solid #E7E8EC"
				>
					<Stack direction="row">
						<FieldIcon>
							<img src={IconList} alt="atom icon" />
						</FieldIcon>
						<Box>
							<FieldTitleName>Properties</FieldTitleName>
							<FieldSubTitle>
								Textual traits that show up as rectangles.
							</FieldSubTitle>
						</Box>
					</Stack>
					{/* 	thanh nhập dữ liệu */}
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							height: '50px',
							mt: 1,
						}}
					>
						<FieldInput
							sx={{
								borderRadius: '0',
								height: '100% !important',
							}}
							type="text"
							maxLength={128}
							placeholder="Key"
							value={currentPropertiesKey}
							onChange={(e: any) => {
								setCurrentPropertiesKey(e.target.value);
							}}
						/>
						<FieldInput
							sx={{ borderRadius: '0', height: '100% !important' }}
							type="text"
							maxLength={128}
							placeholder="Value"
							value={currentPropertiesValue}
							onChange={(e: any) => {
								setCurrentPropertiesValue(e.target.value);
							}}
						/>

						<Box>
							<ButtonWhite
								sx={{
									height: '50px',
									px: 0,
									borderTopLeftRadius: '0',
									borderBottomLeftRadius: '0',
								}}
								onClick={handleAddOptionItem}
							>
								<AddIcon />
							</ButtonWhite>
						</Box>
					</Box>
				</Stack>
				<Box>
					{listOptions.map((item, i) => {
						return (
							<Box
								key={i}
								sx={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									height: '50px',
									mt: 1,
								}}
							>
								<ButtonWhite
									onClick={() => handleDeleteOptionItem(item.index)}
									sx={{
										width: 'max-content',
										height: '100% !important',
										borderStartEndRadius: '0',
										borderEndEndRadius: '0',
									}}
								>
									<ClearSharpIcon />
								</ButtonWhite>
								<FieldInput
									sx={{ borderRadius: '0', height: '100% !important' }}
									type="text"
									maxLength={128}
									placeholder="Type"
									value={item.key}
									onChange={(e: any) => {
										handleChangePropertiseKey(e, item.index);
									}}
								/>
								<FieldInput
									sx={{
										borderTopLeftRadius: '0',
										borderBottomLeftRadius: '0',
										height: '100% !important',
									}}
									type="text"
									maxLength={128}
									placeholder="Value"
									value={item.value}
									onChange={(e: any) => {
										handleChangePropertiesValue(e, item.index);
									}}
								/>
							</Box>
						);
					})}
					{Array.isArray(errors.properties) ? (
						<Box>
							<ErrorMessage>Key or value is not valid</ErrorMessage>
						</Box>
					) : (
						<Box>
							{errors.properties && (
								<ErrorMessage>{(errors.properties as any)?.message}</ErrorMessage>
							)}
						</Box>
					)}
				</Box>
			</InputGroup>
			{/* <InputGroup>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					spacing={2}
					paddingBottom="20px"
					borderBottom="1px solid #E7E8EC"
				>
					<Stack direction="row">
						<FieldIcon>
							<img src={IconStar} alt="atom icon" />
						</FieldIcon>
						<Box>
							<FieldTitleName>Levels</FieldTitleName>
							<FieldSubTitle>
								Numerical traits that show as a progress bar.
							</FieldSubTitle>
						</Box>
					</Stack>

					<Box>
						<ButtonPlus>
							<img src={IconPlus} alt="icon plus" />
						</ButtonPlus>
						<ButtonWhite sx={{ minWidth: '43px', px: 0 }}>
							<AddIcon />
						</ButtonWhite>
					</Box>
				</Stack>
			</InputGroup>
			<InputGroup>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					spacing={2}
					paddingBottom="20px"
					borderBottom="1px solid #E7E8EC"
				>
					<Stack direction="row">
						<FieldIcon>
							<img src={IconHouse} alt="atom icon" />
						</FieldIcon>
						<Box>
							<FieldTitleName>Stars</FieldTitleName>
							<FieldSubTitle>
								Numerical traits that just show as numbers
							</FieldSubTitle>
						</Box>
					</Stack>

					<Box>
						<ButtonWhite sx={{ minWidth: '43px', px: 0 }}>
							<AddIcon />
						</ButtonWhite>
					</Box>
				</Stack>
			</InputGroup> */}
			{/* <InputGroup>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					spacing={2}
					paddingBottom="20px"
					borderBottom="1px solid #E7E8EC"
				>
					<Stack direction="row">
						<FieldIcon>
							<img src={IconLock} alt="atom icon" />
						</FieldIcon>
						<Box>
							<FieldTitleName>Unlockable Content</FieldTitleName>
							<FieldSubTitle>
								Include unlockable content that can only be revealed by the owner of
								the item. In alpha release this field is set by default.
							</FieldSubTitle>
						</Box>
					</Stack>

					<Box>
						<SwitchButton
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
						/>
					</Box>
				</Stack>
			</InputGroup> */}

			<InputGroup>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					spacing={2}
					paddingBottom="20px"
					borderBottom="1px solid #E7E8EC"
				>
					<Stack direction="row">
						<FieldIcon>
							<img src={IconStar} alt="atom icon" />
						</FieldIcon>
						<Box>
							<FieldTitleName>Freeze Metadata</FieldTitleName>
							<FieldSubTitle>
								Freeze your item metadata to the blockchain and no one can edit or
								delete it. (Feel free because you can freeze this item later)
							</FieldSubTitle>
						</Box>
					</Stack>

					<Box>
						<SwitchButton onChange={handleChangeFreezeOption} />
					</Box>
				</Stack>
			</InputGroup>

			{!isEdit && (
				<InputGroup>
					<FieldTitleName>
						Supply <Asterisk />
					</FieldTitleName>
					<FieldSubTitle>
						The number of items that can be minted. No gas cost to you!
					</FieldSubTitle>
					<FieldInput
						id="quantity"
						type="number"
						registerHookForm={{ ...register('quantity') }}
						placeholder="Ex: 1, 2,..."
					/>
					{errors.quantity?.message && (
						<ErrorMessage>{errors.quantity?.message}</ErrorMessage>
					)}
				</InputGroup>
			)}

			{/* <InputGroup>
				<FieldTitleName>
					Blockchain <Asterisk />
				</FieldTitleName>

				<AutoCompleteCustom2
					currentItem={currentCollectionTransformed}
					listItem={listCollectionTransformed}
					onChange={handleChangeCollection}
					placeholder="Select Collection..."
					disabled={isEdit}
				/>

				{errors.collectionId?.message && (
					<ErrorMessage>{errors.collectionId?.message}</ErrorMessage>
				)}
			</InputGroup> */}

			<Box sx={{ marginTop: 6, width: '120px' }}>
				<ButtonWhite
					onClick={handlePreSubmit}
					type="submit"
					disabled={isSubmitting}
					sx={{ padding: '13px 0', mb: 5 }}
				>
					<Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
						{isSubmitting && <CircularProgress sx={{ color: 'white' }} size={25} />}
						<Typography sx={{ fontSize: '14px', fontWeight: 600 }}>
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

export default FormAddOrEditItem;
