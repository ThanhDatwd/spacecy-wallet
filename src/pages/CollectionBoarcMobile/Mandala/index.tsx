/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useWindowSize } from 'hooks';
import image1 from 'assets/Boarc/image1.png';
import image2 from 'assets/Boarc/image2.png';
import image3 from 'assets/Boarc/image3.png';
import image4 from 'assets/Boarc/image4.png';
import image5 from 'assets/Boarc/image5.png';
import ButtonWhite from 'components/CustomUI/ButtonWhite';

export default function Mandala() {
	const [readMore, setReadMore] = useState(false);
	const { width } = useWindowSize();
	return (
		<Box py={6}>
			<Box sx={{ textAlign: 'center', mb: 2 }}>
				<Typography variant="h2" mb={1} fontWeight="600">
					Mandala Universe
				</Typography>
				{width < 1025 ? (
					<>
						<Box>
							<Typography variant="h6" fontWeight={500}>
								The year 2021 be ended with pain, loss, disease! BOARC looks forward
								to 2022 - the beginning of many new things with positive energy, the
								value of love will spread everywhere towards a bright future.The
								Lotus in the center is a MANDALA Microcosm.
							</Typography>
							<Box
								sx={{
									overflow: 'hidden',
									maxHeight: readMore ? '1000px' : '0px',
									transition: 'max-height 0.5s ease-out',
								}}
							>
								<Typography variant="h6" fontWeight={500}>
									Surrounded by 379 Mantras of Great Compassion, which is the
									Great Universe, it means that by the Buddha’s tolerance and
									compassion, he tolerance and compassion, he sentient beings.
									Boarc wishes to spread Boarc wishes to spread these values to
									379 participants. Each person will complete a word on the
									Mandala by piercing a toothpick to shape the word, and 379 words
									will create a complete Mandala universe as a message that: “We
									all have a heart full of love, compassion and tolerance. Let’s
									spread that love to the community and everywhere.”
								</Typography>
								<Typography variant="h6" fontWeight={500}>
									Boarc wishes to spread Boarc wishes to spread these values to
									379 participants. Each person will complete a word on the
									Mandala by piercing a toothpick to shape the word, and 379 words
									will create a complete Mandala universe as a message that: “We
									all have a heart full of love, compassion and tolerance.
								</Typography>
								<Typography variant="h6" fontWeight={500}>
									Let’s spread that love to the community and everywhere.”
								</Typography>
							</Box>
						</Box>
						<Box sx={{ button: { width: 'fit-content', mx: 'auto', mt: 1 } }}>
							<ButtonWhite
								onClick={() => {
									setReadMore(!readMore);
								}}
							>
								{readMore ? 'Read less' : 'Read more'}
							</ButtonWhite>
						</Box>
					</>
				) : (
					<Box>
						<Typography variant="h6" fontWeight={500}>
							The year 2021 be ended with pain, loss, disease! BOARC looks forward to
							2022 - the beginning of many new things with positive energy, the value
							of love will spread everywhere towards a bright future.The Lotus in the
							center is a MANDALA Microcosm. Surrounded by 379 Mantras of Great
							Compassion, which is the Great Universe, it means that by the Buddha’s
							tolerance and compassion, he tolerance and compassion, he sentient
							beings. Boarc wishes to spread Boarc wishes to spread these values to
							379 participants. Each person will complete a word on the Mandala by
							piercing a toothpick to shape the word, and 379 words will create a
							complete Mandala universe as a message that: “We all have a heart full
							of love, compassion and tolerance. Let’s spread that love to the
							community and everywhere.”
						</Typography>
						<Typography variant="h6" fontWeight={500}>
							Boarc wishes to spread Boarc wishes to spread these values to 379
							participants. Each person will complete a word on the Mandala by
							piercing a toothpick to shape the word, and 379 words will create a
							complete Mandala universe as a message that: “We all have a heart full
							of love, compassion and tolerance.
						</Typography>
						<Typography variant="h6" fontWeight={500}>
							Let’s spread that love to the community and everywhere.”
						</Typography>
					</Box>
				)}
			</Box>
			<Box width="70%" mx="auto">
				<img src={image1} alt="boarc" />
			</Box>
			<Box py={2} sx={{ textAlign: 'center' }}>
				<Typography variant="h4" fontWeight="600" mb={1}>
					Specifications
				</Typography>
				<Typography variant="h6" fontWeight={500}>
					Size: 1.4m x 1.4m
				</Typography>
				<Typography variant="h6" fontWeight={500}>
					Muber of bamboo sticks: 27,00 pieces
				</Typography>
				<Typography variant="h6" fontWeight={500}>
					Made by 379 people
				</Typography>
			</Box>
			<Stack direction="row" justifyContent="space-between" gap="8px">
				<Stack gap="8px" sx={{ width: '50%' }}>
					<img src={image2} alt="boarc" />
					<img src={image3} alt="boarc" />
				</Stack>
				<Stack
					gap="8px"
					sx={{
						width: '50%',
						img: {
							width: '100%',
						},
					}}
				>
					<img src={image4} alt="boarc" />
					<img src={image5} alt="boarc" />
				</Stack>
			</Stack>
		</Box>
	);
}
