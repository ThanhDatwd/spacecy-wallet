import FieldInput from 'components/CustomField/FieldInput';
import React from 'react';

interface Props {
	itemName: string;
	handleFilterByName: (e: any) => void;
}
const ButtonContent: React.FC<Props> = ({ itemName, handleFilterByName }) => {
	return (
		<>
			<FieldInput
				type="text"
				value={itemName}
				onChange={handleFilterByName}
				placeholder="Search name ..."
				sx={{
					padding: '15px 15px',
				}}
			/>
		</>
	);
};

export default ButtonContent;
