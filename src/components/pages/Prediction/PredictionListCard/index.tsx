import React from 'react';
import { Box, Grid } from '@mui/material';
// import SkeletonHistoryItem from './skeletonHistoryItem';
import NoItem from 'components/CustomUI/Card/NoItemCard/NoItemCircleCard';
import NoData from 'assets/icons/Nodata.svg';
import PredictionCard from '../PredictionCard';
import SkeletonPredictionCard from '../PredictionCard/skeletonPredictionCard';

interface IProps {
	loading: Boolean;
	listEvent: any;
	listRef?: any;
}
const PredictionListCard = ({ loading, listEvent, listRef }: IProps) => {
	return (
		<Box>
			<Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
				{loading ? (
					<>
						{new Array(6).fill(null).map((item, idx) => {
							return (
								<>
									<Grid item sm={12} md={6} lg={4} xs={12}>
										<SkeletonPredictionCard />
									</Grid>
								</>
							);
						})}
					</>
				) : listEvent.length > 0 ? (
					<>
						{listEvent.map((event: any) => {
							return (
								<Grid
									ref={listRef}
									item
									sm={12}
									md={6}
									lg={4}
									xs={12}
									key={event.eventId}
								>
									<PredictionCard event={event} />
								</Grid>
							);
						})}
					</>
				) : (
					<Box
						sx={{
							height: '100%',
							width: '100%',
							mt: '20px',
							display: 'flex',
							alignItems: 'center',
						}}
					>
						<NoItem title={'No data'} image={NoData} />
					</Box>
				)}
			</Grid>
		</Box>
	);
};

export default PredictionListCard;
