/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
//mui
import { Stack, Typography, useTheme } from '@mui/material';
// redux
import { useSelector } from 'react-redux';
import { selectNftItem } from 'redux/slices/nftItemByItemIdSlice';
import { selectAddress } from 'redux/slices/web3InfoSlice';
//styled
import { SellMethodBox, SellMethodWrapper } from './styled';
//image
import TagWhite from 'assets/icons/tag-white.webp';
import TicketWhite from 'assets/icons/ticket-white.webp';

import TagBlack from 'assets/icons/tag-black.webp';
import TicketBlack from 'assets/icons/ticket-black.webp';

import AuctionWhite from 'assets/icons/icon-auction-white.svg';
import AuctionBlack from 'assets/icons/icon-auction.svg';

//context
import { useSelling } from 'contexts/SellingContext';
//constant
import { ORDER_CONFIGURATION } from '../../../../constants';
// utils
import { tokenErcFunction } from 'utils';
// models
import { NFT } from 'models';

const { checkTokenContractStandard, getBlanceOfToken1155 } = tokenErcFunction();

function SellItemMethod() {
	const theme = useTheme();
	//context
	const context = useSelling();
	const { state, dispatch } = context;
	const { saleKind } = state;

	// useSelector
	const item: NFT | null = useSelector(selectNftItem);
	const userAddress = useSelector(selectAddress);

	//Sale kind
	const FIXED = ORDER_CONFIGURATION.FIXED_PRICE;
	const DUTCH = ORDER_CONFIGURATION.DUTCH_AUCTION;
	const USA = ORDER_CONFIGURATION.USA_AUCTION;
	// useEffect
	// check standard and max supply
	useEffect(() => {
		(async () => {
			if (!item || !item.collectionInfo || !userAddress) {
				return;
			}

			// check standard
			try {
				const standard: 'ERC1155' | 'ERC721' = await checkTokenContractStandard(
					item.collectionInfo.collectionAddress
				);

				if (standard.includes('1155')) {
					// set standard
					dispatch({ type: 'SET_IS_1155', value: true });

					// set max supply
					const maxSupply: number = await getBlanceOfToken1155(
						userAddress,
						item.collectionInfo.collectionAddress,
						item.itemTokenId
					);

					dispatch({ type: 'SET_MAX_SUPPLY', value: maxSupply });
				} else {
					// set standard
					dispatch({ type: 'SET_IS_1155', value: false });
				}
			} catch (error) {
				toast.error('Some error occur when track your item on blockchain!');
				return;
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userAddress, item]);

	// set saleKind
	const handleChangeSellingMethod = (newSaleKind: number) => {
		if (newSaleKind === saleKind) return;

		dispatch({ type: 'RESET_SELLING_STATE', value: null });
		dispatch({ type: 'SET_SALE_KIND', value: newSaleKind });
	};

	return (
		<Stack direction="row" alignItems="center" spacing={3}>
			<SellMethodWrapper sx={{}}>
				<SellMethodBox
					active={saleKind === FIXED ? true : false}
					onClick={() => handleChangeSellingMethod(FIXED)}
					sx={{
						...(saleKind === FIXED
							? {
									backgroundColor: theme.palette.primary.light,
									color: 'white',
									borderColor: theme.palette.primary.light,
							  }
							: { backgroundColor: 'white' }),
					}}
				>
					<img
						src={saleKind === FIXED ? TagWhite : TagBlack}
						alt="tag price"
						width={22}
						height={22}
					/>
					<Typography variant="h6" fontWeight="500">
						Fixed Price
					</Typography>
				</SellMethodBox>
			</SellMethodWrapper>

			<SellMethodWrapper>
				<SellMethodBox
					active={saleKind === DUTCH ? true : false}
					onClick={() => handleChangeSellingMethod(DUTCH)}
					sx={{
						...(saleKind === DUTCH
							? {
									backgroundColor: theme.palette.primary.light,
									color: 'white',
									borderColor: theme.palette.primary.light,
							  }
							: { backgroundColor: 'white' }),
					}}
				>
					<img
						src={saleKind === DUTCH ? TicketWhite : TicketBlack}
						alt="ticket"
						width={24}
						height={18}
					/>
					<Typography variant="h6" fontWeight="500">
						Falling Price
					</Typography>
				</SellMethodBox>
			</SellMethodWrapper>

			{/* <SellMethodWrapper>
				<SellMethodBox
					active={saleKind === USA ? true : false}
					onClick={() => handleChangeSellingMethod(USA)}
					sx={{
						...(saleKind === USA
							? {
									backgroundColor: theme.palette.primary.light,
									color: 'white',
									borderColor: theme.palette.primary.light,
							  }
							: { backgroundColor: 'white' }),
					}}
				>
					<img
						src={saleKind === USA ? AuctionWhite : AuctionBlack}
						alt="ticket"
						width={22}
						height={22}
					/>
					<Typography variant="h6" fontWeight="500">
						Auction
					</Typography>
				</SellMethodBox>
			</SellMethodWrapper> */}
		</Stack>
	);
}
export default SellItemMethod;
