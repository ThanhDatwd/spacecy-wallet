import { styled, Box, Typography, Dialog, DialogContent } from '@mui/material';
export const PredictionTabs = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	gap: '20px',
	padding: '10px 0',
}));
export const PredictionDetailHeaderGroup = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'flex-start',
	justifyContent: 'space-between',
	padding: '10px 0',
}));
export const PredictionDetailHeader = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'flex-start',
	width: '100%',
	gap: '20px',
}));
export const PredictionDetailSubtitle = styled(Typography)(({ theme }) => ({
	fontSize: '12px',
	fontWeight: 700,
}));

export const PredictionDetailTitle = styled(Typography)(({ theme }) => ({
	fontSize: '26px',
	fontWeight: 700,
	'@media screen and (max-width:683px)': {
		fontSize: '20px',
	},
}));
export const PredictionDetailImage = {
	width: '100%',
	height: '100%',
	borderRadius: '8px',
};
export const PredictionHeaderMobile = styled(Box)(({ theme }) => ({
	'@media screen and (min-width:683px)': {
		display: 'flex',
	},
	'@media screen and (max-width:683px)': {
		display: 'none',
	},
}));
export const BoxFlex = styled(Box)(({ theme }) => ({
	display: 'flex',
	// width: '100%',
	alignItems: 'center',
	gap: '10px',
	flexWrap: 'wrap',
}));
export const DialogStyle = styled(Dialog)(({ theme }) => ({
	'.css-1u16n06-MuiPaper-root-MuiDialog-paper.MuiPaper-rounded': {
		borderRadius: '5px',
	},
	'.MuiBackdrop-root.css-1m9bonx-MuiBackdrop-root-MuiDialog-backdrop': {
		background: 'rgba(0,0,0,0.1)',
		backdropFilter: 'blur(8px)',
	},
}));
export const DialogContentStyle = styled(DialogContent)(({ theme }) => ({
	width: '450px',
	maxWidth: '100%',
	borderRadius: '0px !important',
	padding: 0,
}));
