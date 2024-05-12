import React, { useContext, useEffect, useState } from 'react';
import { Box, Grid, Stack } from '@mui/material';
import { SizeContext } from 'contexts/SizeObserver';
import PDHeader from 'components/pages/PredictionDetail/PDHeader';
import PDChart from 'components/pages/PredictionDetail/PDChart';
// import RedeemForm from 'components/pages/Prediction/RedeemForm';
// import PDOptionList from 'components/pages/PredictionDetail/PDOptionList';
import PDHistoryList from 'components/pages/PredictionDetail/PDHistoryList';
// import FormPrediction from 'components/Form/FormPrediction';
import ModalRedeem from 'components/CustomUI/ModalCustom/ModalRedeem';
import TabCommon from 'components/CustomUI/Tab/TabCommon';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import eventApi from 'apis/eventApi';
import { toast } from 'react-toastify';
import ModalPredict from 'components/CustomUI/ModalCustom/ModalPredict';
import { useIsMounted } from 'hooks';
import { formatTimeHistoryCustom } from 'utils';
import { CircleSteper } from './styled';

const PredictionDetail = () => {
	const { id } = useParams();
	const [event, setEvent] = useState<any>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const isMounted = useIsMounted();
	useEffect(() => {
		if (id) {
			(async () => {
				try {
					setIsLoading(true);
					const result = await eventApi.getEventById(id);
					if (result) {
						setEvent(result.data);
					}
				} catch (error) {
					toast.error('Have some error when you get event');
				} finally {
					if (isMounted()) setIsLoading(false);
				}
			})();
		}
	}, [id]);
	const handleShowModal = () => {
		if (event) {
			switch (event.status) {
				case 0:
				case 1:
					return (
						<ModalPredict
							dataEvent={{
								_id: event._id,
								paymentToken: event.payment.tokenAddress,
								eventId: event.eventId,
								options: event?.outcomes,
								status: event.status,
								totalReward: event.totalReward,
								dataPayment: event.payment,
							}}
							isModal={false}
						/>
					);
				case 2:
					return (
						<ModalRedeem
							dataEvent={{
								_id: event._id,
								paymentToken: event.payment.tokenAddress,
								eventId: event.eventId,
								outcomes: event?.outcomes,
								totalReward: event.totalReward,
								status: event.status,
								dataPayment: event.payment,
							}}
							isModal={false}
						/>
					);

				default:
					break;
			}
		}
	};
	const { innerWidth } = useContext(SizeContext);
	const MaxWidth = innerWidth < 1800 ? '1440px' : '1600px';
	const tabsDetail = {
		items: [
			{
				title: 'Event',
				isShow: true,
			},
			{
				title: 'Info',
				isShow: true,
			},
		],
		sections: [
			{
				Section: (
					<Box sx={{ mt: 4, mb: 4 }}>
						<Grid container spacing={4}>
							<Grid item xs={12} md={12} lg={8}>
								<PDChart
									data={event?.outcomes}
									eventName={event?.description}
									eventImg={event?.imgUrl}
								/>
							</Grid>
							<Grid item xs={12} md={12} lg={4}>
								{handleShowModal()}
							</Grid>
						</Grid>
					</Box>
				),
				isShow: true,
			},
			{
				Section: (
					<Box sx={{ mt: 4, mb: 4 }}>
						<Grid container spacing={4}>
							<Grid item xs={12} md={12}>
								<Box>
									<Box sx={{ mb: 3 }}>
										<Typography>
											<strong>Creator:</strong> {event?.creator}
										</Typography>
										<Typography>
											<strong>Creator Fee:</strong> {event?.creatorFee} %{' '}
										</Typography>
										<Typography>
											<strong>Service Fee:</strong> 1%{' '}
										</Typography>
									</Box>
									<Box>
										<Typography sx={{ mb: '10px' }}>
											<strong>Milestones:</strong>{' '}
										</Typography>
										<Grid container spacing={4}>
											<Grid item xs={12} md={4}>
												<Stack direction={'row'} spacing={2}>
													<CircleSteper>1</CircleSteper>
													<Stack direction={'column'}>
														<Stack
															sx={{
																fontFamily: 'Montserrat',
																fontWeight: 600,
																fontStyle: ' Bold Italic',
																fontSize: '16px',
																LfneHeight: '20px',
															}}
														>
															Start Time
														</Stack>
														<Stack>Prediction start time</Stack>
														<Stack sx={{ fontWeight: 500 }}>
															{formatTimeHistoryCustom(
																new Date(
																	Number(event?.startTime * 1000)
																)
															)}
														</Stack>
													</Stack>
												</Stack>
											</Grid>
											<Grid item xs={12} md={4}>
												<Stack direction={'row'} spacing={2}>
													<CircleSteper>2</CircleSteper>
													<Stack direction={'column'}>
														<Stack
															sx={{
																fontFamily: 'Montserrat',
																fontWeight: 600,
																fontStyle: ' Bold Italic',
																fontSize: '16px',
																LfneHeight: '20px',
															}}
														>
															Expired Prediction
														</Stack>
														<Stack>Stop predict and wait outcome</Stack>
														<Stack sx={{ fontWeight: 500 }}>
															{formatTimeHistoryCustom(
																new Date(
																	Number(event?.endTime * 1000)
																)
															)}
														</Stack>
													</Stack>
												</Stack>
											</Grid>
											<Grid item xs={12} md={4}>
												<Stack direction={'row'} spacing={2}>
													<CircleSteper>3</CircleSteper>
													<Stack direction={'column'}>
														<Stack
															sx={{
																fontFamily: 'Montserrat',
																fontWeight: 600,
																fontStyle: ' Bold Italic',
																fontSize: '16px',
																LfneHeight: '20px',
															}}
														>
															End Time
														</Stack>
														<Stack>Publish outcome</Stack>
														<Stack sx={{ fontWeight: 500 }}>
															{formatTimeHistoryCustom(
																new Date(
																	Number(
																		(event?.endTime +
																			event?.extraTime) *
																			1000
																	)
																)
															)}
														</Stack>
													</Stack>
												</Stack>
											</Grid>
										</Grid>
									</Box>
								</Box>
							</Grid>
							<Grid item xs={12} md={12}>
								<PDHistoryList loading={isLoading} event={event} />
							</Grid>
						</Grid>
					</Box>
				),
				isShow: true,
			},
		],
	};

	return (
		<Box
			sx={{
				mt: '120px',
				maxWidth: MaxWidth,
				mx: 'auto',
				px: 4,
				// [theme.breakpoints.down(768)]: {
				// 	px: 2,
				// },
				// [theme.breakpoints.down(480)]: {
				// 	px: '10px',
				// },
			}}
		>
			<PDHeader event={event} />
			<TabCommon tabItems={tabsDetail.items} tabSections={tabsDetail.sections} />
		</Box>
	);
};

export default PredictionDetail;
