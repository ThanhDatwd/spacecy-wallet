/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
// react-hook-form
import { SubmitHandler, useForm } from 'react-hook-form';
// yup
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// model
import { Collection, CustomFile, OptionSelectCustom, TokenPayment } from 'models';
// redux
import { useSelector } from 'react-redux';
import { selectListTokenPayment, selectLoading } from 'redux/slices/tokenPaymentSlice';
// styled
import { FieldTitleName, FormCreateNewsWrapper, PageTitle } from './styled';
import { Asterisk, ErrorMessage } from '../Common/styled';
//components
import FieldInput from 'components/CustomField/FieldInput';
import AutoCompleteCustom2 from 'components/CustomField/AutoCompleteCustom2';
import UploadMediaCustom from 'components/CustomField/UploadMediaCustom';
// mui
import moment from 'moment';
import { Box, CircularProgress, Grid, Stack, Typography, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import iconTrash from 'assets/icons/icon-trash.svg';
// constants
import { compareDate, dateToTimestamp } from 'utils';
// hooks
import { useDebounce, useIsFirstRender } from 'hooks';
// vars
import ButtonWhite from 'components/CustomUI/ButtonWhite';
import { listCategoryNews } from 'components/CustomUI/FilterItemGroup/FilterCategoryNews';
import DateTimePickerCustom from '../FormRequestIGO/DateTimePickerCustom';

export interface FormAddOrEditCollectionProps {
	isEdit: boolean;
	currentEvent?: Collection | null | undefined;
	onSubmit: SubmitHandler<IFormAddOrEditCollectionInputs>;
	checkExistEventQuestion: Function;
	existed: boolean;
	loadingCheckName: boolean;
}

export interface IFormAddOrEditCollectionInputs {
	background: any;
	description: string;
	category: string;
	options: string[];
	duration: any;
	startTime: any;
	endTime: any;
	creatorFee: number;
	paymentToken: any;
}

export default function FormCreateEvent({
	isEdit,
	currentEvent,
	onSubmit,
	checkExistEventQuestion,
	existed,
	loadingCheckName,
}: FormAddOrEditCollectionProps) {
	const theme = useTheme();
	// hook
	const isFirstRender = useIsFirstRender();
	// useState
	const [description, setDescription] = useState<string>('');
	const [background, setBackground] = useState<CustomFile | string | null>(null);
	const [creatorFee, setCreatorFee] = useState<number>();
	const [currentCategoryNews, setCurrentCategoryNews] = useState();
	const [currentDuration, setCurrentDuration] = useState<{ name: string; value: number }>({
		name: '1 minute (default)',
		value: 1,
	});
	const [touch, setTouch] = useState<boolean>(false);
	const debouncedDesciptionValue = useDebounce<string>(description, 500);
	const [startTime, setStartTime] = useState(new Date());
	const [endTime, setEndTime] = useState(moment(new Date()).add(7, 'days').toDate());
	const [currentToken, setCurrentToken] = useState<
		OptionSelectCustom<string> | null | undefined
	>();
	const isLoadingItem = useSelector(selectLoading);
	const listTokenPayment: TokenPayment[] = useSelector(selectListTokenPayment);
	// vars
	const isQualifiedCreateEvent = () => {
		if (!isLoadingItem && listTokenPayment.length > 0) {
			return true;
		}
		return false;
	};
	const listDuration: any = [
		{
			name: '1 minute (default)',
			value: 1,
		},
		{
			name: '5 minute',
			value: 5,
		},
		{
			name: '10 minute',
			value: 10,
		},
		{
			name: '15 minute',
			value: 15,
		},
		{
			name: '30 minute',
			value: 30,
		},
	];
	//  LIST PAYMENT TOKEN
	// useSelector
	let listPaymentTokenTransformed: OptionSelectCustom<string>[] = listTokenPayment.map(
		(tokenPayment: TokenPayment) => ({
			name: tokenPayment.symbol,
			value: tokenPayment.address,
			image: tokenPayment.logoURI,
		})
	);
	useEffect(() => {
		if (isFirstRender) return;
		setTouch(true);
		checkExistEventQuestion(debouncedDesciptionValue);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedDesciptionValue]);
	useEffect(() => {
		setValue('options', []);
		setValue('startTime', dateToTimestamp(startTime));
		setValue('endTime', dateToTimestamp(endTime));
		setValue('duration', currentDuration.value * 60);
		listCategoryNews.shift();
	}, []);
	// react hook form
	const schema = yup
		.object({
			background: yup
				.mixed()
				.required()
				.test('Require a file', 'Background is required!', (value: any) => {
					return Boolean(value?.length !== 0);
				}),
			description: yup.string().required(),
			// duration: yup.number().required(),
			category: yup.string().required(),
			options: yup.array().min(2).required(),
			startTime: yup.number().required(),
			endTime: yup.number().required(),
			creatorFee: yup.number().min(0).max(10).required(),
			paymentToken: yup.string().required(),
		})
		.required();

	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		clearErrors,
		formState: { errors, isSubmitting },
		reset,
		formState,
	} = useForm<IFormAddOrEditCollectionInputs>({
		resolver: yupResolver(schema),
	});

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
	// functions
	const handleChangeCategory = (currentCategoryNews: any) => {
		if (currentCategoryNews) {
			setValue('category', currentCategoryNews.name);
			setCurrentCategoryNews(currentCategoryNews);
		} else {
			setValue('category', '');
			setCurrentCategoryNews(undefined);
		}
	};
	// HANDLE CHANGE DURATION
	const handleChangeDuration = (currentDuration: any) => {
		setValue('duration', currentDuration.value * 60);
		setCurrentDuration(currentDuration);
		// const updateEndDate: Date = moment(startTime).add(currentDuration.value, 'days').toDate();
		// setEndTime(updateEndDate);
		// setValue('endTime', dateToTimestamp(updateEndDate));
	};
	// HANDLE CHANGE START TIME
	const handleChangeStartTime = (time: any) => {
		const startTimeStamp = dateToTimestamp(time);
		const updateEndDate: Date = moment(time).add(currentDuration.value, 'days').toDate();
		setStartTime(time);
		setEndTime(updateEndDate);
		setValue('startTime', startTimeStamp);
		setValue('endTime', dateToTimestamp(updateEndDate));
	};
	// HANDLE CHANGE END TIME
	const handleChangeEndTime = (time: any) => {
		const endTimeStamp = dateToTimestamp(time);
		if (compareDate(startTime, time) >= 0) {
			const newEndDate: Date = moment(startTime).add(1, 'days').toDate();
			setEndTime(newEndDate);
			setValue('endTime', dateToTimestamp(newEndDate));
		} else {
			setEndTime(time);
			setValue('endTime', endTimeStamp);
		}
	};
	// Debouncing set input collection Name
	const handleChangeDescription = (e: any) => {
		const value = e.target.value;
		setValue('description', value);
		setDescription(value);
	};
	const [listOptions, setListOptions] = useState([
		{ index: 0, value: '' },
		{ index: 1, value: '' },
		{ index: 2, value: '' },
	]);
	// HANDLE CHANGE OPTION
	const handleChangeOptionValue = (e: any, i: any) => {
		const value = e.target.value;
		let listSetValue: string[] = [];
		const list = listOptions.map((item) => {
			if (item.value !== '' && item.value !== undefined && value !== '') {
				if (item.index !== i) {
					listSetValue.push(item.value);
				} else {
					listSetValue.push(value);
				}
			}
			if (item.index === i) {
				return { ...item, value: value };
			}
			return item;
		});
		setListOptions(list);
		setValue('options', listSetValue);
	};
	// HANDLE ADD OPTION
	const handleAddOptionItem = () => {
		if (listOptions.length > 0) {
			setListOptions((prev) => [
				...prev,
				{ index: prev[prev.length - 1]?.index + 1, value: '' },
			]);
			return;
		}
		setListOptions([{ index: 0, value: '' }]);
	};
	// HANDLE DELETE OPTION
	const handleDeleteOptionItem = (index: any) => {
		let listcheck: string[] = [];
		const list = listOptions.filter((item: any) => {
			if (item.index !== index) {
				listcheck.push(item.value);
			}
			return item.index !== index;
		});
		// console.log(listc);
		setListOptions(list);
		setValue('options', listcheck);
	};
	// HANDLE CHANGE CREATE OF FEE
	const handleChangeCreatorFee = (e: any) => {
		const value = e.target.value;
		setCreatorFee(value);
		setValue('creatorFee', value);
	};

	// listPaymentTokenTransformed = listPaymentTokenTransformed.filter((val, idx) => {
	// 	return !isNativeToken(String(val.value));
	// });
	const handleChangePaymentToken = (
		currentPaymentToken: OptionSelectCustom<string> | null | undefined
	) => {
		setCurrentToken(currentPaymentToken);
		setValue('paymentToken', currentPaymentToken?.value);
	};
	const handlePreSubmit = () => {};
	return (
		<FormCreateNewsWrapper>
			<form onSubmit={handleSubmit(onSubmit)}>
				<PageTitle> {isEdit ? 'Edit Event' : 'Create Event'}</PageTitle>
				<FieldTitleName>
					Thumbnail <Asterisk />
				</FieldTitleName>
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
						Set Event Question <Asterisk />{' '}
						<Box sx={{ marginLeft: '10px', fontSize: '12px', color: '#FF0000' }}>
							{description.length} of 128 characters used
						</Box>
					</FieldTitleName>
					<FieldInput
						id="collection-name"
						type="text"
						maxLength={128}
						placeholder="Example: Will GPT-4 have 500b+ parameters?"
						value={description}
						onChange={handleChangeDescription}
					/>
					{errors.description?.message && (
						<ErrorMessage>{errors.description?.message}</ErrorMessage>
					)}

					{existed && <ErrorMessage>Collection name had already exitsted</ErrorMessage>}
				</Box>
				{/* option */}
				<Box sx={{ marginTop: 2 }}>
					<FieldTitleName>
						Options <Asterisk />
					</FieldTitleName>
					<Box>
						{listOptions.map((item, i) => {
							return (
								<Box
									key={i}
									sx={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										gap: '10px',
										mt: 1,
									}}
								>
									<FieldInput
										type="text"
										maxLength={128}
										placeholder="Option"
										value={item.value}
										onChange={(e: any) =>
											handleChangeOptionValue(e, item.index)
										}
									/>
									{/* <ButtonWhite
										onClick={() => handleDeleteOptionItem(item.index)}
										sx={{ width: 'max-content' }}
									>
									</ButtonWhite> */}
									<img
										src={iconTrash}
										alt="icon-trash"
										style={{ cursor: 'pointer' }}
										onClick={() => handleDeleteOptionItem(item.index)}
									/>
								</Box>
							);
						})}
						{Array.isArray(errors.options) ? (
							<Box>
								{errors.options.map((error: any, index: number) => (
									<ErrorMessage key={index}>{error.message}</ErrorMessage>
								))}
							</Box>
						) : (
							<Box>
								{errors.options && (
									<ErrorMessage>{(errors.options as any)?.message}</ErrorMessage>
								)}
							</Box>
						)}
					</Box>
					<ButtonWhite onClick={handleAddOptionItem} sx={{ mt: 2, width: 'max-content' }}>
						<AddIcon />
					</ButtonWhite>
				</Box>
				{/* duration */}
				<Box sx={{ marginTop: 2 }}>
					<FieldTitleName>
						Extra Time <Asterisk />
					</FieldTitleName>
					<AutoCompleteCustom2
						currentItem={currentDuration}
						listItem={listDuration}
						onChange={handleChangeDuration}
						placeholder="Duration..."
						sx={{
							border: '1px solid #E7E8EC',
							borderRadius: '12px',
						}}
					/>
					{errors.duration?.message && (
						<ErrorMessage>{errors.duration?.message}</ErrorMessage>
					)}
				</Box>
				{/* Startime and End time */}
				<Box sx={{ marginTop: 2 }}>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
							<FieldTitleName>
								Starting <Asterisk />
							</FieldTitleName>
							<DateTimePickerCustom
								dateTime={startTime}
								setDateTime={(time: any) => handleChangeStartTime(time)}
							/>
							{errors.startTime?.message && (
								<ErrorMessage>{errors.startTime?.message}</ErrorMessage>
							)}
						</Grid>
						<Grid item xs={12} md={6}>
							<FieldTitleName>
								Ending <Asterisk />
							</FieldTitleName>
							<DateTimePickerCustom
								dateTime={endTime}
								setDateTime={(time: any) => handleChangeEndTime(time)}
							/>
							{errors.endTime?.message && (
								<ErrorMessage>{errors.endTime?.message}</ErrorMessage>
							)}
						</Grid>
					</Grid>
				</Box>
				{/* Mục category */}
				<Box sx={{ marginTop: 2 }}>
					<FieldTitleName>
						Category <Asterisk />
					</FieldTitleName>
					<AutoCompleteCustom2
						currentItem={currentCategoryNews}
						listItem={listCategoryNews}
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
				<Box sx={{ marginTop: 2 }}>
					<FieldTitleName>
						Creator Fee <Asterisk />
					</FieldTitleName>
					<FieldInput
						type="number"
						maxLength={128}
						placeholder="Max 10"
						value={creatorFee}
						onChange={handleChangeCreatorFee}
					/>
					{errors.creatorFee?.message && (
						<ErrorMessage>{errors.creatorFee?.message}</ErrorMessage>
					)}
				</Box>
				<Box sx={{ marginTop: 2 }}>
					<FieldTitleName>
						Payment Token <Asterisk />
					</FieldTitleName>
					<AutoCompleteCustom2
						currentItem={currentToken}
						listItem={listPaymentTokenTransformed}
						onChange={handleChangePaymentToken}
						placeholder="Token name"
						sx={{
							border: '1px solid #E7E8EC',
							borderRadius: '12px',
						}}
					/>
					{errors.paymentToken?.message && (
						<ErrorMessage>{errors.paymentToken?.message}</ErrorMessage>
					)}
				</Box>
				<Box sx={{ marginTop: 4, width: '100%', mb: 4 }}>
					<Stack direction="row" justifyContent="end" alignItems="center" spacing={1}>
						<ButtonWhite sx={{ width: '150px' }} type="submit" disabled={isSubmitting}>
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
						</ButtonWhite>
					</Stack>
				</Box>
			</form>
		</FormCreateNewsWrapper>
	);
}
