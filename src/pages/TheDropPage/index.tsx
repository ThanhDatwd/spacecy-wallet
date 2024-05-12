/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DropPage1155 from 'pages/DropPage-1155';
import DropPageNew721 from 'pages/DropPageNew-721';
import { useDrop } from 'hooks/useDrop';
import { useAppSelector } from 'redux/hooks';
import { selectDidMint } from 'redux/slices/mintNftSlice';

const TheDropPage = () => {
	const didMint = useAppSelector(selectDidMint);
	const [data, setData] = useState<any>();
	const { id } = useParams();
	const { pickCurrentDropData } = useDrop();
	const getDropData = async () => {
		let result = await pickCurrentDropData(id);
		setData(result);
	};
	useEffect(() => {
		getDropData();
	}, [didMint]);
	useEffect(() => {
		if (data) {
		}
	}, [data]);
	return (
		<>
			{data && data.Collection.info.ERC === '1155' ? (
				<>
					<DropPage1155 data={data} />
				</>
			) : (
				<>
					{' '}
					<DropPageNew721 data={data} />{' '}
				</>
			)}
		</>
	);
};

export default React.memo(TheDropPage);
