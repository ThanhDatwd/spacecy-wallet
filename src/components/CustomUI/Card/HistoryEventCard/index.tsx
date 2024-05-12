/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
// mui
import { Box, Stack, Typography, useTheme } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
// styled
import { ItemMedia, StyledSpan } from '../ActivityCard/styled';
// utils
import { compressImage, formatTimeHistory } from 'utils';
// constants
import { ETHERSCAN } from 'constants/etherscan.constant';
// redux
import { useSelector } from 'react-redux';
import { selectAddress } from 'redux/slices/web3InfoSlice';
// hooks
import { useIsMounted } from 'hooks';
// components
import SkeletonActivityCard from 'components/CustomUI/Skeleton/Item/SkeletonActivityCard';
import LazyImageCustom from 'components/CustomUI/LazyImages/LazyImageCustom';
import { HistoryItemContent, HistoryItemTitle } from './styled';
import { PATH_PAGE } from 'routes/path';
import { Link } from 'react-router-dom';

export const checkTypeEvent = (type: number, item: any, userAddress: string | null | undefined) => {
	var returnText;
	// 11: 'Create Event',
	// 12: 'Predict Event',
	// 13: 'Resolve Event',
	// 14: 'Redeem Event',
	switch (type) {
		case 11: {
			returnText = (
				<HistoryItemTitle>
					<Link style={{ color: 'black' }} to={`${PATH_PAGE.otherUser}/${item.from}`}>
						{item.from}
					</Link>
					<strong> CREATED </strong>
				</HistoryItemTitle>
			);
			break;
		}
		case 0: {
			// Accept Offer
			returnText = (
				<HistoryItemTitle>
					<Link style={{ color: 'black' }} to={`${PATH_PAGE.otherUser}/${item.from}`}>
						{item.from}
					</Link>{' '}
					<strong> CANCEL </strong>
				</HistoryItemTitle>
			);
			break;
		}
		case 12: {
			// Sales
			returnText = (
				<HistoryItemTitle>
					<Link style={{ color: 'black' }} to={`${PATH_PAGE.otherUser}/${item.from}`}>
						{item.from}
					</Link>{' '}
					<strong> PREDICT </strong> {item.price} {item.symbol.toUpperCase()} for Option{' '}
					{item.to}: {item.optionName}
				</HistoryItemTitle>
			);
			break;
		}
		case 13: {
			// Transfer
			returnText = (
				<HistoryItemTitle>
					<Link style={{ color: 'black' }} to={`${PATH_PAGE.otherUser}/${item.from}`}>
						{item.from}
					</Link>{' '}
					<strong> RESOLVED </strong>
				</HistoryItemTitle>
			);
			break;
		}
		case 14: {
			// Transfer
			returnText = (
				<HistoryItemTitle>
					<Link style={{ color: 'black' }} to={`${PATH_PAGE.otherUser}/${item.from}`}>
						{item.from}
					</Link>{' '}
					REDEEM {item.price} {item.symbol.toUpperCase()} for Option {item.to} :{' '}
					{item.optionName}
				</HistoryItemTitle>
			);
			break;
		}
	}
	return returnText;
};

export interface IProps {
	history: any;
}

export default function HistoryEventCard({ history }: IProps) {
	console.log(history);
	const theme = useTheme();
	// useState
	const [isLoading, setIsLoading] = useState<boolean>(false);
	// useSelector
	const userAddress = useSelector(selectAddress);

	// hooks
	const isMounted = useIsMounted();
	const getEtherscanInfoByChainId = (id: number) => {
		return ETHERSCAN[id];
	};

	return !isLoading ? (
		history ? (
			<Box>
				<Stack
					direction="row"
					sx={{
						justifyContent: 'space-between',
						alignItems: 'center',
						padding: '8px 12px',
						margin: '4px 0',
						borderRadius: '12px',
						gap: '12px',
						...(theme.palette.mode === 'light'
							? { background: '#fff' }
							: {
									background: theme.palette.primary.dark,
							  }),
					}}
				>
					<Stack
						direction="row"
						sx={{
							gap: '12px',
							cursor: 'default',
						}}
					>
						<ItemMedia>
							<LazyImageCustom
								src={compressImage(history.fromUserInfo.avatar, 480, 'best')}
								alt="item avatar"
								wrapperPosition="relative"
								imgStyle={{ borderRadius: '10px' }}
								type="progress"
							/>
						</ItemMedia>
						<HistoryItemContent>
							<Box>
								<Box
									display="-webkit-box"
									sx={{
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: '2',
										overflow: 'hidden',
										userSelect: 'none',
									}}
								>
									{checkTypeEvent(history.type, history, history.userAddress)}
								</Box>
							</Box>

							<Typography variant="body2">
								<StyledSpan>{formatTimeHistory(history.createdAt)}</StyledSpan>
							</Typography>
						</HistoryItemContent>
					</Stack>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								borderRadius: '50%',
								border: '1px solid #E7E8EC',
								width: 36,
								height: 36,
							}}
							onClick={() => {
								window.open(
									`${getEtherscanInfoByChainId(history.chainId).url}tx/${
										history.txHash
									}`,
									'_blank'
								);
							}}
						>
							<LaunchIcon sx={{ width: '20px', cursor: 'pointer' }} />
						</Box>
					</Box>
				</Stack>
			</Box>
		) : (
			<></>
		)
	) : (
		<SkeletonActivityCard />
	);
}
