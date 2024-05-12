import { Box, Grid, Skeleton } from '@mui/material';
import {
	EventCardGroupChart,
	EventCardHeader,
	EventCardSubTitle,
	EventCardTitle,
	EventCardWrapperNew,
} from './styled';

const SkeletonPredictionCard = () => {
	return (
		<EventCardWrapperNew>
			<EventCardHeader>
				<Skeleton
					variant="rectangular"
					width={90}
					height={30}
					sx={{ borderRadius: '8px' }}
				/>
				<Grid container rowSpacing={0} columnSpacing={2}>
					<Grid item xs={6}>
						<Skeleton
							variant="rectangular"
							width={'100%'}
							height={30}
							sx={{ borderRadius: '8px' }}
						/>
					</Grid>
					<Grid item xs={6}>
						<Skeleton
							variant="rectangular"
							width={'100%'}
							height={30}
							sx={{ borderRadius: '8px' }}
						/>
					</Grid>
				</Grid>
			</EventCardHeader>
			<EventCardTitle>
				<Skeleton variant="rectangular" width={'100%'} sx={{ borderRadius: '8px' }} />
			</EventCardTitle>
			<Grid container spacing={1}>
				<Grid item md={5} xs={12}>
					<Skeleton
						variant="rectangular"
						width={'100%'}
						height={'100%'}
						sx={{ borderRadius: '8px' }}
					/>
				</Grid>
				<Grid item md={7} xs={12}>
					<Box sx={{ width: '100%' }}>
						<EventCardGroupChart>
							<Skeleton
								variant="rectangular"
								width={'100%'}
								height={'100%'}
								sx={{ borderRadius: '8px' }}
							/>
						</EventCardGroupChart>
						<EventCardSubTitle
							sx={{
								margin: '10px 0',
							}}
						>
							<Skeleton variant="rectangular" sx={{ borderRadius: '8px' }} />
						</EventCardSubTitle>
						<Skeleton
							variant="rectangular"
							width={'100%'}
							height={40}
							sx={{ borderRadius: '8px' }}
						/>
					</Box>
				</Grid>
			</Grid>
		</EventCardWrapperNew>
	);
};
export default SkeletonPredictionCard;
