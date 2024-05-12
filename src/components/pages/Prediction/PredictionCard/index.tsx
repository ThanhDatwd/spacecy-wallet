import { Avatar, Box, Grid } from '@mui/material';
import {
	Circle,
	EventCardGroupChart,
	EventCardHeader,
	EventCardSubTitle,
	EventCardText,
	EventCardTextEllips,
	EventCardTitle,
	EventCardWrapperNew,
	EventCardImage,
	EventCardListNote,
	EventCardListNoteItem,
	styleButtonDisabled,
} from './styled';
import PredictionCardChart from './ChartCustom';
import ButtonWhite from 'components/CustomUI/ButtonWhite';
// import RedeemForm from '../RedeemForm';

// import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import LazyImageCustom from 'components/CustomUI/LazyImages/LazyImageCustom';
import ModalPredict from 'components/CustomUI/ModalCustom/ModalPredict';
import { ButtonStyled } from 'pages/Prediction/styled';
import ModalRedeem from 'components/CustomUI/ModalCustom/ModalRedeem';
import { formatTimeHistoryCustom } from 'utils';
import { Tooltip } from '@mui/material';
import { PATH_PREDICTION } from 'routes/path';
// import { selectChainId } from 'redux/slices/web3InfoSlice';
// import { useSelector } from 'react-redux';

interface IProps {
	event: any;
}
const PredictionCard = ({ event }: IProps) => {
	// const chainId = useSelector(selectChainId);
	const listColor: string[] = [
		'#40C4FF',
		'#FF5252',
		'#00C853',
		'#FFEB3B',
		'rgb(38, 166, 154)',
		'#FF4081',
	];
	const [openPredict, setOpenPredict] = useState(false);
	const [openRedeem, setOpenRedeem] = useState(false);
	const handleOpenPredict = () => {
		setOpenPredict(true);
	};
	const handleOpenRedeem = () => {
		setOpenRedeem(true);
	};

	const handleClosePredict = () => {
		setOpenPredict(false);
	};
	const handleCloseRedeem = () => {
		setOpenRedeem(false);
	};

	const ButtonHandleModal = () => {
		switch (event.status) {
			case 0:
				return (
					<ButtonWhite
						sx={{ ...styleButtonDisabled, width: '100%' }}
						onClick={(e: any) => {
							e.preventDefault();
						}}
					>
						Upcoming
					</ButtonWhite>
				);
			case 1:
				return (
					<ButtonWhite
						sx={{ width: '100%' }}
						onClick={(e: any) => {
							e.preventDefault();
							handleOpenPredict();
						}}
					>
						Predict
					</ButtonWhite>
				);
			case 2:
				if (event.outcomes.some((item: any) => item.percent > 0)) {
					return (
						<ButtonWhite
							sx={{ width: '100%' }}
							onClick={(e: any) => {
								e.preventDefault();
								handleOpenRedeem();
							}}
						>
							Redeem
						</ButtonWhite>
					);
				}
				return (
					<ButtonWhite
						sx={{ ...styleButtonDisabled, width: '100%' }}
						onClick={(e: any) => {
							e.preventDefault();
						}}
					>
						Wait outcome !
					</ButtonWhite>
				);
				break;

			default:
				break;
		}
	};
	return (
		<Box>
			<Link to={`${PATH_PREDICTION.root}/${event && event._id}`}>
				<EventCardWrapperNew>
					<EventCardHeader>
						<Box sx={{ flex: 1 }}>
							<ButtonStyled
								sx={{
									background: '#FFC93F4D',
									fontSize: '9px',
									color: '#FF9900',
									fontWeight: 600,
									padding: '5px 10px',
								}}
							>
								{event.category}
							</ButtonStyled>
						</Box>
						{/* <Button variant="outlined" color="info" sx={{ flex: 1 }}></Button> */}
						<Grid container rowSpacing={0} columnSpacing={0} sx={{ flex: 4 }}>
							<Grid item xs={6}>
								<EventCardSubTitle>
									{formatTimeHistoryCustom(
										new Date(Number(event?.startTime * 1000))
									)}
								</EventCardSubTitle>
							</Grid>
							<Grid item xs={6}>
								<EventCardSubTitle>
									{formatTimeHistoryCustom(Number(event?.endTime * 1000))}
								</EventCardSubTitle>
							</Grid>
						</Grid>
					</EventCardHeader>
					<EventCardTitle>{event.description}</EventCardTitle>
					<Grid container spacing={1}>
						<Grid item md={12} lg={5} xs={12}>
							<Box
								sx={{
									position: 'relative',
									width: '100%',
									height: '100%',
									'@media screen and (max-width:1000px)': {
										aspectRatio: '1/1',
									},
								}}
							>
								<LazyImageCustom
									imgStyle={EventCardImage}
									src={event.imgUrl}
									type="skeleton"
									alt={''}
									wrapperPosition={'relative'}
								/>
								<Tooltip
									title={event?.creatorInfo?.userAddress}
									arrow
									placement="bottom-start"
								>
									<Avatar
										sx={{
											width: '22px',
											height: '22px',
											position: 'absolute',
											bottom: '0',
											transform: ' translate(50%, 50%)',
										}}
										src={event.creatorInfo.avatar}
									/>
								</Tooltip>
							</Box>
						</Grid>
						<Grid item md={12} lg={7} xs={12}>
							<Box sx={{ width: '100%' }}>
								<EventCardGroupChart>
									<Box sx={{ width: '40%' }}>
										<PredictionCardChart
											data={event.outcomes}
											listColor={listColor}
										/>
									</Box>
									<EventCardListNote>
										{event &&
											event.outcomes.map((item: any, i: any) => {
												return (
													<EventCardListNoteItem key={i}>
														<Circle sx={{ background: listColor[i] }} />
														<EventCardListNoteItem
															sx={{
																justifyContent: 'space-between',
																width: '100%',
															}}
														>
															<EventCardTextEllips>
																{item.name}
															</EventCardTextEllips>
															<EventCardText>
																{item.amount > 0
																	? (
																			(item.amount /
																				event.totalReward) *
																			100
																	  ).toFixed(2) + '%'
																	: '0%'}
															</EventCardText>
														</EventCardListNoteItem>
													</EventCardListNoteItem>
												);
											})}
									</EventCardListNote>
								</EventCardGroupChart>
								<EventCardSubTitle
									sx={{
										textAlign: 'right',
										marginBottom: '16px',
										marginTop: '4px',
										display: 'flex',
										alignItems: 'center',
										gap: '10px',
										justifyContent: 'flex-end',
									}}
								>
									Total Pool :{' '}
									{event.totalReward % 2 === 0 && event.totalReward > 0
										? event.totalReward
										: event.totalReward.toFixed(4)}{' '}
									<Avatar
										sx={{ width: '20px', height: '20px' }}
										src={event.payment.logoURI}
									/>
									{event.payment.tokenSymbol.toUpperCase()}
								</EventCardSubTitle>
								<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
									{ButtonHandleModal()}
								</Box>
							</Box>
						</Grid>
					</Grid>
				</EventCardWrapperNew>
			</Link>

			<ModalPredict
				dataEvent={{
					_id: event._id,
					paymentToken: event.payment.tokenAddress,
					eventId: event.eventId,
					options: event.outcomes,
					status: event.status,
					totalReward: event.totalReward,
					dataPayment: event.payment,
				}}
				open={openPredict}
				handleClose={handleClosePredict}
			/>
			<ModalRedeem
				dataEvent={{
					_id: event._id,
					paymentToken: event.payment.tokenAddress,
					eventId: event.eventId,
					outcomes: event.outcomes,
					status: event.status,
					totalReward: event.totalReward,
					dataPayment: event.payment,
				}}
				open={openRedeem}
				handleClose={handleCloseRedeem}
			/>
		</Box>
	);
};
export default PredictionCard;
