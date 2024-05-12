/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// models
import { NFT } from 'models';
// styled
import { BoxGrid, ItemPropertiesTab, TabWrapperContainer, ItemGrid } from './styled';
import { Box, BoxProps, Container, Divider, Grid, Stack, Typography } from '@mui/material';
import NoItem from 'components/CustomUI/Card/NoItemCard/NoItemCircleCard';
import NoData from 'assets/icons/Nodata.svg';
export interface IPropertyTabProps {
	item: NFT | null;
}

export default function PropertiesTab({ item }: IPropertyTabProps) {
	const [properties, setProperties] = useState([]);
	const [countLoop, setCountLoop] = useState(0);
	const { itemId } = useParams();
	useEffect(() => {
		if (typeof item?.properties === 'object' && item?.properties !== null) {
			console.log(Object.entries(item?.properties));
			console.log('cách 2:', convertProperties2(item?.properties));
			console.log('cách 3:', convertProperties3(item?.properties));
			setProperties(convertProperties3(item?.properties));
		}
	}, [item, itemId]);

	// conver proverti thành một mảng duy nhất
	function convertProperties2(obj: any) {
		const result: any = [];

		function recurse(currentObj: any, currentKey: any): any {
			for (let key in currentObj) {
				const value = currentObj[key];
				const newKey = currentKey ? `${currentKey}.${key}` : key;

				if (typeof value === 'object' && value !== null) {
					recurse(value, newKey);
				} else {
					result.push({ key: newKey, value });
				}
			}
		}

		recurse(obj, '');

		return result;
	}
	// CONVERT NHIỀU MẢNG LỒNG NHAU
	function convertProperties3(obj: any) {
		const result = [];
		let countLoop = 0;

		function recurse(currentObj: any, currentKey?: any): any {
			const arr = [];

			for (let key in currentObj) {
				const value = currentObj[key];
				const newKey = currentKey ? `${currentKey}.${key}` : key;

				if (Array.isArray(value)) {
					setCountLoop((prev) => prev + 1);
					arr.push(recurseArray(value));
				} else if (typeof value === 'object' && value !== null) {
					arr.push(recurse(value, newKey));
				} else {
					arr.push({ key: newKey, value });
				}
			}

			return arr;
		}

		function recurseArray(array: any): any {
			const arr = [];

			for (let i = 0; i < array.length; i++) {
				const value = array[i];
				if (Array.isArray(value)) {
					arr.push(recurseArray(value));
				} else if (typeof value === 'object' && value !== null) {
					arr.push(recurse(value));
				} else {
					arr.push({ value });
				}
			}

			return arr;
		}

		return recurse(obj);
	}
	const renderItem = (item: any, index: number) => {
		return (
			<ItemPropertiesTab>
				<Typography
					variant="body1"
					sx={{
						opacity: '0.6',
						fontSize: '14px',
						fontWeight: 600,
					}}
				>
					{item.key.split('.')[item.key.split('.').length - 1]}
				</Typography>
				<Typography fontSize="16px" fontWeight="600">
					{item.value}
				</Typography>
			</ItemPropertiesTab>
		);
	};
	function Item(props: BoxProps) {
		const { sx, ...other } = props;
		return (
			<Box
				sx={{
					bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
					color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
					border: '1px solid',
					borderColor: (theme) =>
						theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
					p: 1,
					borderRadius: '4px',
					textAlign: 'center',
					fontSize: '0.875rem',
					fontWeight: '700',
					...sx,
				}}
				{...other}
			/>
		);
	}
	const renderListItem = (list: any) => {
		return (
			<Item>
				<Typography fontSize="16px" fontWeight="600" sx={{ mb: '10px' }}>
					{
						list[0].key.split('.')[
							list[0].key.split('.').length > 0
								? list[0].key.split('.').length - 2
								: 0
						]
					}
					<Divider />
				</Typography>
				<BoxGrid>
					{list.map((item: any, i: number) => {
						if (Array.isArray(item)) {
							return renderListItem(item);
						}
						return renderItem(item, i);
					})}
				</BoxGrid>
			</Item>
		);
	};

	const recursiveRender = (item: any) => {
		if (Array.isArray(item)) {
			return renderListItem(item);
		} else {
			return renderItem(item, item.value);
		}
	};

	return (
		<TabWrapperContainer>
			{properties.length > 0 ? (
				<Fragment>
					{countLoop > 0 ? (
						<BoxGrid>
							{properties.length > 0 &&
								properties.map((item: any, i: number) => {
									return recursiveRender(item);
								})}
						</BoxGrid>
					) : (
						<Grid container spacing={2}>
							{properties.length > 0 &&
								properties.map((item: any, i: number) => {
									return (
										<Grid item key={i} sm={6} xs={12} md={4} lg={3}>
											{recursiveRender(item)}
										</Grid>
									);
								})}
						</Grid>
					)}
				</Fragment>
			) : (
				<NoItem title={'No data'} image={NoData} />
			)}
		</TabWrapperContainer>
	);
}
