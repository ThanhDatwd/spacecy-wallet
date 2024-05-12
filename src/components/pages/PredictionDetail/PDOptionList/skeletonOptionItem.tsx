import { Box, Skeleton, Stack } from '@mui/material';
const SkeletonOptionItem = () => {
	return (
		<>
			{new Array(7).fill(null).map((item, idx) => {
				return (
					<Box
						key={idx}
						sx={{
							paddingTop: '10px',
							paddingBottom: '10px',
							width: '100%',
						}}
					>
						<Stack direction="row" alignItems="center" sx={{ width: '100%' }}>
							<Skeleton variant="text" sx={{ width: '20%' }} />
							<Skeleton variant="text" sx={{ width: '80%' }} />
						</Stack>
					</Box>
				);
			})}
		</>
	);
};

export default SkeletonOptionItem;
