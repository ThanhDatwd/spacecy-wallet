/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect, useRef, useState } from 'react';
// import { motion } from 'framer-motion';
// styled
import {
	DropDownContentInfo,
	DropdownList,
	SelectOptionBox,
	WrapperItem,
	WrapperListItem,
} from '../../styled';
// mui
import { Box, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import InfoIcon from '@mui/icons-material/Info';
// components
// import DarkLight from '../DarkLight';
import DividerGradient from 'components/CustomUI/DividerGradient';
import { useLocation } from 'react-router-dom';
import { TelegramShareButton, TwitterShareButton } from 'react-share';
import { toast } from 'react-toastify';
// path

export interface IMoreOptionListProps {
	placementDropdown: 'top' | 'bottom';
}

const MoreInfo = ({ placementDropdown }: IMoreOptionListProps) => {
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
	const hideOptionBox = () => {
		setActiveSelectOption(false);
	};
	function copyToClipboard() {
		// await navigator.clipboard.writeText(
		//  `${RELATED_URLS.MetaSpacecyHomePage}/#/event-detail/${event?._id}`
		// );

		const textField = document.createElement('textarea');
		textField.innerText = `/#/event-detail/$`;
		document.body.appendChild(textField);
		textField.select();
		document.execCommand('copy');
		textField.remove();
		toast.success('Copied');
	}
	return (
		<SelectOptionBox onMouseOver={showOptionBox} onMouseLeave={hideOptionBox}>
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
				<InfoIcon sx={{ cursor: 'pointer' }} />
			</Box>
			<DropDownContentInfo
				ref={ref}
				sx={{
					...(placementDropdown === 'top'
						? {
								bottom: 0,
						  }
						: {
								top: 0,
						  }),
				}}
				className={activeSelectOption ? 'active' : ''}
			>
				<DropdownList>
					<Stack
						direction="row"
						alignItems="center"
						justifyContent="space-between"
					></Stack>
				</DropdownList>
			</DropDownContentInfo>
		</SelectOptionBox>
	);
};

export default React.memo(MoreInfo);
