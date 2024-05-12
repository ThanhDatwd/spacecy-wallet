import React from 'react';
import { PDWrapper } from '../styled';
import { HistoryListItem } from './styled';
import { Box } from '@mui/material';
import SkeletonHistoryItem from './skeletonHistoryItem';
import NoItem from 'components/CustomUI/Card/NoItemCard/NoItemCircleCard';
import NoData from 'assets/icons/Nodata.svg';
import { Typography } from '@mui/material';
import DividerGradient from 'components/CustomUI/DividerGradient';
import HistoryEventCard from 'components/CustomUI/Card/HistoryEventCard';

interface IProps {
	loading: Boolean;
	event: any;
}
const PDHistoryList = ({ loading, event }: IProps) => {
	console.log(event);
	return (
		<PDWrapper>
			<Box>
				<Typography sx={{ fontSize: '20px', fontWeight: 600, mb: '5px' }}>
					History
				</Typography>
				<DividerGradient />
			</Box>
			<Box sx={{ height: ' 424px' }}>
				<HistoryListItem>
					{loading ? (
						<SkeletonHistoryItem />
					) : event && event.histories.length > 0 ? (
						<>
							{event.histories.map((history: any) => {
								return (
									<HistoryEventCard
										history={{
											...history,
											imgUrl: event.imgUrl,
											chainId: event.chainId,
											symbol: event.payment.tokenSymbol,
											optionName:
												Number(history.to) < 100 &&
												event.outcomes[Number(history.to)].title,
										}}
										key={history.txHash}
									/>
								);
							})}
						</>
					) : (
						<Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
							<NoItem title={'No data'} image={NoData} />
						</Box>
					)}
				</HistoryListItem>
			</Box>
		</PDWrapper>
	);
};

export default PDHistoryList;
