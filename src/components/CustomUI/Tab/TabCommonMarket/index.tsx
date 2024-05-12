/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
// mui
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { Stack, Tab, Typography, useTheme } from '@mui/material';
// styled
import { TabListStyled, TabStyled } from './styled';
import { useLocation } from 'react-router-dom';
import { PATH_VIEWALL } from 'routes/path';

export interface TabCommonProps {
	tabItems: any;
	tabSections: any;
	tabAlignment?: 'left' | 'center' | 'space-between';
}

const TabCommonMarket = ({ tabItems, tabSections, tabAlignment = 'left' }: TabCommonProps) => {
	const theme = useTheme();
	const { pathname } = useLocation();

	// useState
	const [value, setValue] = React.useState('0');

	// vars
	const tabBreakpoint = 700; // need this because on small screen, the scroll + .MuiTabs-flexContainer justifyContent: 'center' will error, we can not see full the text

	// functions
	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	useEffect(() => {
		const checkRoute = (pathname: any): void => {
			switch (pathname) {
				case `${PATH_VIEWALL.items}`: {
					setValue('0');
					break;
				}
				case `${PATH_VIEWALL.collections}`: {
					setValue('1');
					break;
				}
				case `${PATH_VIEWALL.user}`: {
					setValue('2');
					break;
				}
				default: {
					setValue('0');
				}
			}
		};
		checkRoute(pathname);
		return;
		// eslint-disable-next-line
	}, [pathname]);

	return (
		<>
			{value !== '' && (
				<TabContext value={value}>
					<TabListStyled
						className="father"
						variant="scrollable"
						allowScrollButtonsMobile
						onChange={handleChange}
						aria-label="basic tabs example"
						sx={{
							borderBottom: 1,
							borderColor: 'divider',
							margin: '12px 0',
							mb: 6,
							// borderBottom: '1px solid grey',

							'& .MuiTabs-flexContainer': {
								...(tabAlignment === 'center'
									? {
											[theme.breakpoints.up(tabBreakpoint)]: {
												justifyContent: 'center',
											},
									  }
									: {}),
							},

							'& .MuiTabs-indicator': {
								background: theme.palette.primary.light,
							},

							'& .MuiTabs-scroller button': {
								...(tabAlignment === 'center'
									? {
											[theme.breakpoints.down(tabBreakpoint)]: {
												flexGrow: 1,
											},
									  }
									: {}),

								...(tabAlignment === 'space-between' ? { flexGrow: 1 } : {}),
							},
						}}
					>
						{tabItems
							.filter((item: any) => item.isShow)
							.map((item: any, idx: number) => (
								<Tab
									className="son"
									component="a"
									key={idx}
									sx={{
										maxWidth: 'none',
										color: theme.palette.text.primary,

										'& .selected': {
											display: 'none',
										},
										'& .unselected': {
											display: 'block',
										},

										'&:hover': {
											color: theme.palette.primary.light,
											opacity: 1,
											fontSize: 50,

											'& .selected': {
												display: 'block',
											},
											'& .unselected': {
												display: 'none',
											},
										},
										'&.Mui-selected': {
											color: theme.palette.primary.light,
											fontWeight: theme.typography.fontWeightMedium,

											'& .selected': {
												display: 'block',
											},
											'& .unselected': {
												display: 'none',
											},
										},
										'&.Mui-focusVisible': {
											backgroundColor: theme.palette.primary.light,
										},
									}}
									href={item.link}
									label={
										<Stack direction="row" alignItems="center">
											<Box className="unselected">
												{item.icon ? item.icon : ''}
											</Box>
											<Box className="selected">
												{item.iconSelected ? item.iconSelected : ''}
											</Box>
											<Typography
												sx={{
													ml: 1,
													fontStyle: 'italic',
													fontWeight: 500,
													fontSize: '20px',
												}}
												noWrap
											>
												{item.title}
											</Typography>
										</Stack>
									}
									value={idx.toString()}
								/>
							))}
					</TabListStyled>

					<Box>
						{tabSections
							.filter((item: any) => item.isShow)
							.map((item: any, idx: number) => (
								<TabPanel key={idx} value={idx.toString()}>
									{item.Section}
								</TabPanel>
							))}
					</Box>
				</TabContext>
			)}
		</>
	);
};

export default TabCommonMarket;
