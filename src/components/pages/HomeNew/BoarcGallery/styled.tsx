import style from 'styled-components';
export const GalleryList = style.div`
	padding: 20px;
	border-radius: 24px;
	background: rgba(177, 218, 255, 0.45);
	display: flex;
	gap: 20px;
	height: 802px;
	overflow: hidden;
	@media (max-width: 1800px) {
		height: 722px;
	}
	@media (max-width: 1450px) {
		height: auto;
	}
	@media (max-width: 992px) {
		padding: 16px;
	}
	@media (max-width: 683px) {
		flex-direction: column;
	}
	// @media (max-height: 900px) {
	// 	height: 650px;
	// }
	// @media (max-height: 900px) and (max-width: 500px) {
	// 	height: auto;
	// }
`;
export const GalleryItemLeft = style.div`
	width: 50%;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 1fr;
	gap: 20px;
	height: 100%;
	.item {
		grid-column: 1 / span 2;
		& img {
			height: 100%;
		}
	}
	& img {
		height: 100%;
		border-radius: 20px;
		width: 100%;
	}
	@media (max-width: 683px) {
		width: 100%;
	}
`;
export const GalleryItemRight = style.div`
	width: 50%;
	display: grid;
	gap: 20px;
	@media (max-width: 683px) {
		width: 100%;
	}
`;
export const Item = style.div`
	
	&.item {
		grid-row: 1 / span 2;
		grid-column: 2;
	}
	& img {
		height: 100%;
		width: 100%;
		border-radius: 20px;
	}
`;
export const ItemLeftAbove = style.div`
	width: 100%;
	height: 50%;
	& img {
		border-radius: 20px;
		height: 100%;
		width: 100%;
	}
`;
export const ItemLeftBottom = style.div`
	display: flex;
	gap: 20px;
	width: 100%;
	height: 50%;
	& div {
		width: 50%;
		& img {
			height: 100%;
			width: 100%;
			border-radius: 20px;
		}
	}
`;
// export const ItemRightLeft = style.div`
// 	display: flex;
// 	flex-direction: column;
// 	height: 100%;
// 	width: 100%;
// 	& div {
// 		height: 50%;
// 		& img {
// 			border-radius: 20px;
// 			height: 100%;
// 			width: 100%;
// 		}
// 	}
// `;
// export const ItemRightRight = style.div`
// 	height: 100%;
// 	width: 100%;
// 	& img {
// 		height: 100%;
// 		border-radius: 20px;
// 		width: 100%;
// 	}
// `;
