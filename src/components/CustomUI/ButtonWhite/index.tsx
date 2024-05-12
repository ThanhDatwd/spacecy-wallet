import { ReactNode } from 'react';
import React from 'react';
// styled
import { ButtonStyled } from './styled';

export interface ButtonProps {
	children: ReactNode;
	onClick?: any;
	type?: 'button' | 'submit' | 'reset' | undefined;
	sx?: object;
	disabled?: boolean;
}

function ButtonWhite({ children, onClick, type, sx, disabled = false }: ButtonProps) {
	return (
		<ButtonStyled sx={sx} type={type} onClick={onClick} disabled={disabled}>
			{children}
		</ButtonStyled>
	);
}

export default ButtonWhite;
