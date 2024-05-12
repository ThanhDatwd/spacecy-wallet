import { styled, Box, Typography } from '@mui/material';
export const PredictionTabs = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	gap: '20px',
	padding: '10px 0',
}));
export const PredictionDetailHeader = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'flex-start',
	width: '75%',
	gap: '20px',
	padding: '10px 0',
}));
export const PredictionDetailSubtitle = styled(Typography)(({ theme }) => ({
	fontSize: '12px',
	fontWeight: 700,
}));

export const PredictionDetailTitle = styled(Typography)(({ theme }) => ({
	fontSize: '1.2rem',
	fontWeight: 700,
	// marginBottom: '10px',
	marginTop: '20px',
}));
export const PredictionDetailImage = {
	width: '80px',
	height: '80px',
	// height: 'auto',
	borderRadius: '8px',
};
export const CircleSteper = styled(Box)(({ theme }) => ({
	width: '20px',
	height: '20px',
	padding: '20px',
	display: 'flex',
	borderRadius: '50%',
	backgroundColor: '#007AFF',
	alignItems: 'center',
	justifyContent: 'center',
	color: '#fff',
}));
