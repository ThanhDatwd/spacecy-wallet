/* eslint-disable @typescript-eslint/no-unused-vars */
// components
import { Box } from '@mui/material';
import nftsApi from 'apis/nftsApi';
import NFTItemCard from 'components/CustomUI/Card/NFTItemCard';
import NoItem from 'components/CustomUI/Card/NoItemCard/NoItemRectangleCard';
import ErrorBoundary from 'components/CustomUI/ErrorBoundary';
import SkeletonNftList from 'components/CustomUI/Skeleton/List/SkeletonNFTList';
import { ListResponse, Response } from 'models';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
// styled
import { BoxGrid } from './styled';
import { SizeContext } from 'contexts/SizeObserver';
import { RootState } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListPaymentTokenByChainId } from 'redux/actions/tokenPaymentAction';
import { selectChainId } from 'redux/slices/web3InfoSlice';
const ListNFT = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [listNFTs, setListNFTs] = useState<any>([]);
	const [refresh, setRefresh] = useState<boolean>(false);
	const { innerWidth } = useContext(SizeContext);
	const [changePageSize, setChangePageSize] = useState<number>(12);
	const dispatch = useDispatch();
	const chainId = useSelector(selectChainId);
	//fetch list token payment so that we can get token address to use in covert wei to token function
	const executeAfterFetchListTokenPayment = (globalStateNewest: RootState) => {
		const { tokenPayment } = globalStateNewest;
		if (!tokenPayment.isSuccess) {
			toast.error('Can not fetch list token payment!');
		}
	};

	useEffect(() => {
		dispatch(fetchListPaymentTokenByChainId(chainId, executeAfterFetchListTokenPayment));
	}, [chainId]);
	//end

	// useEffect
	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const listToken: Response<any> = await nftsApi.getStaticData();
				setListNFTs(listToken.data);
				setIsLoading(false);
				setIsSuccess(true);
			} catch (error) {
				toast.error('Some error occurred while fetching');
				setIsLoading(false);
				setIsSuccess(false);
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [refresh]);

	useEffect(() => {
		if (innerWidth < 1090 && innerWidth > 830) {
			setChangePageSize(9);
		} else if (innerWidth < 830 && innerWidth > 545) {
			setChangePageSize(6);
		} else if (innerWidth < 545) {
			setChangePageSize(3);
		}
	}, [innerWidth]);

	const handleRefresh = (e: any) => {
		e.stopPropagation();
		setRefresh(false);
		setTimeout(() => {
			setRefresh(true);
		}, 1);
	};

	return (
		<Fragment>
			{isLoading ? (
				<BoxGrid sx={{ mt: 2 }}>
					<SkeletonNftList amount={changePageSize} />
				</BoxGrid>
			) : isSuccess ? (
				<BoxGrid sx={{ mt: 2, fontStyle: 'italic' }}>
					{listNFTs
						.map((item: any, index: number) => {
							if (index >= changePageSize) return null;
							return <NFTItemCard itemId={item} key={index} />;
						})
						.filter((filter: any) => filter !== null)}
				</BoxGrid>
			) : (
				<ErrorBoundary
					title="Error!!!"
					content="Currently we couldn't load this content. Please refresh"
					callbackFn={handleRefresh}
				/>
			)}
		</Fragment>
	);
};

export default React.memo(ListNFT);
