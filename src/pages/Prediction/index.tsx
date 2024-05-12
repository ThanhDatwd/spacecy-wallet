/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import { SizeContext } from 'contexts/SizeObserver';
import { FilterStack } from 'components/CustomUI/FilterItemGroup/styled';
import FilterItemGroup from 'components/CustomUI/FilterItemGroup';

import {
	setFilter,
	selectInitialState,
	// selectLoading,
	selectFilter,
} from 'redux/slices/allNftsSlice';
import DividerGradient from 'components/CustomUI/DividerGradient';
import PredictionListCard from 'components/pages/Prediction/PredictionListCard';
import { ButtonStyled, ButtonTitle } from './styled';
import { Link, useSearchParams } from 'react-router-dom';
import { PATH_EVENT, PATH_PREDICTION } from 'routes/path';
import eventApi from 'apis/eventApi';
import { useDebounce, useIsFirstRender, useIsMounted } from 'hooks';
import { toast } from 'react-toastify';
// selector
import { useDispatch, useSelector } from 'react-redux';
import { selectAddress, selectChainId } from 'redux/slices/web3InfoSlice';
import { AccessControls, hasAdminRoleData } from 'utils/contract/AccesControls';
import FieldInput from 'components/CustomField/FieldInput';
export interface Props {}

function Prediction() {
	const dispatch = useDispatch();
	const isFirstRender = useIsFirstRender();
	const [searchParams, setSearchParams] = useSearchParams();
	const queryCategory: string | null = searchParams.get('category');

	const [listEvent, setListEvent] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isAdmin, setIsAdmin] = useState<boolean>(false);
	const [currentQuery, setCurrentQuery] = useState('');
	const [pagination, setPagination] = useState<any>();
	const isMounted = useIsMounted();
	const [fieldNameValue, setFieldNameValue] = useState<string>('');
	const debouncedNameValue = useDebounce<string>(fieldNameValue, 500);
	// useSelector
	const chainId = useSelector(selectChainId);
	const userAddress = useSelector(selectAddress);
	const filter = useSelector(selectFilter);
	// const hasNextPage = useSelector(selectHasNextPage);
	// const listTokenId = useSelector(selectAllNfts);
	// const isLoading = useSelector(selectLoading);
	const initialState = selectInitialState;
	const { innerWidth } = useContext(SizeContext);
	const MaxWidth = innerWidth < 1800 ? '1440px' : '1600px';

	// use contract
	const { isAbleCreateEvent } = AccessControls();
	const handleGetListEvent = async (chainId: number, query: string, loadmore = false) => {
		try {
			setIsLoading(true);
			const response: any = await eventApi.getListEvent(chainId, query);
			setPagination(response.pagination);
			const listEvent = response.data;
			if (listEvent.length >= 0) {
				if (loadmore === true) {
					setListEvent((prev) => [...prev, ...listEvent]);
				} else {
					setListEvent(listEvent);
				}
				// if (isMounted()) setListEvent([]);
			}
			// else {
			// 	if (isMounted()) setListEvent(listEvent);
			// }
		} catch (error) {
			toast.error('Some error occur when getting your events!');
		} finally {
			if (isMounted()) setIsLoading(false);
			loadmore === false && window.scrollTo({ top: 0, behavior: 'smooth' });
			// window.scrollTo(0, document.body.scrollHeight - 1500)
		}
	};
	useEffect(() => {
		if (!chainId && !userAddress) return;
		(async () => {
			const data: hasAdminRoleData = {
				chainId,
				userAddress,
			};
			const status = await isAbleCreateEvent(data);
			setIsAdmin(status);
		})();
	}, [chainId, userAddress]);
	useEffect(() => {
		let query = '';
		if (queryCategory) {
			query += queryCategory
				?.split(',')
				.map((item) => `&category=${item}`)
				.join('');
		}
		console.log('chainId', chainId);
		handleGetListEvent(chainId, query);
	}, [queryCategory, chainId]);
	useEffect(() => {
		if (isFirstRender) {
			return;
		}
		if (listEvent) {
			let eventFilter: any = {};
			let query = '';
			let urlReplace = `${window.location.origin}#${PATH_PREDICTION.root}/?`;
			console.log(filter);
			if (filter.collectionId) {
				let queryC: string[] = [];
				query += filter.collectionId
					.map((item: any) => {
						queryC.push(item);
						return item === 'All' ? '' : `&category=${item}`;
					})
					.join('');
				// urlReplace += `category=${queryC.join(',')}&`;
			}
			if (filter.status) {
				eventFilter.status = filter.status;
				query += filter.status.map((item) => `&status=${item}`).join('');
			}
			// if (filter.maxPrice && filter.minPrice) {
			// 	query += filter.status.map((item) => `&category=${item}`).join('');
			// }
			if (filter.endTime && filter.startTime) {
				query += `&time=${filter.startTime}&time=${filter.endTime}`;
			}
			if (filter.itemName) {
				query += `&description=${filter.itemName}`;
			}
			// window.history.replaceState(null, '', urlReplace.substring(0, urlReplace.length - 1));
			handleGetListEvent(chainId, query);
			setCurrentQuery(query);
		}
	}, [filter]);

	useEffect(() => {
		if (isFirstRender) {
			return;
		}
		dispatch(setFilter({ ...filter, itemName: debouncedNameValue }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, debouncedNameValue]);
	const handleFilterByName = (e: any) => {
		const value = e.target.value;
		setFieldNameValue(value);
	};
	const handleLoadMore = (page: number) => {
		handleGetListEvent(chainId, `&limit=6&page=${page}${currentQuery}`, true);
	};
	return (
		<Box
			sx={{
				my: '120px',
				maxWidth: MaxWidth,
				mx: 'auto',
				px: 4,
				// [theme.breakpoints.down(768)]: {
				// 	px: 2,
				// },
				// [theme.breakpoints.down(480)]: {
				// 	px: '10px',
				// },
			}}
		>
			<Typography textAlign="center" variant="h1" fontWeight={600} mb={2}>
				Prediction
			</Typography>

			{/* <TabCommon tabItems={tabsDetail.items} tabSections={tabsDetail.sections} /> */}
			<Box sx={{ mb: 2 }}>
				<Stack direction="row" sx={{ justifyContent: 'flex-end' }} spacing={2}>
					{isAdmin === true ? (
						<Link to={PATH_EVENT.create}>
							<ButtonStyled sx={{ marginBottom: '15px' }}>
								<ButtonTitle>Create</ButtonTitle>
							</ButtonStyled>
						</Link>
					) : (
						''
					)}
				</Stack>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<FilterStack sx={{}}>
						<FilterItemGroup
							filterCategoryNews
							filterStatusNews
							// filterPoolNews
							filterDate
							initialStateFilter={initialState.filter}
							filter={filter}
							setFilter={setFilter}
						/>
					</FilterStack>
					<Stack
						direction="row"
						alignItems="center"
						justifyContent="end"
						spacing={1}
						sx={{
							width: '400px',
							maxWidth: '100%',
							marginBottom: '15px',
						}}
					>
						<FieldInput
							type="text"
							onChange={handleFilterByName}
							placeholder="Search name ..."
							sx={{
								padding: '12px 15px',
								width: '100%',
								marginLeft: 'auto',
								minWidth: '130px',
								maxWidth: '600px',
							}}
						/>
					</Stack>
				</Box>

				<DividerGradient />
			</Box>
			{/* Hiển thị danh sách pridiction */}
			<Box>
				<PredictionListCard loading={isLoading} listEvent={listEvent} />
			</Box>
			{pagination && pagination?.currentPage < pagination?.totalPages && (
				<Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
					<ButtonStyled onClick={() => handleLoadMore(pagination?.currentPage + 1)}>
						{isLoading && <CircularProgress size={25} />}
						Load more
					</ButtonStyled>
				</Box>
			)}
		</Box>
	);
}

export default Prediction;
