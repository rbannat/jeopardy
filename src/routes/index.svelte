<script lang="ts">
	import { spreadsheetData } from '../stores.js';
	import Board from '$lib/Board.svelte';
	import type { SpreadsheetData, TransformedSpreadsheetData } from '../types/spreadsheetData.type';
	import type { Credentials } from 'google-auth-library';

	export let valueRanges: SpreadsheetData = [];
	export let credentials: Credentials;

	const { VITE_SPREADSHEET_ID: spreadsheetId, VITE_SHEET_NAME: sheetName } = import.meta.env;

	spreadsheetData.set(transformSpreadsheetData(valueRanges));

	function transformSpreadsheetData(valueRanges: SpreadsheetData): TransformedSpreadsheetData {
		if (!valueRanges?.length) {
			return {
				categories: [],
				questions: []
			};
		}

		const categories = [...valueRanges[1].values].flat();

		const questions = valueRanges[0].values.map((row, i) => ({
			category: row[0],
			amount: +row[1],
			question: row[2],
			answer: row[3],
			answered: row[4] === 'TRUE' ? true : false
		}));

		return { categories, questions };
	}

	async function updateSpreadsheet(values: string[][]) {
		const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}!A2:E31?valueInputOption=USER_ENTERED`;
		const response = await fetch(url, {
			method: 'PUT',
			body: JSON.stringify({
				range: `${sheetName}!A2:E31`,
				majorDimension: 'ROWS',
				values
			}),
			headers: {
				Authorization: 'Bearer ' + credentials.access_token
			}
		});
		return {
			status: response.status
		};
	}
</script>

<svelte:head>
	<title>Jeopardy</title>
	<meta name="description" content="Jeopardy app" />
</svelte:head>

<Board bind:values={$spreadsheetData} {updateSpreadsheet} />
