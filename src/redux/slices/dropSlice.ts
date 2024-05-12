/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Response } from 'models';
import { RootState } from 'redux/store';

export interface dropDataState {
	isLoading: boolean;
	isSuccess: boolean;
	errorMessage: string;
	data: object;
	dataComingDrop: any[];
	dataActiveDrop: any[];
}

const initialState: dropDataState = {
	isLoading: false,
	isSuccess: false,
	errorMessage: '',
	data: {},
	dataComingDrop: [],
	dataActiveDrop: [],
};

const slice = createSlice({
	name: 'dropData',
	initialState,
	reducers: {
		startLoading(state) {
			state.isLoading = true;
		},
		hasError(state, action) {
			state.isLoading = false;
			state.isSuccess = false;
			state.errorMessage = action.payload;
		},
		getDropDataSuccess(state, action: PayloadAction<Response<any>>) {
			state.isLoading = false;
			state.isSuccess = true;
			state.data = action.payload;
		},
		getDataComingDrop(state, action: PayloadAction<any>) {
			state.dataComingDrop = action.payload;
		},
		getDataActiveDrop(state, action: PayloadAction<any>) {
			state.dataActiveDrop = action.payload;
		},
	},
});

export const { startLoading, hasError, getDropDataSuccess, getDataComingDrop, getDataActiveDrop } =
	slice.actions;

export const selectDropData = (state: RootState) => state.dropsData.data;
export const selectDataComingDrop = (state: RootState) => state.dropsData.dataComingDrop;
export const selectDataActiveDrop = (state: RootState) => state.dropsData.dataActiveDrop;
export const selectLoading = (state: RootState) => state.dropsData.isLoading;
export const selectSuccess = (state: RootState) => state.dropsData.isSuccess;

export default slice.reducer;
