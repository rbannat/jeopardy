<script lang="ts">
	import type { Question, TransformedSpreadsheetData } from '../types/spreadsheetData.type';
	import { generateTableRows } from './api/transform-spreadsheet-data';
	import { selectedQuestion, transformOrigin } from '../stores';

	export let values: TransformedSpreadsheetData = { categories: [], questions: [] };

	$: ({ categories, questions } = values);
	$: rows = generateTableRows({ categories, questions });

	function handleQuestionClick(
		event: MouseEvent & {
			currentTarget: EventTarget & HTMLTableCellElement;
		},
		question: Question
	) {
		const x = event.clientX;
		const y = event.clientY;
		transformOrigin.set(`${x}px ${y}px`);
		selectedQuestion.set(question);
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

<style>
	.jp-board-card-body {
		background: var(--background-gradient-radial);
	}

	.jp-board-card-body.uncovered {
		background: transparent;
	}
</style>
