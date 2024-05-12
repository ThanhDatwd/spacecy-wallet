import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import { OptionItem, OptionList } from './styled';
import SkeletonOptionItem from './skeletonOptionItem';
import NoItem from 'components/CustomUI/Card/NoItemCard/NoItemCircleCard';
import NoData from 'assets/icons/Nodata.svg';
import { PDWrapper } from '../styled';
interface IProps {
	loading: Boolean;
	listItemOption: any;
}
const PDOptionList = ({ loading, listItemOption }: IProps) => {
	return (
		<PDWrapper sx={{ height: '400px' }}>
			<Box sx={{ height: '40px' }}>
				<Typography variant="subtitle1" fontSize={'20px'} fontWeight={700} color="initial">
					Option
				</Typography>
			</Box>
			<Divider />
			<OptionList>
				{loading ? (
					<SkeletonOptionItem />
				) : listItemOption.lenght > 0 ? (
					<OptionItem>Option 1</OptionItem>
				) : (
					<Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
						<NoItem title={'No data'} image={NoData} />
					</Box>
				)}
			</OptionList>
		</PDWrapper>
	);
};

export default PDOptionList;
