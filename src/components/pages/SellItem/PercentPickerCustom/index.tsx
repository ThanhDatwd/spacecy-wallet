/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useState } from 'react';
import moment, { Moment } from 'moment';
//mui
import DateTimePicker from '@mui/lab/DateTimePicker';
import { Box, Stack, Typography, useTheme } from '@mui/material';
//utils
import { compareDate } from 'utils';
//styled
import { DatePickerTextField, DatePickerVisiblePart, DatePickerWrapper } from './styled';
import { Title } from 'pages/TermsOfService/SellItem/styled';
//components
import SelectCustom from 'components/CustomField/SelectCustom';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
//context
import { useSelling } from 'contexts/SellingContext';
// models
import { OptionSelectCustom } from 'models';
// image
import IconCalendarWhite from 'assets/icons/calendar-white.webp';
import IconCalendarBlack from 'assets/icons/calendar-black.webp';

export interface IDateTimeCustomPickerProps {}

const dateRanges: OptionSelectCustom<string>[] = [
	{ name: '1%', value: '1' },
	{ name: '5%', value: '5' },
	{ name: '10%', value: '10' },
	{ name: '50%', value: '50' },
	{ name: '100%', value: '100' },
];

export default function PercentCustomPicker(props: IDateTimeCustomPickerProps) {
	const theme = useTheme();
	const isLightTheme = theme.palette.mode === 'light';
	//context
	const context = useSelling();
	const { state, dispatch } = context;

	const { startTime, endTime } = state;

	const [currentDuration, setCurrentDuration] = useState<any>(dateRanges[0]);

	// change endDate base on startDate and selected duration
	const onChangeDuration = (duration: OptionSelectCustom<string>) => {
		setCurrentDuration(duration);
		const updateEndDate: Moment = moment(startTime).add(duration.value, 'days');

		// setValue('endDate', updateEndDate.format('L'));
		dispatch({ type: 'SET_END_TIME', value: updateEndDate });
	};

	return (
		<Fragment>
			<SelectCustom
				currentItem={currentDuration}
				listItem={dateRanges}
				onChange={onChangeDuration}
				sx={{
					padding: '13px 9px 13px 7px',
				}}
			/>
		</Fragment>
	);
}
