import { Chart, PieSeries } from '@devexpress/dx-react-chart-material-ui';
import { Animation, Palette } from '@devexpress/dx-react-chart';

interface IProp {
	h?: number;
	data: any;
	listColor: string[];
}
const PredictionCardChart = ({ h = 110, data = [], listColor = [] }: IProp) => {
	return (
		<Chart data={data} height={h}>
			<PieSeries valueField="amount" argumentField="name" innerRadius={0.6}>
				<Animation />
				<Palette scheme={listColor} />
			</PieSeries>
		</Chart>
	);
};
export default PredictionCardChart;
