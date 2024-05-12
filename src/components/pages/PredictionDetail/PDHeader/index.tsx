import React, { useState } from 'react';
import { Avatar, Box } from '@mui/material';
import {
	BoxFlex,
	DialogContentStyle,
	PredictionDetailHeader,
	// PredictionDetailHeaderGroup,
	PredictionDetailImage,
	// PredictionDetailSubtitle,
	PredictionDetailTitle,
} from './styled';
import MoreActionList from './MoreActionList';
import { ButtonStyled } from 'pages/Prediction/styled';
import CountDown from 'components/CustomUI/Card/NFTItemCardInAuction/CountDown';
import FormFinalize from 'components/Form/FormFinalize';

// selector
import { useSelector } from 'react-redux';
import { selectAddress } from 'redux/slices/web3InfoSlice';
import Modal from 'components/CustomUI/Modal';

const PDHeader = ({ event }: any) => {
	const userAddress = useSelector(selectAddress);
	const [open, setOpen] = useState(false);
	const handleClose = () => {
		setOpen(false);
	};
	const handleOpen = () => {
		setOpen(true);
	};

	return (
		<>
			<PredictionDetailHeader>
				<Box
					sx={{
						width: '80px',
						height: '80px',
						'@media screen and (min-width:683px)': {
							display: 'block',
						},
						'@media screen and (max-width:683px)': {
							display: 'none',
						},
					}}
				>
					<img style={PredictionDetailImage} src={event?.imgUrl} alt="" />
				</Box>
				<Box sx={{ width: 'calc(100% - 0px)' }}>
					<BoxFlex
						sx={{
							justifyContent: 'space-between',
							'@media screen and (max-width:683px)': {
								flexDirection: ' column-reverse',
								alignItems: 'flex-start',
							},
						}}
					>
						<BoxFlex sx={{ fontWeight: 500, gap: '30px' }}>
							<ButtonStyled
								sx={{ backgroundColor: '#FFC93F4D', padding: '4px 14px' }}
							>
								{event?.category}
							</ButtonStyled>
							<BoxFlex>
								{' '}
								{event?.totalReward % 2 === 0 && event?.totalReward > 0
									? event?.totalReward
									: event?.totalReward.toFixed(4)}{' '}
								<Avatar
									sx={{ width: '20px', height: '20px' }}
									src={event?.payment?.logoURI}
								/>
								{event?.payment?.tokenSymbol.toUpperCase()}
							</BoxFlex>
						</BoxFlex>
						<BoxFlex
							sx={{
								justifyContent: 'space-between',
								'@media screen and (max-width:683px)': {
									width: '100% !important',
									height: '40px',
								},
							}}
						>
							{event &&
								event.creator === userAddress &&
								new Date().getTime() > (event.endTime + event.extraTime) * 1000 &&
								event.outcomes.every((item: any) => item.percent === 0) && (
									<ButtonStyled
										sx={{
											height: '100%',
											'@media screen and (max-width:683px)': {
												fontSize: '12px',
											},
										}}
										onClick={handleOpen}
									>
										Finalize
									</ButtonStyled>
								)}
							<BoxFlex
								sx={{
									justifyContent: 'space-between',
									'@media screen and (max-width:683px)': {
										width: '100% !important',
									},
								}}
							>
								{event && (
									<ButtonStyled>
										<CountDown
											className="countDown"
											timeStart={event.startTime * 1000}
											timeEnd={(event.endTime + event.extraTime) * 1000}
											executeOne={() => {}}
											executeZero={() => {}}
										/>
									</ButtonStyled>
								)}
								<MoreActionList placementDropdown="bottom" event={event} />
							</BoxFlex>
						</BoxFlex>
					</BoxFlex>
					<BoxFlex sx={{ mt: 1 }}>
						<Box
							sx={{
								width: '50px',
								height: '50px',
								'@media screen and (min-width:683px)': {
									display: 'none',
								},
								'@media screen and (max-width:683px)': {
									display: 'block',
								},
							}}
						>
							<img style={PredictionDetailImage} src={event?.imgUrl} alt="" />
						</Box>
						<PredictionDetailTitle>{event?.description}</PredictionDetailTitle>
					</BoxFlex>
				</Box>
			</PredictionDetailHeader>
			<Modal
				onOpen={open}
				isHasHeader={false}
				onClose={handleClose}
				style={{ padding: '0', width: '450px' }}
			>
				<DialogContentStyle
					sx={{
						width: '450px',
						maxWidth: '100%',
						borderRadius: '0px !important',
						padding: 0,
					}}
				>
					<FormFinalize event={event} />
				</DialogContentStyle>
			</Modal>
		</>
	);
};

export default PDHeader;
