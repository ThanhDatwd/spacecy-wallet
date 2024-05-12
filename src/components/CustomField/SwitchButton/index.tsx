import React from 'react';

import { Switch } from './styled';

export interface SwitchButtonProps {
	onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
	ariaChecked?: 'true' | 'false' | 'mixed';
	isDisable?: boolean;
}

// this switch learn from w3school
function SwitchButton({ onChange, ariaChecked = 'false', isDisable = false }: SwitchButtonProps) {
	const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange(event);
	};

	return (
		<Switch>
			<input
				type="checkbox"
				aria-checked={ariaChecked}
				onChange={handleSwitch}
				disabled={isDisable}
			/>
			<span className="slider round"></span>
		</Switch>
	);
}

export default SwitchButton;
