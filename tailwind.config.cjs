/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				// Configure your color palette here
				cadet: {
					100: '#C3BCDC',
					200: '#ABA1CE',
					300: '#9387C0',
					400: '#7B6CB2',
					500: '#6454A0',
					600: '#534686',
					700: '#42386B',
					800: '#312A50',
					900: '#201C35'
				},
				peel: {
					100: '#FFE6C2',
					200: '#FFD599',
					300: '#FFC370',
					400: '#FFB347',
					500: '#FFA21F',
					600: '#F58F00',
					700: '#CC7700',
					800: '#A35F00',
					900: '#7A4700'
				}
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
};
