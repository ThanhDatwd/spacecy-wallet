/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import { API_ENDPOINT } from '../constants';
import { useCallback, useEffect, useRef, useState } from 'react';
//redux
import { getDataActiveDrop, getDataComingDrop, getDropDataSuccess } from 'redux/slices/dropSlice';
import { selectChainId } from 'redux/slices/web3InfoSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

const baseURL = 'collections';
export const useDrop = () => {
	const dispatch = useAppDispatch();
	let chainId = useAppSelector(selectChainId);
	let commingDropData = useRef<any[]>([]);
	let activeDropData = useRef<any[]>([]);

	const getDataDrop = async () => {
		let arrayCollection: any;
		await axios
			.get(`${API_ENDPOINT}${baseURL}/list1/${chainId}`)
			.then(({ data }) => {
				arrayCollection = data.Drop;
				dispatch(getDropDataSuccess(data.Drop));
				return data.Drop;
			})
			.catch((error: any) => {
				console.log(error);
			});

		let arrComingDrop: any[] = [];
		let arrActiveDrop: any[] = [];
		if (arrayCollection) {
			arrayCollection.map((collection: any) => {
				if (collection.active) {
					arrActiveDrop = [...arrActiveDrop, collection];
				} else {
					arrComingDrop = [...arrComingDrop, collection];
				}
			});

			dispatch(getDataActiveDrop(arrActiveDrop));
			dispatch(getDataComingDrop(arrComingDrop));
		}
	};
	const pickCurrentDropData = async (id: any) => {
		let dataDrop;
		try {
			await axios.get(`${API_ENDPOINT}${baseURL}/info/${id}`).then(({ data }) => {
				dataDrop = data;
			});
		} catch (error) {
			console.log(error);
		}
		return dataDrop;
	};
	useEffect(() => {
		getDataDrop();
	}, []);

	return {
		getDataDrop,
		commingDropData,
		activeDropData,
		pickCurrentDropData,
	};
};
