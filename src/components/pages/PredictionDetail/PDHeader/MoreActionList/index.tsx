/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect, useRef, useState } from 'react';
// import { motion } from 'framer-motion';
// styled
import {
	DropDownContent,
	DropdownList,
	SelectOptionBox,
	WrapperItem,
	WrapperListItem,
} from '../../styled';
// mui
import { Box, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import ShareIcon from '@mui/icons-material/Share';
// components
// import DarkLight from '../DarkLight';
import { useLocation } from 'react-router-dom';
import { TelegramShareButton, TwitterShareButton } from 'react-share';
import { toast } from 'react-toastify';
import { RELATED_URLS } from 'constants/relatedUrls.constant';
// path

export interface IMoreOptionListProps {
	placementDropdown: 'top' | 'bottom';
	event: any;
}

const MoreOptionList = ({ placementDropdown, event }: IMoreOptionListProps) => {
	const ref: any = useRef(null);
	const [activeSelectOption, setActiveSelectOption] = useState(false);
	//Path
	const { pathname } = useLocation();
	//theme
	const theme = useTheme();
	const isLight = theme.palette.mode === 'light';
	useEffect(() => {
		const onBodyClick = (event: any) => {
			event.stopPropagation();
			if (ref.current && !ref.current.contains(event.target)) {
				setActiveSelectOption(false);
			}
		};
		// Bind the event listener if dropdown is active
		if (activeSelectOption)
			document.body.addEventListener('click', onBodyClick, { passive: true });

		return () => {
			// Unbind the event listener on clean up
			document.body.removeEventListener('click', onBodyClick);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeSelectOption]);

	const showOptionBox = () => {
		if (!activeSelectOption) setActiveSelectOption(true);
	};
	function copyToClipboard() {
		// await navigator.clipboard.writeText(
		//  `${RELATED_URLS.MetaSpacecyHomePage}/#/event-detail/${event?._id}`
		// );

		const textField = document.createElement('textarea');
		textField.innerText = `${RELATED_URLS.MetaSpacecyHomePage}/#/prediction/${event?._id}`;
		document.body.appendChild(textField);
		textField.select();
		document.execCommand('copy');
		textField.remove();
		toast.success('Copied');
	}
	return (
		<SelectOptionBox onClick={showOptionBox}>
			<Box
				sx={{
					width: '40px',
					height: '40px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					borderRadius: '6px',
					background: '#fff',
				}}
			>
				<ShareIcon sx={{ cursor: 'pointer' }} />
			</Box>
			<DropDownContent
				ref={ref}
				sx={{
					...(placementDropdown === 'top'
						? {
								bottom: 0,
						  }
						: {
								top: 10,
						  }),
				}}
				className={activeSelectOption ? 'active' : ''}
			>
				{event && (
					<DropdownList>
						<Stack
							direction="row"
							alignItems="center"
							justifyContent="space-between"
						></Stack>
						<WrapperListItem sx={{ width: '100%' }}>
							<TwitterShareButton
								url={`${RELATED_URLS.MetaSpacecyHomePage}/#/prediction/${event?._id}`}
								title={`Join Metaspacecy Prediction for the event: ${event?.description} `}
								hashtags={['Metaspacecy', 'Prediction', 'NFT', 'NFT_Marketplace']}
							>
								<WrapperItem>
									<TwitterIcon />
									<Typography
										variant="body1"
										fontStyle="italic"
										fontWeight="500"
										sx={{
											cursor: 'pointer',
										}}
									>
										Share Twitter
									</Typography>
								</WrapperItem>
							</TwitterShareButton>
							<TelegramShareButton
								url={`${RELATED_URLS.MetaSpacecyHomePage}/#/prediction/${event?._id}`}
								title={`Join Metaspacecy Prediction for the event: ${event?.description} `}
							>
								<WrapperItem>
									<TelegramIcon />
									<Typography
										variant="body1"
										fontStyle="italic"
										fontWeight="500"
										sx={{
											cursor: 'pointer',
										}}
									>
										Share Telegram
									</Typography>
								</WrapperItem>
							</TelegramShareButton>
							<WrapperItem onClick={copyToClipboard}>
								<ContentCopyIcon />
								<Typography
									variant="body1"
									fontStyle="italic"
									fontWeight="500"
									sx={{
										cursor: 'pointer',
									}}
								>
									Copy link
								</Typography>
							</WrapperItem>
						</WrapperListItem>
					</DropdownList>
				)}
			</DropDownContent>
		</SelectOptionBox>
	);
};

export default React.memo(MoreOptionList);
