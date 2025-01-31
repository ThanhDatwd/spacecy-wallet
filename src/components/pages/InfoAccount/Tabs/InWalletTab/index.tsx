/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// redux
import { RootState } from 'redux/store';
import { useSelector, useDispatch } from 'react-redux';
import {
	setFilter,
	selectFilter,
	selectListAssets,
	selectHasNextPage,
	selectLoading,
	selectInitialState,
	resetAll,
	selectPagination,
	setPagination,
} from 'redux/slices/userAssetSlice';
// actions
import { fetchUserAssets } from 'redux/actions/userAssetAction';
// model
import { NFT } from 'models';
// mui
import { Box, Stack, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
//components
import ButtonGradient from 'components/CustomUI/ButtonGradient';
import FieldInput from 'components/CustomField/FieldInput';
import InfiniteListItem from 'components/CustomUI/InfiniteList/InfiniteListItem';
import FilterItemGroup from 'components/CustomUI/FilterItemGroup';
import ButtonLoadmore from 'components/CustomUI/ButtonLoadmore';
// styled
import { FilterStack } from './styled';
import { selectAddress, selectChainId } from 'redux/slices/web3InfoSlice';
import { toast } from 'react-toastify';
// path
import { PATH_ITEM } from 'routes/path';
// hooks
import { useDebounce, useIsFirstRender } from 'hooks';
import ButtonWhite from 'components/CustomUI/ButtonWhite';

interface IInWalletTabProps {}

function InWalletTab(props: IInWalletTabProps) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { pathname } = useLocation();
	const isMyAccount = !pathname.includes('other');
	const { infoAccountAddress } = useParams();

	// useState
	const [fieldNameValue, setFieldNameValue] = useState<string>('');
	const [allowLoadMore, setAllowLoadMore] = useState<boolean>(false);
	const [fetchNextPage, setFetchNextPage] = useState<boolean>(false);
	const [tempAccountAddress, setTempAccountAddress] = useState<string | null | undefined>(null);

	// hooks
	const isFirstRender = useIsFirstRender();
	const debouncedInputValue = useDebounce<string>(fieldNameValue, 500);

	// useSelector
	const userAddress = useSelector(selectAddress);
	const chainId = useSelector(selectChainId);
	const filter = useSelector(selectFilter);
	const pagination = useSelector(selectPagination);
	const listNFTs: NFT[] = useSelector(selectListAssets);
	const isLoading = useSelector(selectLoading);
	const hasNextPage: boolean = useSelector(selectHasNextPage);
	const initialState = selectInitialState;

	// useEffect
	useEffect(() => {
		if (isMyAccount) {
			setTempAccountAddress(userAddress);
		} else {
			setTempAccountAddress(infoAccountAddress);
		}
	}, [infoAccountAddress, userAddress]);

	// fetch all nfts of user address
	// isFirstLoad === true
	useEffect(() => {
		if (tempAccountAddress && chainId) {
			dispatch(
				fetchUserAssets(
					tempAccountAddress,
					chainId,
					initialState.pagination,
					initialState.filter,
					true,
					excuteAfterFetchNFTsByAddress
				)
			);
		}

		return () => {
			dispatch(resetAll());
			setAllowLoadMore(false);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tempAccountAddress, chainId]);

	// fetch all nfts of user address
	// isFirstLoad === false
	useEffect(() => {
		if (pagination.page === 1 && !filter.isFiltering) {
			return;
		}

		if (tempAccountAddress && chainId) {
			dispatch(
				fetchUserAssets(
					tempAccountAddress,
					chainId,
					pagination,
					filter,
					false,
					excuteAfterFetchNFTsByAddress
				)
			);
		}
	}, [pagination, filter]);

	useEffect(() => {
		if (fetchNextPage) {
			dispatch(setPagination({ ...pagination, page: pagination.page + 1 }));
		}
	}, [fetchNextPage]);

	// handle change field name value
	useEffect(() => {
		if (isFirstRender) return;

		dispatch(setFilter({ ...filter, itemName: debouncedInputValue }));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedInputValue]);

	// functions
	const excuteAfterFetchNFTsByAddress = (globalStateNewest: RootState) => {
		setFetchNextPage(false);
		const { userAsset } = globalStateNewest;
		if (!userAsset.isSuccess) {
			toast.error('Some error occur when getting nfts! ' + userAsset.errorMessage);
		}
	};

	const handleFilterByName = (e: any) => {
		const value = e.target.value;
		setFieldNameValue(value);
	};

	const handleFetchNextPage = () => {
		setFetchNextPage(true);
	};

	return (
		<Box sx={{ position: 'relative' }}>
			<FilterStack>
				<FilterItemGroup
					filterBlockChain
					filterStatus
					filterCollection
					filterPrice
					initialStateFilter={initialState.filter}
					filter={filter}
					setFilter={setFilter}
				/>

				<Stack
					direction="row"
					alignItems="center"
					justifyContent="end"
					spacing={2}
					sx={{ flexGrow: 1 }}
				>
					<Box sx={{ flexGrow: 1 }}>
						<FieldInput
							type="text"
							value={fieldNameValue}
							onChange={handleFilterByName}
							placeholder="Search name ..."
							sx={{
								padding: '12.75px 15px',
								width: '80%',
								marginLeft: 'auto',
								minWidth: '130px',
								maxWidth: '500px',
								background: '#fff',

								'::placeholder': {
									color: '#1d1d1f',
								},
							}}
						/>
					</Box>

					{isMyAccount && (
						<Tooltip title="Add Item" placement="top" arrow sx={{ marginLeft: 'auto' }}>
							<Box>
								<ButtonWhite
									sx={{
										py: '10px',
										minWidth: '46px',
										mb: 0,
										background: '#fff',
										border: '1px solid #E7E8EC',
										px: 0,
									}}
									onClick={() => navigate(`${PATH_ITEM.createItem}`)}
								>
									<AddIcon />
								</ButtonWhite>
							</Box>
						</Tooltip>
					)}
				</Stack>
			</FilterStack>

			<Box sx={{ my: 5 }}>
				<InfiniteListItem
					listTokenId={listNFTs}
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
		</Box>
	);
}

export default React.memo(InWalletTab);
