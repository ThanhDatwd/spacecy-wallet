import React from 'react';
import { Box, Typography } from '@mui/material';
import headerIGO from 'assets/Test/igo-detail-background.jpeg';

export interface IHeaderIgoProps {}

export default function HeaderIgo(props: IHeaderIgoProps) {
	return (
		<Box>
			<Box
				sx={{
					position: 'relative',
					width: '100%',
					height: '100vh',
					background: `url(${headerIGO})`,
				}}
			>
				<Box sx={{ position: 'absolute', bottom: '0', width: '100%', margin: '0' }}>
					<Box
						sx={{
							margin: ' 0 auto 145px',
							backgroundColor: 'rgba(0, 0, 0, 0.3)',
							backdropFilter: 'blur(10px)',
							borderRadius: '4px',
							padding: '16px 24px',
							width: '640px',
							color: 'white',
						}}
					>
						<Typography
							variant="h3"
							sx={{ fontWeight: '600', textAlign: 'center', mt: 2 }}
						>
							SYN CITY
						</Typography>
						<Typography
							variant="h4"
							sx={{ fontWeight: '600', textAlign: 'center', mt: 1 }}
						>
							LIMITED EDITTION BLUEPRINT
						</Typography>
						<Box
							sx={{
								margin: '16px auto 12px',
								display: 'flex',
								WebkitBoxPack: 'center',
								justifyContent: 'center',
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								className="css-bmjrun"
								style={{
									margin: '0px 8px 0px 0px',
									minWidth: '0px',
									color: 'rgb(255, 255, 255)',
									fontSize: '24px',
									fill: 'rgb(255, 255, 255)',
									width: '1em',
									height: '1em',
								}}
							>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M7 2h2v2h6V2h2v2h4v17H3V4h4V2zM5 12v7h14v-7H5zm14-2H5V6h2v2h2V6h6v2h2V6h2v4z"
									fill="currentColor"
								></path>
							</svg>
							<Typography>
								2021-12-09 1:00 PM(UTC) to 2021-12-16 1:00 PM(UTC)
							</Typography>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}
