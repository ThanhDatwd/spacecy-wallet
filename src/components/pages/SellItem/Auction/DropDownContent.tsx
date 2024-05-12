import React from 'react';
import { INODetail } from 'models/Auction';
import { DropdownWrapper, OptionItemText } from 'components/CustomUI/FilterItemGroup/Common/styled';
import { ListOption, OptionItem } from 'components/CustomField/SelectCustom/styled';
import {
	CheckIconWrapperInCreateAution,
	ItemImageInCreatAuction,
} from 'components/Form/FormCreateAuction/styled';
import { Box, CircularProgress, Stack } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { getFileType, sliceString } from 'utils';
interface Selected {
	itemId: string;
	itemName: string;
	itemMedia?: string;
	itemTokenId?: string;
}
interface Props {
	listData: INODetail;
	selected: Selected[];
	handleClickOption: any;
}

const DropDownContent: React.FC<Props> = ({ listData, selected, handleClickOption }) => {
	return (
		<>
			<DropdownWrapper sx={{ width: '100%', right: '0' }}>
				{listData.items.length > 0 ? (
					<ListOption sx={{ mt: 0.5 }}>
						{listData.items.map((item: any, idx: number) => {
							const isItemSelected =
								selected.find(
									(itemSelected: Selected) => itemSelected.itemId === item._id
								) !== undefined;

							return (
								<OptionItem
									key={idx}
									onClick={() => {
										handleClickOption(
											item._id,
											item.itemName,
											item.itemMedia,
											item.itemTokenId
										);
									}}
									sx={{ marginTop: '8px' }}
								>
									<Stack direction="row" alignItems="center">
										<ItemImageInCreatAuction>
											{getFileType(item.itemMedia) === 'mp4' ? (
												<Box sx={{ width: '44px', height: '44px' }}>
													<video
														className="player-auction"
														style={{
															width: '44px',
															height: '44px',
														}}
													>
														<source
															src={item.itemMedia}
															type="video/mp4"
														></source>
													</video>
												</Box>
											) : (
												<img src={item.itemMedia} alt={item.itemName} />
											)}
										</ItemImageInCreatAuction>
										<Stack direction="column" alignItems="flex-start">
											<OptionItemText>
												{sliceString(item.itemName, 22)}
											</OptionItemText>
											<OptionItemText>
												{sliceString(item.itemTokenId, 10)}
											</OptionItemText>
										</Stack>
									</Stack>

									{isItemSelected && (
										<CheckIconWrapperInCreateAution>
											<CheckIcon sx={{ width: '100%', height: '100%' }} />
										</CheckIconWrapperInCreateAution>
									)}
								</OptionItem>
							);
						})}
					</ListOption>
				) : (
					<Box sx={{ textAlign: 'center' }}>
						<CircularProgress />
					</Box>
				)}
			</DropdownWrapper>
		</>
	);
};

export default DropDownContent;
