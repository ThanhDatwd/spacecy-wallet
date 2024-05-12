/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
// utils
import { localStorageCustom } from 'utils';
// hooks
import { useSettings } from '../../../hooks';
import { DarkLightImage, DarkLightStyle } from './styled';
import { useLocation } from 'react-router-dom';
import IconSun from 'assets/icons/icon-sun.svg';
import IconMoon from 'assets/icons/icon-moon.svg';

export default function DarkLight() {
	const { themeMode, onChangeMode } = useSettings();
	const theme = useTheme();
	const [path, setPath] = useState('');
	const { pathname } = useLocation();
	const isHomePage = pathname === '/';
	const isAbout = pathname === '/about';
	const handleChangeThemeMode = (theme: string) => {
		if (theme === 'dark') {
			localStorageCustom.setThemeMode('dark');
			onChangeMode('dark');
		} else {
			localStorageCustom.setThemeMode('light');
			onChangeMode('light');
		}
	};

	useEffect(() => {
		const currentThemeMode: string | null = localStorageCustom.getThemeMode();

		if (isHomePage || isAbout) {
			localStorageCustom.setThemeMode('dark');
			onChangeMode('dark');
		} else {
			localStorageCustom.setThemeMode('light');
			onChangeMode('light');
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isHomePage]);
	// themeMode === 'dark' ?

	return (
		// 	<DarkLightStyle onClick={() => handleChangeThemeMode('light')}>
		// 		<DarkLightImage className="rotateImg">
		// 			<LightModeIcon sx={{ color: '#ffffff' }} />
		// 		</DarkLightImage>
		// 	</DarkLightStyle>
		// ) : (
		// 	<DarkLightStyle onClick={() => handleChangeThemeMode('dark')}>
		// 		<DarkLightImage className="rotateImg">
		// 			<DarkModeIcon sx={{ color: '#0768ff' }} />
		// 		</DarkLightImage>
		// 	</DarkLightStyle>
		<Box
			onClick={() => {
				// if (isHomePage) {
				// 	if (themeMode === 'dark') {
				// 		handleChangeThemeMode('light');
				// 	} else {
				// 		handleChangeThemeMode('dark');
				// 	}
				// }
			}}
			position="relative"
			sx={{
				width: '44px',
				height: '20px',
				borderRadius: '12px',
				padding: '1px',
				transition: 'all ease 0.5s',
				cursor: 'pointer',
				...(theme.palette.mode === 'light'
					? {
							background: theme.palette.primaryLight.darker,
					  }
					: {
							background: theme.palette.primaryDark.backgroundCard,
					  }),
				...(isHomePage
					? {
							display: 'none',
					  }
					: {
							display: 'none',
					  }),
			}}
		>
			<Box
				sx={{
					width: '14px',
					height: '14px',
					borderRadius: '50%',
					position: 'absolute',
					transition: 'all ease 0.3s',
					top: '3px',
					zIndex: '4',
					background: 'rgba(255,255,255,1)',
					...(theme.palette.mode === 'light'
						? {
								right: '2px',
						  }
						: {
								right: '28px',
						  }),
				}}
			></Box>
			<Box
				sx={{
					zIndex: '4',
					position: 'absolute',
					left: '3px',
					top: '3px',
					width: '14px',
					transition: 'all ease 0.5s',
					...(theme.palette.mode === 'light'
						? {
								opacity: '1',
						  }
						: {
								opacity: '0',
						  }),
				}}
			>
				<img src={IconSun} alt="sun" />
			</Box>
			<Box
				sx={{
					position: 'absolute',
					top: '3px',
					right: '3px',
					width: '14px',
					transition: 'all ease 0.5s',
					...(theme.palette.mode === 'light'
						? {
								opacity: '0',
						  }
						: {
								opacity: '1',
						  }),
				}}
			>
				<img src={IconMoon} alt="sun" />
			</Box>
		</Box>
	);
}
