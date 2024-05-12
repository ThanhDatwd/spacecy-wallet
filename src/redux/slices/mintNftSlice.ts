/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Response } from 'models';
import { RootState } from 'redux/store';

export interface mintNftState {
	idMint: string;
	amount: number;
	isOpen: boolean;
	status: object;
	didMint: boolean;
}

const initialState: mintNftState = {
	idMint: '',
	amount: 1,
	isOpen: false,
	status: { isLoading: false, isSuccess: false, errorMessage: '', isError: false },
	didMint: false,
};

const slice = createSlice({
	name: 'mintNft',
	initialState,
	reducers: {
		resetState(state) {
			state.status = { isLoading: false, isSuccess: false, errorMessage: '', isError: false };
		},
		startLoading(state) {
			state.status = { ...state.status, isLoading: true };
		},
		hasError(state, action) {
			state.status = {
				isLoading: false,
				isSuccess: false,
				isError: true,
				errorMessage: action.payload,
			};
		},
		successBuy(state) {
			state.status = { ...state.status, isLoading: false, isSuccess: true };
		},
		finishBuy(state, action) {
			state.didMint = action.payload;
		},
		openModalBuy(state, action) {
			state.isOpen = true;
			state.idMint = action.payload;
		},
		adjustAmount(state, action) {
			state.amount = action.payload;
		},
		closeModalBuy(state) {
			state.isOpen = false;
			state.idMint = '';
		},
	},
});

export const {
	resetState,
	startLoading,
	hasError,
	successBuy,
	finishBuy,
	openModalBuy,
	closeModalBuy,
	adjustAmount,
} = slice.actions;

export const selectIdMint = (state: RootState) => state.mintNft.idMint;
export const selectOpenModal = (state: RootState) => state.mintNft.isOpen;
export const selectStatus = (state: RootState) => state.mintNft.status;
export const selectAmount = (state: RootState) => state.mintNft.amount;
export const selectDidMint = (state: RootState) => state.mintNft.didMint;
export default slice.reducer;
