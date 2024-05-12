import styled from 'styled-components';

export const ContainerColections = styled.div`
	/* margin: 10px 0 70px; */
	padding-bottom: 50px;
`;
export const ListColections = styled.div`
	display: flex;
	justify-content: space-between;
	/* justify-content: center;
	align-items: center; */
`;
export const ItemColection = styled.div`
	cursor: pointer;
	width: 270px;
	padding: 20px;
	border: 1.8px solid #e7e8ec;
	border-radius: 12px;
	transition: all 0.4s;
	background: #fff;

	&:hover {
		box-shadow: 0px 3px 6px rgba(13, 16, 45, 0.25);
	}
`;
export const ImageItem = styled.div`
	display: flex;
	gap: 10px;
	height: 242px;
`;
export const ImageLeft = styled.div`
	height: 100%;
	width: calc(100% - 68px);
	& img {
		height: 100%;
		width: 100%;
		object-fit: cover;
		border-radius: 12px;
		object-position: center center;
	}
`;
export const ImageRight = styled.div`
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	& img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 12px;
		object-position: center center;
	}
`;
export const ContentItem = styled.div`
	padding: 15px 0 8px;
`;
export const TitleItem = styled.div`
	font-style: italic;
	font-weight: 500;
	font-size: 16px;
	margin-bottom: 15px;
`;
export const FooterItem = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-weight: 500;
	font-size: 13px;
	color: #5a5d79;
`;
export const User = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
`;
export const AvatarUser = styled.div`
	& img {
		width: 20px;
		height: 20px;
		object-fit: cover;
		border-radius: 50%;
		object-position: center center;
	}
`;
export const NameUser = styled.div`
	& span {
		color: '#007aff';
	}
`;
export const QualityItem = styled.div``;
