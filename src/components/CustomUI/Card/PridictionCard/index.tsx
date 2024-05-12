import { Box, Button, Grid } from '@mui/material';
import {
	Circle,
	PredictionCardGroupChart,
	PredictionCardHeader,
	PredictionCardSubTitle,
	PredictionCardText,
	PredictionCardTextEllips,
	PredictionCardTitle,
	PredictionCardWrapperNew,
	PredictionImage,
	PredictionListNote,
	PredictionListNoteItem,
} from './styled';
import PredictionCardChart from './ChartCustom';
import ButtonWhite from 'components/CustomUI/ButtonWhite';
// import Modal from 'components/CustomUI/Modal';

const PredictionCard = () => {
	// const listColor:string[] = ['red'];

	return (
		<Box>
			<PredictionCardWrapperNew>
				<PredictionCardHeader>
					<Button variant="outlined" color="info">
						Crypto
					</Button>
					<Grid container rowSpacing={0} columnSpacing={0}>
						<Grid item xs={6}>
							<PredictionCardSubTitle>
								Sat Mar 18 2023 09:00:35 GMT+0700 (Giờ Đông Dương)
							</PredictionCardSubTitle>
						</Grid>
						<Grid item xs={6}>
							<PredictionCardSubTitle>
								Sat Mar 18 2023 09:00:35 GMT+0700 (Giờ Đông Dương)
							</PredictionCardSubTitle>
						</Grid>
					</Grid>
				</PredictionCardHeader>
				<PredictionCardTitle>
					Đội bóng nào sẽ vô địch premier league năm nay?
				</PredictionCardTitle>
				<Grid container spacing={1}>
					<Grid item md={5}>
						<img
							style={PredictionImage}
							src="https://firebasestorage.googleapis.com/v0/b/aptos-marketplace-a149b.appspot.com/o/item%2Fpremier%2Bleague%2Bchampionship%2Btrophy.png?alt=media&token=6d527a0f-6bf1-40a1-a506-4efab84201d7"
							alt=""
						/>
					</Grid>
					<Grid item md={7}>
						<Box>
							<PredictionCardGroupChart>
								<Box sx={{ width: '40%' }}>
									<PredictionCardChart />
								</Box>
								<PredictionListNote>
									<PredictionListNoteItem>
										<Circle />
										<PredictionCardTextEllips>
											Manchester united Manchester united
										</PredictionCardTextEllips>
										<PredictionCardText>50%</PredictionCardText>
									</PredictionListNoteItem>
								</PredictionListNote>
							</PredictionCardGroupChart>
							<PredictionCardSubTitle
								sx={{ textAlign: 'right', marginBottom: '16px', marginTop: '4px' }}
							>
								Total Pool : 34,56
							</PredictionCardSubTitle>
							<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
								<ButtonWhite sx={{ width: '75%' }}>Redeem</ButtonWhite>
							</Box>
						</Box>
					</Grid>
				</Grid>
			</PredictionCardWrapperNew>
			{/* <Modal
				onOpen={true}
				mainHeader={`Comfirm checkout`}
				style={{ maxWidth: '600px', overflowY: 'auto' }}
				allowClose={true}
				onClose={() => {
					console.log('xin chào');
				}}
			>
			</Modal> */}
		</Box>
	);
};
export default PredictionCard;
