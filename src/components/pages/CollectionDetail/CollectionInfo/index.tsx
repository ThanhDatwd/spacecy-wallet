/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TwitterShareButton } from 'react-share';
// ultis
import { renderImage, sliceAddress, isOurCollection1155Address, sliceString } from 'utils';
// model
import { Collection } from 'models';
// styled
import {
	InfoCollectionWrapper,
	InfoStack,
	CollectionName,
	CollectionInfo,
	MoreOptions,
	AvatarWrapper,
	InfoAddressList,
	InfoAddressItem,
	InfoAddress,
	CollectionDescription,
	ReadMoreButton,
	StyledSpanSecondary,
	StyledSpanSpecial,
	DropDownWrapper,
	DropDownOption,
	FeatureWrapper,
} from './styled';
// components
import DetailCollectionStatistic from '../DetailCollectionStatistic';
import CopyToClipboardButton from 'components/CustomUI/CopyToClipboardButton';
import DropDown from 'components/CustomUI/DropDown';
// mui
import { Avatar, Box, Stack, Tooltip, Typography } from '@mui/material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ShareIcon from '@mui/icons-material/Share';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
//redux
import { useSelector } from 'react-redux';
import { selectAddress, selectChainId } from 'redux/slices/web3InfoSlice';
// constants
import { NETWORKINFO } from 'constants/etherscan.constant';
// path
import { PATH_COLLECTION } from 'routes/path';
// images
import HeartFullRed from 'assets/icons/heart-full-red.svg';
import HeartBlack from 'assets/icons/icon-heart-black.svg';
import IconReload from 'assets/icons/icon-reload.svg';
import Share from 'assets/icons/share-black.webp';
import { RELATED_URLS } from '../../../../constants';
import { flexStyled } from 'components/Theme/CustomStyled';

export type InfoCollectionProps = {
	collection: Collection | null;
};

function InfoCollection({ collection }: InfoCollectionProps) {
	const { collectionId } = useParams();
	const navigate = useNavigate();

	// useState
	const [activeDropDown, setActiveDropDown] = useState<boolean>(false);
	const [isLoadMore, setIsLoadMore] = useState<boolean>(false);

	// useSelector
	const userAddress = useSelector(selectAddress);
	const chainId = useSelector(selectChainId);

	// functions
	const isQualifiedToEdit = (): boolean => {
		if (
			collection &&
			chainId &&
			collection.userAddress === userAddress &&
			isOurCollection1155Address(collection.collectionAddress, chainId)
		) {
			return true;
		}
		return false;
	};

	const getBlockchainIcon = (chainId: number) => {
		const blockchain = NETWORKINFO[chainId];
		return (
			<Tooltip title={blockchain.name} placement="top" aria-describedby="tip1" arrow>
				<img
					loading="lazy"
					src={blockchain.image}
					alt="blockchain icon"
					width="30"
					height="30"
					style={{ cursor: 'pointer' }}
				/>
			</Tooltip>
		);
	};

	const renderButtonContent = () => {
		return (
			<Stack direction="row" alignItems="center" sx={{ padding: '8px', cursor: 'pointer' }}>
				<MoreHorizOutlinedIcon sx={{ width: '32px' }} />
			</Stack>
		);
	};

	const renderDropdownContent = () => {
		return (
			<DropDownWrapper>
				<DropDownOption variant="subtitle2" onClick={() => window.location.reload()}>
					Refresh metadata
				</DropDownOption>
				<DropDownOption variant="subtitle2">
					<TwitterShareButton
						url={`${RELATED_URLS.MetaSpacecyHomePage}/#/${PATH_COLLECTION.detail}/${collection?._id}`}
						title={`Look what I found! Collection ${collection?.collectionName}`}
						// hashtags={['Music', 'Game']}
						via="Metaspacecy"
						style={{ width: '100%', textAlign: 'left' }}
					>
						Share
					</TwitterShareButton>
				</DropDownOption>
				{/* Enable/Disable Report */}
				{/* <DropDownOption variant="subtitle2">Report</DropDownOption> */}
			</DropDownWrapper>
		);
	};

	return (
		<>
			<Stack
				alignItems="center"
				justifyContent="center"
				sx={{ pt: 12, maxWidth: '500px', margin: '0 auto', fontStyle: 'italic' }}
			>
				{/* Collection name*/}
				<Stack direction="row" alignItems="center" spacing={1}>
					<CollectionName variant="h3">{collection?.collectionName}</CollectionName>
				</Stack>
				<Stack direction="row" gap="5px" fontWeight="600" color="#7D7F96">
					Created by
					<StyledSpanSpecial>
						{sliceAddress(collection?.userAddress, 6, 6)}
					</StyledSpanSpecial>
				</Stack>

				{/* Collection creator */}
				{/* <Box
					sx={{
						mt: 1,
						padding: '8px 12px',
						// border: '1px solid #E7E8EC',
						boxShadow: '0 0 5px 0 rgba(0,0,0,0.4)',
						background: '#fff',
						borderRadius: '12px',
						display: 'flex',
						gap: '5px',
						alignItem: 'center',
						img: {
							height: '24px',
							width: '24px',
						},
					}}
				>
					{getBlockchainIcon(collection?.chainId ?? 4)}
					<StyledSpanSpecial>
						{sliceAddress(collection?.userAddress, 6, 6)}
					</StyledSpanSpecial>
				</Box> */}

				{/* Collection statistic */}
				{collection && <DetailCollectionStatistic collection={collection} sx={{ mt: 4 }} />}

				{/* Collection description */}
				<Typography variant="h6" sx={{ mt: 4, color: '#5A5D79' }}>
					{isLoadMore
						? collection?.description
						: sliceString(collection?.description ?? '', 100)}
				</Typography>
				{/* <Typography sx={{ color: '#7D7F96', fontSize: '16px' }}>
					Joined September 2022
				</Typography> */}

				{collection?.description && collection.description.length > 100 && !isLoadMore && (
					<ReadMoreButton
						variant="button"
						onClick={() => {
							setIsLoadMore(true);
						}}
					>
						Read more
					</ReadMoreButton>
				)}

				{isLoadMore && (
					<ReadMoreButton
						variant="button"
						onClick={() => {
							setIsLoadMore(false);
						}}
					>
						Show less
					</ReadMoreButton>
				)}

				{/* Collection features */}
				<Stack direction="row" alignItems="stretch" spacing={2} sx={{ mt: 4 }}>
					<FeatureWrapper sx={{ padding: '14px 14px' }}>
						<img
							src={HeartBlack}
							alt="icon heart"
							style={{ width: '20px', height: '20px' }}
						/>
					</FeatureWrapper>
					<TwitterShareButton
						url={`${RELATED_URLS.MetaSpacecyHomePage}/#/${PATH_COLLECTION.detail}/${collection?._id}`}
						title={`Look what I found! Collection ${collection?.collectionName}`}
						// hashtags={['Music', 'Game']}
						via="Metaspacecy"
						style={{ textAlign: 'left' }}
					>
						<FeatureWrapper sx={{ padding: '14px 15px' }}>
							<img src={Share} alt="icon share" style={{ height: '20px' }} />
						</FeatureWrapper>
					</TwitterShareButton>
					<FeatureWrapper sx={{ padding: '14px 14px' }}>
						<img
							src={IconReload}
							alt="icon heart"
							style={{ width: '20px', height: '20px' }}
						/>
					</FeatureWrapper>

					{/* <FeatureWrapper>
						<DropDown
							activeDropDown={activeDropDown}
							setActiveDropDown={setActiveDropDown}
							buttonContent={renderButtonContent()}
							dropdownContent={renderDropdownContent()}
							sx={{
								right: 0,
								bottom: 'unset',
								left: 'unset',
								top: '110%',
							}}
						/>
					</FeatureWrapper> */}
				</Stack>
			</Stack>

			{/* <InfoCollectionWrapper sx={{ mt: 100 }}>
				{collection && (
					<InfoStack alignItems="center">
						<CollectionInfo>
							<Stack direction="row" alignItems="center" spacing={1}>
								<CollectionName variant="h4">
									{collection?.collectionName}
								</CollectionName>

								{getBlockchainIcon(collection.chainId)}
							</Stack>

							<InfoAddressList sx={{ mt: 0 }}>
								<InfoAddressItem>
									<InfoAddress variant="body1">Collection address:</InfoAddress>
									<Stack direction="row">
										<InfoAddress variant="body1">
											{sliceAddress(collection.collectionAddress, 8, 5)}
										</InfoAddress>
										<CopyToClipboardButton
											text={collection.collectionAddress}
											placementTooltip="right"
										/>
									</Stack>
								</InfoAddressItem>

								<InfoAddressItem>
									<InfoAddress variant="body1">Owned by:</InfoAddress>
									<Stack direction="row">
										<InfoAddress variant="body1">
											{sliceAddress(collection.userAddress, 8, 5)}
										</InfoAddress>
										<CopyToClipboardButton
											text={collection.userAddress}
											placementTooltip="right"
										/>
									</Stack>
								</InfoAddressItem>
							</InfoAddressList>

							<Typography variant="body1" sx={{ mt: 3 }}>
								Royalties: {collection?.royalties}%
							</Typography>
						</CollectionInfo>

						<MoreOptions>
							<Stack direction="row">
								<TwitterShareButton
									url={`https://nftspacex.io/#/${PATH_COLLECTION.detail}/${collection._id}`}
									// url="https://nftspacex.io/#/detail/6273b63badcba59d78a9bc75"
									title={`Look what I found! Collection ${collection.collectionName}`}
									// hashtags={['Music', 'Game']}
									via="MetaSpacecy"
								>
									<Tooltip
										title={'Share'}
										placement="top"
										aria-describedby="tip1"
										arrow
									>
										<ShareIcon sx={{ ml: 2, cursor: 'pointer' }} />
									</Tooltip>
								</TwitterShareButton>

								{isQualifiedToEdit() && (
									<Tooltip
										title="Edit"
										placement="top"
										aria-describedby="tip1"
										arrow
									>
										<AppRegistrationIcon
											sx={{ ml: 2, cursor: 'pointer' }}
											onClick={() =>
												navigate(
													`${PATH_COLLECTION.editCollection}/${collectionId}`
												)
											}
										/>
									</Tooltip>
								)}
							</Stack>
						</MoreOptions>
					</InfoStack>
				)}
			</InfoCollectionWrapper> */}
		</>
	);
}

export default InfoCollection;
