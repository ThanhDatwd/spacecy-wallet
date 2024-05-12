import { styled, Box, BoxProps } from '@mui/material';
// import { textStyled } from 'components/Theme/CustomStyled';

interface ActiveBoxProps extends BoxProps {
	active: boolean;
}

// export const LightBoxShadow = styled((props: ActiveBoxProps) => {
// 	const { ...others } = props;
// 	return <Box {...others} />;
// })(({ theme, active }) => ({
// 	borderRadius: '16px',
// 	width: '100%',
// 	boxShadow: active ? '0px 0px 8px 0px rgb(0,137,255)' : '',
// 	webkitBoxShadow: active ? '0px 0px 8px 0px rgb(0,137,255)' : '',
// 	mozBoxShadow: active ? '0px 0px 8px 0px rgb(0,137,255)' : '',
// }));

export const SellMethodWrapper = styled(Box)(({ theme }) => ({
	borderRadius: '16px',

	'@media screen and (max-width: 450px)': {
		fontSize: 20,
	},
}));

export const SellMethodBox = styled((props: ActiveBoxProps) => {
	const { ...others } = props;
	return <Box {...others} />;
})(({ theme, active }) => ({
	display: 'flex',
	cursor: 'pointer',
	flexDirection: 'row',
	justifyContent: 'center',
	alignItems: 'center',
	padding: '6px 30px',
	gap: '10px',

	borderRadius: '14px',
	background: '#fff',
	border: '2px solid #E8E8E8',
	// background: theme.palette.primary.light,
}));
