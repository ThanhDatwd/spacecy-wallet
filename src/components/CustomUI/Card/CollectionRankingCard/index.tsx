import React from 'react';
import { Box, Tooltip, useTheme } from '@mui/material';
// models
import { Collection } from 'models';
// path
import { PATH_COLLECTION } from 'routes/path';
// utils
import { formatNumber, sliceString } from 'utils';
// styled
import {
	CollectionAvatar,
	CollectionInfo,
	CollectionItem,
	CollectionRank,
	LinkWrapper,
	NameInfo,
	TotalInfo,
} from './styled';

import VerifiedIcon from 'assets/icons/icon-verify-check.svg';

export interface ICollectionRankingCardProps {
	collection: Collection;
	rank: number;
	filter: string;
}

export default function CollectionRankingCard({
	collection,
	rank,
	filter,
}: ICollectionRankingCardProps) {
	const getVolumeTrade = (type: string, collection: Collection) => {
		if (type === '1 day') {
			return formatNumber(collection.volume24Hour?.toString()!, 2);
		} else if (type === '7 days') {
			return formatNumber(collection.volume7Days?.toString()!, 2);
		} else return formatNumber(collection.volume30Days?.toString()!, 2);
	};

	const theme = useTheme();

	return collection ? (
		<LinkWrapper href={`#${PATH_COLLECTION.detail}/${collection._id}`}>
			<CollectionItem direction="row" alignItems="center">
				<CollectionRank>
					<div>{rank + 1}</div>
				</CollectionRank>
				<Box
					sx={{
						position: 'absolute',
						left: '6px',
						top: '40px',
						zIndex: 2,
						width: '24px',
						height: '24px',
						padding: '4px',
						background: theme.palette.primary.light,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						borderRadius: '50%',
						border: '2px solid #fff',
					}}
				>
					<Tooltip title="Collection verified" placement="top" arrow>
						<img src={VerifiedIcon} alt="icon verified" />
					</Tooltip>
				</Box>
				<CollectionAvatar src={collection.logo} alt="avatar" />
				<CollectionInfo>
					<NameInfo variant="body1" noWrap>
						{sliceString(collection.collectionName, 15)}
					</NameInfo>
					{collection.volumeTrade !== 0 && (
						<TotalInfo variant="body2">
							$ {getVolumeTrade(filter, collection)}
						</TotalInfo>
					)}
				</CollectionInfo>
			</CollectionItem>
		</LinkWrapper>
	) : (
		<></>
	);
}
