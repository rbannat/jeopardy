<script lang="ts">
	import Button from './Button.svelte';
	import type { Question, TransformedSpreadsheetData } from '../types/spreadsheetData.type';
	import { fade } from 'svelte/transition';
	import { marked } from 'marked';
	import DOMPurify from 'dompurify';
	import Overlay from './Overlay.svelte';

	export let values: TransformedSpreadsheetData = { categories: [], questions: [] };
	export let updateSpreadsheet: (values: string[][]) => Promise<{
		status: number;
	}>;

	$: ({ categories, questions } = values);

	$: rows = generateTableRows(questions);

	let selectedQuestion: Question | null = null;
	let transformOrigin = '50% 50%';

	function handleQuestionClick(
		event: MouseEvent & {
			currentTarget: EventTarget & HTMLTableCellElement;
		},
		question: Question
	) {
		const x = event.clientX;
		const y = event.clientY;
		transformOrigin = `${x}px ${y}px`;
		selectedQuestion = question;
	}

	function transpose(array: Question[][]) {
		return array[0].map((_, colIndex) => array.map((row) => row[colIndex]));
	}

	function generateTableRows(questions: TransformedSpreadsheetData['questions']): Question[][] {
		let rows: Question[][] = [[]];

		for (let question of questions) {
			const categoryIndex = categories.indexOf(question.category);
			rows[categoryIndex] = [...(rows[categoryIndex] ? rows[categoryIndex] : []), question];
		}

		return transpose(rows);
	}

	function transformToValueRange(questions: Question[]): string[][] {
		return questions.map(({ category, amount, question, answer, answered }) => [
			category,
			amount.toString(),
			question,
			answer,
			answered ? 'TRUE' : 'FALSE'
		]);
	}

	function showAnswer(question: Question | null) {
		if (!question) {
			return;
		}
		question.answered = true;
		// Update current question
		selectedQuestion = question;
		// Update store
		values = { categories, questions };
		const valueRange = transformToValueRange(questions);
		updateSpreadsheet(valueRange);
	}

	function reset(question: Question | null) {
		if (!question) {
			return;
		}
		question.answered = false;
		// Update current question
		selectedQuestion = question;
		// update store
		values = { categories, questions };
		const valueRange = transformToValueRange(questions);
		updateSpreadsheet(valueRange);
	}
</script>

<table class="table-fixed border-separate border-spacing-2 w-full">
	<thead>
		<tr>
			{#each categories as category}
				<th scope="col" class="border-4 border-neutral-900 px-3 py-4 jp-board-card-head"
					>{category}</th
				>
			{/each}
		</tr>
	</thead>
	<tbody class="bg-[url('/images/jeopardy-bg.webp')] bg-no-repeat bg-cover bg-center">
		{#each rows as row, i}
			<tr>
				{#each row as question, j}
					<td
						class="{question.answered
							? 'bg-transparent'
							: ''} jp-board-card-body border-4 border-neutral-900 px-3 py-4 text-peel-500 cursor-pointer text-center font-bold h-24 text-3xl"
						class:uncovered={question.answered}
						on:click={(event) => handleQuestionClick(event, question)}
						>{!question.answered ? `$${question.amount}` : ''}</td
					>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

{#if selectedQuestion}
	<Overlay {transformOrigin} on:close={() => (selectedQuestion = null)}>
		<div class="prose prose-invert">
			{@html marked(DOMPurify.sanitize(selectedQuestion.question))}
		</div>

		<div slot="overlay-ctas">
			{#if selectedQuestion.answered}
				<Button on:click={() => reset(selectedQuestion)}>Reset</Button>
			{/if}
		</div>

		{#if !selectedQuestion.answered}
			<div class="mt-6">
				<Button on:click={() => showAnswer(selectedQuestion)}>Show answer</Button>
			</div>
		{:else}
			<div class="flex flex-col items-center prose prose-invert mt-6" in:fade>
				<h3>Answer</h3>
				<div class="prose prose-invert">
					{@html marked(DOMPurify.sanitize(selectedQuestion.answer))}
				</div>
			</div>
		{/if}
	</Overlay>
{/if}

<style>
	.jp-board-card-body {
		background: var(--background-gradient-radial);
	}

	.jp-board-card-body.uncovered {
		background: transparent;
	}
</style>
