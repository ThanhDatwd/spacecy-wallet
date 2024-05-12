import { Chart, PieSeries } from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

const data = [
	{ region: 'Asia', val: 4119626293 },
	{ region: 'Africa', val: 1012956064 },
	{ region: 'Northern America', val: 344124520 },
	{ region: 'Latin America and the Caribbean', val: 590946440 },
	{ region: 'Europe', val: 727082222 },
	{ region: 'Oceania', val: 35104756 },
];

// const legendData = [
// 	{ title: 'Asia', color: '#1f77b4' },
// 	{ title: 'Africa', color: '#ff7f0e' },
// 	{ title: 'Northern America', color: '#2ca02c' },
// 	{ title: 'Latin America and the Caribbean', color: '#d62728' },
// 	{ title: 'Europe', color: '#9467bd' },
// 	{ title: 'Oceania', color: '#8c564b' },
// ];

const PredictionCardChart = ({ h = 110 }) => (
	<Chart data={data} height={h}>
		<PieSeries valueField="val" argumentField="region" innerRadius={0.6}>
			<Animation />
		</PieSeries>
	</Chart>
);
export default PredictionCardChart;
