/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	FieldSubTitle,
	FieldTitleName,
	InputGroup,
} from 'components/Form/FormAddOrEditItem/styled';
import { Asterisk } from 'components/Form/Common/styled';
// components
import { Box, Stack, Typography } from '@mui/material';
import FieldInput from 'components/CustomField/FieldInput';
import { SelectAndInputWraper } from '../FixedPrice/styled';
import { useSelling } from 'contexts/SellingContext';
import AutoCompleteCustom2 from 'components/CustomField/AutoCompleteCustom2';
import { OptionSelectCustom } from 'models';
import PercentCustomPicker from '../PercentPickerCustom';
import DateTimeCustomPicker from '../DateTimePickerCustom';
import { useState } from 'react';
import ButtonWhite from 'components/CustomUI/ButtonWhite';
import FieldTextArea from 'components/CustomField/FieldTextArea';
// import ImageCustomInput from 'components/CustomField/ImageCustomInput';
// import SwitchButton from 'components/CustomField/SwitchButton';
// import AutoCompleteCustom2 from 'components/CustomField/AutoCompleteCustom2';
// import PreviewItem from 'components/CustomUI/PreviewItem';
// import UploadMediaCustom from 'components/CustomField/UploadMediaCustom';
import useCreateAuction from 'hooks/useCreateFormAuction';
import { AutoChoose } from 'components/Form/FormCreateAuction/styled';
import DropDown from 'components/CustomUI/DropDown';
import ButtonContent from './buttonContent';
import DropDownContent from './DropDownContent';
export interface FixedPriceProps {
	listTokenPayment: OptionSelectCustom<string>[];
	onChangePaymentToken: (value: OptionSelectCustom<string> | null | undefined) => void;
	// onChangeFeeMethod: (value: any) => void;
}

export default function Auction() {
	const {
		handleSubmitForm,
		register,
		setValue,
		listData,
		activeDropDown,
		setActiveDropDown,
		selected,
		handleClickOption,
		itemName,
		handleFilterByName,
		listPaymentTokenTransformed,
		handleChangePaymentToken,
		currentToken,
		handleOnChangeOfferPrice,
	} = useCreateAuction();

	const [checked, setChecked] = useState<boolean>(false);

	return (
		<>
			{listData ? (
				<>
					<form onSubmit={handleSubmitForm}>
						<InputGroup sx={{ marginTop: '0px !important' }}>
							<FieldTitleName>
								Auction Name <Asterisk />
							</FieldTitleName>
							<FieldSubTitle>
								This is your Auction Name (Limit 30 words)
							</FieldSubTitle>
							<FieldInput
								id="auctionName"
								type="text"
								placeholder="Auction name"
								registerHookForm={{ ...register('nameINO') }}
							/>
						</InputGroup>
						<InputGroup pt="16px">
							<FieldTitleName>
								Description <Asterisk />
							</FieldTitleName>
							<FieldSubTitle>Please write something about your Auction</FieldSubTitle>
							<FieldTextArea
								rows={4}
								cols={40}
								registerHookForm={{ ...register('descriptionINO') }}
								placeholder="Please write something about your Auction"
							/>
						</InputGroup>

						<InputGroup pt="16px">
							<FieldTitleName>
								Collection <Asterisk />
							</FieldTitleName>
							<FieldSubTitle>
								This is the collection where your item belongs to
							</FieldSubTitle>
							<AutoChoose>
								<Stack direction="row" alignItems="center" gap={2}>
									<img
										src={listData?.collectionInfo.logo}
										alt=""
										style={{
											width: '40px',
											height: '40px',
											borderRadius: '50%',
										}}
									/>
									<Typography>
										{listData?.collectionInfo.collectionName}
									</Typography>
								</Stack>
							</AutoChoose>
						</InputGroup>

						<InputGroup pt="16px">
							<FieldTitleName>
								Item <Asterisk />
							</FieldTitleName>

							<DropDown
								sx={{ left: '0px', right: '0px' }}
								activeDropDown={activeDropDown}
								setActiveDropDown={setActiveDropDown}
								buttonContent={
									<ButtonContent
										itemName={itemName}
										handleFilterByName={handleFilterByName}
									/>
								}
								dropdownContent={
									<DropDownContent
										listData={listData}
										selected={selected}
										handleClickOption={handleClickOption}
									/>
								}
							/>
						</InputGroup>

						<InputGroup pt="16px">
							<FieldTitleName>
								Starting Price <Asterisk />
							</FieldTitleName>
							<SelectAndInputWraper>
								<AutoCompleteCustom2
									currentItem={currentToken}
									listItem={listPaymentTokenTransformed}
									onChange={handleChangePaymentToken}
									placeholder="Token name"
									sx={{
										width: '155px',
									}}
								/>

								<FieldInput
									id="price"
									type="number"
									placeholder="0"
									onChange={handleOnChangeOfferPrice}
									sx={{
										border: 'none',
										textAlign: 'right',
										fontSize: '20px',
										textOverflow: 'ellipsis',
										flexGrow: 1,
										width: 'auto',
									}}
									otherProps={{
										inputMode: 'decimal',
										pattern: '^[0-9]*[.,]?[0-9]*$',
										minLength: 1,
										maxLength: 10,
									}}
									registerHookForm={{ ...register('minPrice') }}
								/>
							</SelectAndInputWraper>
						</InputGroup>
						<InputGroup pt="16px">
							<FieldTitleName>
								Bid Increase Percent <Asterisk />
							</FieldTitleName>

							<PercentCustomPicker />
						</InputGroup>
						<InputGroup pt="16px">
							<FieldTitleName>Duarion</FieldTitleName>

							<DateTimeCustomPicker />
						</InputGroup>
						<InputGroup>
							<Box>
								<input
									type="checkbox"
									aria-checked="false"
									checked={checked}
									// value={checked}
									onChange={() => setChecked(!checked)}
									style={{ fontStyle: 'italic' }}
								/>{' '}
								I agree to the{' '}
								<a
									href="/#/terms-of-service"
									rel="noreferrer noopener"
									style={{ fontStyle: 'italic' }}
								>
									Terms of Service
								</a>{' '}
								and{' '}
								<a
									href="/#/privacy-policy"
									rel="noreferrer noopener"
									style={{ fontStyle: 'italic' }}
								>
									Privacy Policy
								</a>{' '}
								of Metaspacecy
							</Box>
						</InputGroup>
						<Box pt={3} sx={{ width: 'fit-content' }}>
							<ButtonWhite>Confirm</ButtonWhite>
						</Box>
					</form>
				</>
			) : (
				<>
					<h1>NoDATA</h1>
				</>
			)}
		</>
	);
}
