/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Box, Stack, Typography, useTheme } from '@mui/material';

interface QandAType {
	id: number;
	question: string;
	answer: string;
	answer1: string;
	answer2?: string;
	answer3?: string;
}
interface Props {
	header: String;
	contents: QandAType[];
	style: any;
	style1: any;
}
const QandA: React.FC<Props> = ({ header, contents, style, style1 }) => {
	const [open, setOpen] = useState<any>({
		0: false,
		1: false,
		2: false,
		3: false,
		4: false,
	});
	const theme = useTheme();
	const showActiveSelect = (e: any) => {
		switch (e.currentTarget.dataset.idx) {
			case '0':
				if (open[0]) {
					setOpen((prev: any) => ({ ...prev, 0: false }));
				} else {
					setOpen((prev: any) => ({ ...prev, 0: true }));
				}
				break;
			case '1':
				if (open[1]) {
					setOpen((prev: any) => ({ ...prev, 1: false }));
				} else {
					setOpen((prev: any) => ({ ...prev, 1: true }));
				}
				break;
			case '2':
				if (open[2]) {
					setOpen((prev: any) => ({ ...prev, 2: false }));
				} else {
					setOpen((prev: any) => ({ ...prev, 2: true }));
				}
				break;
			case '3':
				if (open[3]) {
					setOpen((prev: any) => ({ ...prev, 3: false }));
				} else {
					setOpen((prev: any) => ({ ...prev, 3: true }));
				}
				break;
			case '4':
				if (open[4]) {
					setOpen((prev: any) => ({ ...prev, 4: false }));
				} else {
					setOpen((prev: any) => ({ ...prev, 4: true }));
				}
				break;
			default:
				setOpen({ 0: false, 1: false, 2: false, 3: false, 4: false });
				break;
		}
	};
	return (
		<>
			<Box sx={style}>
				<Typography
					variant="h3"
					fontStyle="italic"
					fontWeight="500"
					textAlign="center"
					mb={2}
				>
					{header}
				</Typography>
				<List>
					{contents.map((content, idx) => {
						return (
							<Box key={content.id} sx={style1}>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
									}}
									onClick={(e) => showActiveSelect(e)}
									data-idx={idx}
								>
									<Typography variant="h6" fontStyle="italic" fontWeight="500">
										{content.question}
									</Typography>
									{open[idx] ? <ExpandLess /> : <ExpandMore />}
								</Box>
								<Collapse in={open[idx]} timeout="auto" unmountOnExit>
									<List component="div" disablePadding sx={{ marginTop: '20px' }}>
										<Stack direction="column" gap="16px">
											<Typography
												variant="body1"
												fontSize="20px"
												fontStyle="italic"
												fontWeight="500"
												sx={{
													[theme.breakpoints.down(1440)]: {
														fontSize: '20px',
													},
													[theme.breakpoints.down(1024)]: {
														fontSize: '16px',
													},
													[theme.breakpoints.down(500)]: {
														fontSize: '13px',
													},
												}}
											>
												{content.answer}
											</Typography>
											<Typography
												variant="body1"
												fontSize="20px"
												fontStyle="italic"
												fontWeight="500"
												sx={{
													[theme.breakpoints.down(1440)]: {
														fontSize: '20px',
													},
													[theme.breakpoints.down(1024)]: {
														fontSize: '16px',
													},
													[theme.breakpoints.down(500)]: {
														fontSize: '13px',
													},
												}}
											>
												{content.answer1}
											</Typography>
											<Typography
												variant="body1"
												fontSize="20px"
												fontStyle="italic"
												fontWeight="500"
												sx={{
													[theme.breakpoints.down(1440)]: {
														fontSize: '20px',
													},
													[theme.breakpoints.down(1024)]: {
														fontSize: '16px',
													},
													[theme.breakpoints.down(500)]: {
														fontSize: '13px',
													},
												}}
											>
												{content.answer2}
											</Typography>
											<Typography
												variant="body1"
												fontSize="20px"
												fontStyle="italic"
												fontWeight="500"
												sx={{
													[theme.breakpoints.down(1440)]: {
														fontSize: '20px',
													},
													[theme.breakpoints.down(1024)]: {
														fontSize: '16px',
													},
													[theme.breakpoints.down(500)]: {
														fontSize: '13px',
													},
												}}
											>
												{content.answer3}
											</Typography>
										</Stack>
									</List>
								</Collapse>
							</Box>
						);
					})}
				</List>
			</Box>
		</>
	);
};

export default QandA;
