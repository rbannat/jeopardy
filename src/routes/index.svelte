<script lang="ts">
	import { spreadsheetData, selectedQuestion } from '../stores.js';
	import Board from '$lib/Board.svelte';
	import type { Question, SpreadsheetData } from '../types/spreadsheetData.type';
	import type { Credentials } from 'google-auth-library';
	import {
		transformSpreadsheetData,
		transformToValueRange
	} from '$lib/api/transform-spreadsheet-data.js';
	import { updateSpreadsheet } from '$lib/api/update-spreadsheet.js';
	import Overlay from '$lib/Overlay.svelte';
	import DOMPurify from 'dompurify';
	import { marked } from 'marked';
	import Button from '$lib/Button.svelte';
	import { fade } from 'svelte/transition';

	export let valueRanges: SpreadsheetData = [];
	export let credentials: Credentials;

	const { VITE_SPREADSHEET_ID: spreadsheetId, VITE_SHEET_NAME: sheetName } = import.meta.env;

	spreadsheetData.set(transformSpreadsheetData(valueRanges));

	function updateSpreadsheetData(values: string[][]) {
		return updateSpreadsheet({ values, spreadsheetId, sheetName, credentials });
	}

	function showAnswer(question: Question | null) {
		if (!question) {
			return;
		}
		question.answered = true;
		// Update current question
		selectedQuestion.set(question);
		// Update store
		spreadsheetData.set($spreadsheetData);
		const valueRange = transformToValueRange($spreadsheetData.questions);
		updateSpreadsheetData(valueRange);
	}

	function reset(question: Question | null) {
		if (!question) {
			return;
		}
		question.answered = false;
		// Update current question
		selectedQuestion.set(question);
		// update store
		spreadsheetData.set($spreadsheetData);
		const valueRange = transformToValueRange($spreadsheetData.questions);
		updateSpreadsheetData(valueRange);
	}
</script>

<svelte:head>
	<title>Jeopardy</title>
	<meta name="description" content="Jeopardy app" />
</svelte:head>

<Board bind:values={$spreadsheetData} />

{#if $selectedQuestion}
	<Overlay on:close={() => selectedQuestion.set(null)}>
		<div slot="overlay-ctas">
			{#if $selectedQuestion?.answered}
				<Button on:click={() => reset($selectedQuestion)}>Reset</Button>
			{/if}
		</div>

		<div class="mb-4">{$selectedQuestion.category}</div>

		<div class="prose prose-invert">
			{@html marked(DOMPurify.sanitize($selectedQuestion?.question || ''))}
		</div>

		{#if !$selectedQuestion?.answered}
			<div class="mt-6">
				<Button on:click={() => showAnswer($selectedQuestion)}>Show answer</Button>
			</div>
		{:else}
			<div class="flex flex-col items-center prose prose-invert mt-6" in:fade>
				<h3>Answer</h3>
				<div class="prose prose-invert">
					{@html marked(DOMPurify.sanitize($selectedQuestion.answer))}
				</div>
			</div>
		{/if}
	</Overlay>
{/if}
