import { Dialog, DialogContent, styled } from '@mui/material';
export const DialogStyle = styled(Dialog)(({ theme }) => ({
	'.css-1u16n06-MuiPaper-root-MuiDialog-paper.MuiPaper-rounded': {
		borderRadius: '24px',
	},
	'.MuiBackdrop-root.css-1m9bonx-MuiBackdrop-root-MuiDialog-backdrop': {
		background: 'rgba(0,0,0,0.1) !important',
		backdropFilter: 'blur(8px)',
	},
}));
export const DialogContentStyle = styled(DialogContent)(({ theme }) => ({
	width: '450px',
	maxWidth: '100%',
	borderRadius: '0px !important',
	padding: 0,
}));
