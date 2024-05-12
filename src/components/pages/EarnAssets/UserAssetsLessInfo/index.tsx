/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import { selectListStakingSlotOfUser } from 'redux/slices/listStakingSlotOfUserSlice';

export interface IUserAssetsLessInfo {}

export default function UserAssetsLessInfo(props: IUserAssetsLessInfo) {
	const listStakingSlot = useSelector(selectListStakingSlotOfUser);

	return <></>;
}
