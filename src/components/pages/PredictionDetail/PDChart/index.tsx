/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useRef, useState } from 'react';
import { Chart, BarSeries, ArgumentAxis, ValueAxis } from '@devexpress/dx-react-chart-material-ui';
import { ArgumentScale, HoverState } from '@devexpress/dx-react-chart';
import { scaleBand } from '@devexpress/dx-chart-core';
import { Animation } from '@devexpress/dx-react-chart';
import { Box, Paper, Popover, Typography } from '@mui/material';
import { EventTracker, SelectionState } from '@devexpress/dx-react-chart';
import LaunchIcon from '@mui/icons-material/Launch';
// import { Box } from '@mui/material';
import NoItem from 'components/CustomUI/Card/NoItemCard/NoItemCircleCard';
import NoData from 'assets/icons/Nodata.svg';
import { Link } from 'react-router-dom';
import { PATH_ITEM } from 'routes/path';
import { BoxFlex, TootipChart } from '../styled';
import { SizeContext } from 'contexts/SizeObserver';
interface IProps {
	data: any;
	eventName: string;
	eventImg: string;
}
const PDChart = ({ data = [], eventName, eventImg }: IProps) => {
	const { innerWidth } = useContext(SizeContext);
	const [selection, setSelection] = useState<any>();
	const [anchorEl, setAnchorEl] = useState(null);
	const [showTooltip, setShowTooltip] = useState(false);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
	const ref: any = useRef(null);
	const handleSelected = (e: any) => {
		const target = e.targets[0];
		if (target) {
			setAnchorEl(e.event.currentTarget);
			setClickPosition({ x: e.event.clientX, y: e.event.clientY });
			setSelection(data[target.point]);
		}
	};
	const handleHovered = (e: any) => {
		if (e.targets && e.targets.length > 0) {
			const target = e.targets[0];
			if (target) {
				if (data[target.point].value !== selection?.value) {
					setSelection(data[target.point]);
					setShowTooltip(e.event.currentTarget);
					const rect = e.event.currentTarget.getBoundingClientRect();
					const x = e.event.clientX - rect.left;
					const y = e.event.clientY - rect.top;
					setPosition({ x, y });
				}
			}
		}
	};
	const getPath = (x: any, width: any, y: any, y1: any) => `M ${x} ${y1}
    
	L ${width + x} ${y1}
	L ${width + x} ${y}
	L ${x + width / 2} ${y}
	L ${x} ${y}
	Z`;

	const labelStyle = { fill: 'black', fontWeight: 600 };

	const BarWithLabel = ({
		arg,
		barWidth,
		maxBarWidth,
		val,
		startVal,
		color,
		value,
		style,
	}: any) => {
		const width = maxBarWidth * barWidth;
		return (
			<>
				<path
					d={getPath(arg - width / 2, width, val, startVal)}
					fill={color}
					style={{ ...style, cusor: 'pointer' }}
				/>
				<Chart.Label
					x={arg}
					y={val - 7}
					dominantBaseline="middle"
					textAnchor="middle"
					style={labelStyle}
				>
					{`${value}`}
				</Chart.Label>
			</>
		);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;
	return (
		<Box
			ref={ref}
			sx={{ height: '100%' }}
			onMouseLeave={() => {
				setShowTooltip(false);
				setSelection(undefined);
			}}
		>
			{data.reduce(
				(accumulator: any, currentValue: any) => accumulator + currentValue.amount,
				0
			) > 0 ? (
				<Paper sx={{ padding: '10px', position: 'relative', height: '100%' }}>
					<Chart height={500} data={data}>
						<ArgumentScale factory={scaleBand} />
						<ArgumentAxis />
						{/* <Typography sx={{ fontWeight: 600 }}>kkkk</Typography> */}
						<ValueAxis />
						<BarSeries
							valueField="amount"
							argumentField="name"
							barWidth={0.6}
							pointComponent={BarWithLabel}
						/>
						<Animation />
						{innerWidth > 1000 ? (
							<EventTracker onPointerMove={handleHovered} />
						) : (
							<EventTracker onClick={handleSelected} />
						)}
						<SelectionState selection={[]} />
						<HoverState hover={undefined} />
					</Chart>
				</Paper>
			) : (
				<Paper sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
					<NoItem title={'No data'} image={NoData} />
				</Paper>
			)}
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorReference="anchorPosition"
				anchorPosition={{ top: clickPosition.y, left: clickPosition.x }}
			>
				<Link to={`${PATH_ITEM.detail}/${selection?.itemObjectId}`}>
					<Box
						sx={{
							padding: '10px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							gap: '30px',
						}}
					>
						{selection !== undefined &&
							eventName &&
							`${selection?.name} : ${eventName}`}
						<LaunchIcon sx={{ cursor: 'pointer' }} />
					</Box>
				</Link>
			</Popover>
			{showTooltip && innerWidth > 1000 && (
				<TootipChart
					onMouseLeave={() => {
						setShowTooltip(false);
						setSelection(undefined);
					}}
					sx={{
						position: 'absolute',
						left: position.x + 'px',
						top: position.y + 'px',
						transform: 'translateY(-100%)',
					}}
				>
					<Link to={`${PATH_ITEM.detail}/${selection?.itemObjectId}`}>
						<BoxFlex
							sx={{
								padding: '10px',
								justifyContent: 'space-between',
								gap: '30px',
							}}
						>
							<BoxFlex sx={{ gap: '10px' }}>
								{eventImg && (
									<img
										src={eventImg}
										alt="event-img"
										style={{ height: '42px', width: '42px' }}
									/>
								)}
								{selection !== undefined &&
									eventName &&
									`${selection?.name} : ${eventName}`}
							</BoxFlex>
							<LaunchIcon sx={{ cursor: 'pointer' }} />
						</BoxFlex>
					</Link>
				</TootipChart>
			)}
		</Box>
	);
};

export default PDChart;
