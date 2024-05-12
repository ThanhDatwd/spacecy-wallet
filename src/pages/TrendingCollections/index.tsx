/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, lazy } from 'react';
import { toast } from 'react-toastify';
//redux
import { RootState } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectListCollection,
	selectPagination,
	selectLoading,
	selectFilter,
	selectHasNextPage,
	resetAll,
	setPagination,
	selectInitialState,
	setFilter,
	selectIsFiltering,
} from 'redux/slices/collectionTrendingSlice';
import { selectAddress, selectChainId } from 'redux/slices/web3InfoSlice';
//actions
import { fetchTrendingCollection } from 'redux/actions/collectionTrendingAction';
//components
import DropDown from 'components/CustomUI/DropDown';
import InfiniteListTrendingCollection from 'components/CustomUI/InfiniteList/InfiniteListTrendingCollection';
import ButtonLoadmore from 'components/CustomUI/ButtonLoadmore';
//mui
import { Box, Container, Stack, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CheckIcon from '@mui/icons-material/Check';
//styled
import { FilterTrendingCollection } from 'components/pages/Home/ListTopCollection/styled';
import {
	CheckIconWrapper,
	DropdownWrapper,
	ListOption,
	OptionItem,
	OptionItemText,
} from 'components/CustomUI/FilterItemGroup/Common/styled';
import { flexStyled } from 'components/Theme/CustomStyled';

// icon
import IconApp from 'assets/icons/icon-app.svg';
import IconTrend from 'assets/icons/icon-trend.svg';
import bglight from 'assets/Home/BG1.webp';
import FilterItemRanking from 'components/CustomUI/FilterItemRanking';

type FilterProps = {
	name: string;
	value: string;
};

const listFilter: FilterProps[] = [
	{ name: '1 day', value: 'volume24Hours' },
	{ name: '7 days', value: 'volume7Days' },
	{ name: '30 days', value: 'volume30Days' },
];

function TrendingCollections() {
	const dispatch = useDispatch();

	// useState
	const [allowLoadMore, setAllowLoadMore] = useState<boolean>(false);
	const [fetchNextPage, setFetchNextPage] = useState<boolean>(false);
	const [activeDropDown, setActiveDropDown] = useState<boolean>(false);
	const [selectedFilter, setSelectedFilter] = useState<string>('7 days');

	// useSelector
	const pagination = useSelector(selectPagination);
	const filter = useSelector(selectFilter);
	const hasNextPage = useSelector(selectHasNextPage);
	const listCollection = useSelector(selectListCollection);
	const isLoading = useSelector(selectLoading);
	const isFiltering = useSelector(selectIsFiltering);
	const chainId = useSelector(selectChainId);

	const initialState = selectInitialState;

	// useEffect
	// fetchTrendingCollection isFirstLoad === true
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	useEffect(() => {
		dispatch(
			fetchTrendingCollection(
				chainId,
				initialState.pagination,
				initialState.filter,
				true,
				executeAfterFetchAllCollection
			)
		);

		return () => {
			dispatch(resetAll());
			setAllowLoadMore(false);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// fetchTrendingCollection isFirstLoad === false
	useEffect(() => {
		if (pagination.page === 1 && !isFiltering) {
			return;
		}

		dispatch(
			fetchTrendingCollection(
				chainId,
				pagination,
				filter,
				false,
				executeAfterFetchAllCollection
			)
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pagination, filter]);

	useEffect(() => {
		if (fetchNextPage) {
			dispatch(setPagination({ ...pagination, page: pagination.page + 1 }));
		}
	}, [fetchNextPage]);

	// functions
	const handleFetchNextPage = () => {
		setFetchNextPage(true);
	};

	const handleClickOption = (filterDay: FilterProps) => {
		setSelectedFilter(filterDay.name);
		// setSortBy(filter.value);
		dispatch(setFilter({ ...filter, sortBy: filterDay.value }));
		setActiveDropDown(false);
	};

	const executeAfterFetchAllCollection = (globalStateNewest: RootState) => {
		setFetchNextPage(false);

		const { trendingCollection } = globalStateNewest;

		if (!trendingCollection.isSuccess) {
			toast.error('Can’t get trending collections!');
		}
	};

	const renderButtonContent = () => (
		<FilterTrendingCollection variant="h3">
			{selectedFilter} <KeyboardArrowDownIcon sx={{ width: 20, height: 20 }} />
		</FilterTrendingCollection>
	);

	const renderDropdownContent = () => (
		<DropdownWrapper sx={{ width: '180px' }}>
			<ListOption>
				{listFilter.map((filter: FilterProps, index: number) => {
					const isItemSelected = selectedFilter === filter.name;
					return (
						<OptionItem key={index} onClick={() => handleClickOption(filter)}>
							<OptionItemText>{filter.name}</OptionItemText>

							{isItemSelected && (
								<CheckIconWrapper>
									<CheckIcon sx={{ width: '100%', height: '100%' }} />
								</CheckIconWrapper>
							)}
						</OptionItem>
					);
				})}
			</ListOption>
		</DropdownWrapper>
	);

	return (
		<Box sx={{}}>
			<Container
				maxWidth="xl"
				sx={{
					mt: 18,
				}}
			>
				<Box
					sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 8 }}
				>
					<Typography variant="h1" fontWeight="500">
						Rankings
					</Typography>
				</Box>

				<Box
					sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
				>
					<FilterItemRanking
						initialStateFilter={initialState.filter}
						filter={filter}
						setFilter={setFilter}
					/>
					<Box
						sx={{
							'& .ranking': {
								padding: '6px 8px 6px 12px',
								border: '1px solid #E7E8EC',
								background: '#fff',
								borderRadius: '12px',
								cursor: 'pointer',
								width: '180px',
							},
							h3: {
								fontSize: '16px',
								color: '#1d1d1f',
								fontWeight: 500,
								justifyContent: 'space-between',
								paddingLeft: 0,
							},
						}}
					>
						<DropDown
							activeDropDown={activeDropDown}
							setActiveDropDown={setActiveDropDown}
							buttonContent={renderButtonContent()}
							dropdownContent={renderDropdownContent()}
							className="ranking"
						/>
					</Box>
				</Box>

				<Box sx={{ margin: '20px 0' }}>
					<InfiniteListTrendingCollection
						listCollection={listCollection}
						isLoading={isLoading}
						hasNextPage={hasNextPage}
						fetchNextPage={handleFetchNextPage}
						allowLoadMore={allowLoadMore}
					/>
				</Box>

				{!allowLoadMore && hasNextPage && !isLoading && (
					<Stack sx={{ marginTop: '50px' }} alignItems="center">
						<ButtonLoadmore onClick={() => setAllowLoadMore(true)} />
					</Stack>
				)}
			</Container>
		</Box>
	);
}

export default React.memo(TrendingCollections);
