/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
// ultis
import { TwitterShareButton } from 'react-share';
import { renderImage, sliceAddress } from 'utils/function';
// model
import { User } from 'models';
//assets
import EthIcon from 'assets/images/network/eth.webp';
import BinanceIcon from 'assets/images/network/binance.webp';
// styled
import {
	AvatarWrapper,
	GradIcon,
	InfoAccountUserWrapper,
	InfoStack,
	MoreOptions,
	UserAddress,
	UserBio,
	UserInfo,
	Username,
	FeatureWrapper,
	DropDownWrapper,
	DropDownOption,
	StyledSpanSpecial,
} from './styled';
// components
import CopyToClipboard from 'react-copy-to-clipboard';
import FormEditProfile, { IFormEditProfileInputs } from 'components/Form/FormEditProfile';
import Modal from 'components/CustomUI/Modal';
import CopyToClipboardButton from 'components/CustomUI/CopyToClipboardButton';
// mui
import { Avatar, Box, ClickAwayListener, Stack, Tooltip, Typography } from '@mui/material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ShareIcon from '@mui/icons-material/Share';
// models
import { SubmitHandler } from 'react-hook-form';
import { useLocation, useParams } from 'react-router-dom';
import { generateGrad } from 'utils';
import { useSelector } from 'react-redux';
import { selectAddress, selectChainId } from 'redux/slices/web3InfoSlice';
// constants
import { NULL_ADDRESS, RELATED_URLS } from '../../../../constants';
import { PATH_PAGE } from 'routes/path';
import DropDown from 'components/CustomUI/DropDown';
import HeartFullRed from 'assets/icons/heart-full-red.svg';
import HeartBlack from 'assets/icons/icon-heart-black.svg';
import IconEdit from 'assets/icons/icon-edit.svg';
import IconReload from 'assets/icons/icon-reload.svg';
import checkicon from 'assets/icons/icon-check.svg';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { ETHERSCAN } from '../../../../constants/etherscan.constant';

export type InfoAccountUserProps = {
	infoUser: User | null;
	modal: boolean;
	setModal: Function;
	onSubmitEditProfile: SubmitHandler<IFormEditProfileInputs>;
};

function InfoAccountUser({ infoUser, modal, setModal, onSubmitEditProfile }: InfoAccountUserProps) {
	const { pathname } = useLocation();
	const isMineInfoAccountPage = !pathname.includes('other');
	const { infoAccountAddress } = useParams();
	const userAddress = useSelector(selectAddress);
	const chainId = useSelector(selectChainId);
	const [activeDropDown, setActiveDropDown] = useState<boolean>(false);
	const [viewFull, setViewFull] = useState(false);
	const Month: any = {
		Jan: 'January',
		Feb: 'February',
		Mar: 'March',
		Apr: 'April',
		May: 'May',
		Jun: 'June',
		Jul: 'July',
		Aug: 'August',
		Sep: 'September',
		Oct: 'October',
		Nov: 'November',
		Dec: 'December',
	};

	useEffect(() => {
		if (modal) document.body.classList.add('stop-scroll');
		else document.body.classList.remove('stop-scroll');
	}, [modal]);

	const renderJoinFrom = () => {
		if (infoUser) {
			// console.log(infoUser.createdAt);
			let str: any = infoUser.createdAt;
			const dateCreate: any = new Date(str).toString();
			const [day, month, date, year]: any = dateCreate.split(' ');

			const joinFrom = `Joined ${Month[month]} ${year}`;
			return <> {joinFrom}</>;
		}
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
				{/* <DropDownOption variant="subtitle2">
					<TwitterShareButton
						url={`${RELATED_URLS.MetaSpacecyHomePage}/#/${PATH_COLLECTION.detail}/${collection?._id}`}
						title={`Look what I found! Collection ${collection?.collectionName}`}
						
						via="MetaSpacecy"
						style={{ width: '100%', textAlign: 'left' }}
					>
						Share
					</TwitterShareButton>
				</DropDownOption> */}
				{/* Enable/Disable Report */}
				{/* <DropDownOption variant="subtitle2">Report</DropDownOption> */}
			</DropDownWrapper>
		);
	};

	// functions
	const userAvatar = useMemo(() => {
		if (isMineInfoAccountPage) {
			return (
				<GradIcon
					sx={{
						background: `${generateGrad(userAddress ? userAddress : NULL_ADDRESS)}`,
					}}
				/>
			);
		} else {
			return (
				<GradIcon
					sx={{
						background: `${generateGrad(
							infoAccountAddress ? infoAccountAddress : NULL_ADDRESS
						)}`,
					}}
				/>
			);
		}
	}, [userAddress, infoAccountAddress, isMineInfoAccountPage]);
	const NavigateToEtherScan = () => {
		const userEtherScanLink = `${ETHERSCAN[chainId].url}/address/${userAddress}`;
		window.open(userEtherScanLink, '_blank');
	};
	return (
		// <InfoAccountUserWrapper>
		// 	<InfoStack
		// 		sx={{ flexDirection: { md: 'row' } }}
		// 		alignItems="center"
		// 		justifyContent="center"
		// 	>
		// 		<AvatarWrapper>
		// 			{infoUser?.avatar ? (
		// 				infoUser?.avatar ===
		// 				'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg' ? (
		// 					<Box sx={{ width: '120px', height: '120px' }}>{userAvatar}</Box>
		// 				) : (
		// 					<Avatar
		// 						src={infoUser?.avatar}
		// 						sx={{ width: '120px', height: '120px' }}
		// 						alt="user avatar"
		// 					/>
		// 				)
		// 			) : (
		// 				<Box sx={{ width: '120px', height: '120px' }}>{userAvatar}</Box>
		// 			)}
		// 		</AvatarWrapper>
		// 		<UserInfo>
		// 			<Username variant="h5">{infoUser?.username}</Username>
		// 			{infoUser && (
		// 				<Box sx={{ mt: 0 }}>
		// 					<Stack direction="row" alignItems="center">
		// 						<Typography variant="body1" sx={{ marginRight: '5px' }}>
		// 							{sliceAddress(infoUser.userAddress, 8, 5)}
		// 						</Typography>
		// 					</Stack>
		// 				</Box>
		// 			)}

		// 			<Typography variant="body1" sx={{ mt: 3 }}>
		// 				Total Collectible: {infoUser?.totalItems}
		// 			</Typography>
		// 		</UserInfo>

		// 		<MoreOptions>
		// 			<Stack direction="row">
		// 				<TwitterShareButton
		// 					url={`${RELATED_URLS.MetaSpacecyHomePage}/#${PATH_PAGE.otherUser}/${infoUser?.userAddress}`}
		// 					title={`Look what I found! User ${infoUser?.userAddress}`}
		// 					hashtags={['Account web3']}
		// 					via="MetaSpacecy"
		// 					style={{ width: '100%' }}
		// 				>
		// 					<ShareIcon />
		// 				</TwitterShareButton>

		// 				{isMineInfoAccountPage && (
		// 					<AppRegistrationIcon
		// 						sx={{ ml: 2, cursor: 'pointer' }}
		// 						onClick={() => {
		// 							setModal(true);
		// 						}}
		// 					/>
		// 				)}

		// 				<Modal
		// 					onOpen={modal}
		// 					mainHeader={'Edit Profile'}
		// 					onClose={() => setModal(false)}
		// 					style={{
		// 						maxWidth: '500px',
		// 						minWidth: '300px',
		// 						pb: 2,
		// 						overflowY: 'auto',
		// 					}}
		// 				>
		// 					<FormEditProfile infoUser={infoUser} onSubmit={onSubmitEditProfile} />
		// 				</Modal>
		// 			</Stack>
		// 		</MoreOptions>
		// 	</InfoStack>
		// </InfoAccountUserWrapper>
		<>
			<AvatarWrapper mt="-60px" sx={{ display: 'flex', justifyContent: 'center' }}>
				{infoUser?.avatar ? (
					infoUser?.avatar ===
					'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg' ? (
						<Box sx={{ width: '120px', height: '120px' }}>{userAvatar}</Box>
					) : (
						<Avatar
							src={infoUser?.avatar}
							sx={{
								width: '120px',
								height: '120px',
								border: '4px solid #fff',
								borderRadius: '16px',
								position: 'relative',
							}}
							alt="user avatar"
							onClick={() => {
								setViewFull(true);
							}}
						/>
					)
				) : (
					<Box sx={{ width: '120px', height: '120px' }}>{userAvatar}</Box>
				)}
				<Box
					sx={{
						width: '20px',
						position: 'absolute',
						marginTop: '108px',
						marginLeft: '108px',
					}}
				>
					<img
						src={checkicon}
						alt="icon verified"
						style={{ width: '100%', height: 'auto' }}
					/>
				</Box>
				{viewFull && (
					<Box
						sx={{
							position: 'fixed',
							display: 'block',
							left: 0,
							right: 0,
							top: 0,
							bottom: 0,
							zIndex: 9999,
							background: 'rgba(0,0,0,0.4)',
						}}
					>
						<Box
							sx={{
								position: 'absolute',
								left: '50%',
								top: '50%',
								transform: 'translate(-50%, -50%)',
								width: '70%',
								img: {
									width: '100%',
									height: '100%',
								},
							}}
						>
							<ClickAwayListener
								onClickAway={(e) => {
									e.stopPropagation();
									if (viewFull) {
										setViewFull(false);
									}
								}}
							>
								<img src={infoUser?.avatar} alt="banner" />
							</ClickAwayListener>
						</Box>
					</Box>
				)}
			</AvatarWrapper>
			<Stack
				alignItems="center"
				justifyContent="center"
				sx={{ pt: 4, maxWidth: '700px', margin: '0 auto', fontStyle: 'italic' }}
			>
				{/* Collection name*/}
				<Stack direction="row" alignItems="center" spacing={1}>
					<Typography variant="h3" fontWeight="600">
						{infoUser?.username}
					</Typography>
				</Stack>

				{/* Collection creator */}
				<Box
					sx={{
						mt: 1,
						padding: '8px 12px',
						border: '1px solid #E7E8EC',
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
					{/* {getBlockchainIcon(collection?.chainId ?? 4)} */}
					{infoUser && (
						<Box sx={{ mt: 0 }}>
							<Stack
								direction="row"
								alignItems="center"
								onClick={NavigateToEtherScan}
								sx={{ cursor: 'pointer' }}
							>
								{' '}
								<img
									src={
										chainId === 97 || chainId === 56
											? BinanceIcon
											: chainId === 1 || chainId === 4 || chainId === 5
											? EthIcon
											: ''
									}
									alt="network icon"
									style={{ marginRight: '10px' }}
								/>
								<Typography
									variant="body1"
									sx={{
										marginRight: '5px',
										transition: 'all 0.4s',
										'&:hover': { color: '#1890ff' },
									}}
								>
									{sliceAddress(infoUser.userAddress, 8, 5)}
								</Typography>
							</Stack>
						</Box>
					)}
				</Box>

				{/* Collection description */}
				<Typography variant="h6" sx={{ mt: 4, color: '#5A5D79', textAlign: 'center' }}>
					{infoUser?.bio}
				</Typography>
				<Typography sx={{ color: '#7D7F96', fontSize: '16px' }}>
					{renderJoinFrom()}
				</Typography>

				{/* Collection features */}
				<Stack direction="row" alignItems="stretch" spacing={2} sx={{ my: 4 }}>
					{/* <FeatureWrapper sx={{ padding: '10px 14px' }}>
						<img
							src={HeartBlack}
							alt="icon heart"
							style={{ width: '20px', height: '20px' }}
						/>
					</FeatureWrapper> */}
					{isMineInfoAccountPage && (
						<FeatureWrapper sx={{ padding: '10px 14px', width: 'fit-content' }}>
							{/* <img
								src={IconEdit}
								alt="icon heart"
								style={{ width: '20px', height: '20px' }}
							/> */}
							<MoreOptions>
								<Box>
									<Stack
										onClick={() => {
											setModal(true);
										}}
										direction="row"
										gap="10px"
										alignItems="center"
									>
										<img
											src={IconEdit}
											alt="icon heart"
											style={{ width: '20px', height: '20px' }}
										/>
										<span style={{ fontWeight: 500 }}>Edit Profile</span>
									</Stack>
									<Modal
										onOpen={modal}
										mainHeader={'Edit Profile'}
										onClose={() => setModal(false)}
										style={{
											maxWidth: '500px',
											minWidth: '300px',
											pb: 2,
											overflowY: 'auto',
										}}
									>
										<FormEditProfile
											infoUser={infoUser}
											onSubmit={onSubmitEditProfile}
										/>
									</Modal>
								</Box>
							</MoreOptions>
						</FeatureWrapper>
					)}
					{/* <FeatureWrapper
						sx={{ padding: '10px 14px' }}
						onClick={() => window.location.reload()}
					>
						<img
							src={IconReload}
							alt="icon heart"
							style={{ width: '20px', height: '20px' }}
						/>
					</FeatureWrapper> */}
					{/* <TwitterShareButton
					url={`${RELATED_URLS.MetaSpacecyHomePage}/#/${PATH_COLLECTION.detail}/${collection?._id}`}
					title={`Look what I found! Collection ${collection?.collectionName}`}
					
					via="MetaSpacecy"
					style={{ textAlign: 'left' }}
				>
					<FeatureWrapper sx={{ padding: '10px 15px' }}>
						<img src={Share} alt="icon share" style={{ height: '20px' }} />
					</FeatureWrapper>
				</TwitterShareButton> */}

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
		</>
	);
}

export default InfoAccountUser;
