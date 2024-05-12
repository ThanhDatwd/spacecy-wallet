// yup
import * as yup from 'yup';
const schema = yup
	.object({
		inoId: yup.string().required(),
		listItemId: yup.array(yup.string()),
		minPrice: yup.number().required(),
		paymentToken: yup.string().required(),
		startTime: yup.number().required(),
		endTime: yup.number().required(),
		nameINO: yup.string().required(),
		descriptionINO: yup.string().required(),
		bidIncreasePercent: yup.number().required(),
		listItemTokenId: yup.array(yup.string()).required(),
	})
	.required();
export default schema;
