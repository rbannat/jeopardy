<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { quintOut } from 'svelte/easing';
	import { transformOrigin } from '../stores.js';

	import { fade, scale } from 'svelte/transition';
	import Button from './Button.svelte';

	const dispatch = createEventDispatcher();

	function handleClose() {
		dispatch('close');
	}
</script>

<div
	class="jp-overlay absolute m-0 w-screen h-screen top-0 left-0"
	style:transform-origin={$transformOrigin}
	in:scale={{ duration: 500, delay: 0, opacity: 0.5, start: 0.2, easing: quintOut }}
	out:fade
>
	<div class="p-4 w-full max-w-screen-lg my-0 mx-auto">
		<div class="flex justify-end">
			<slot name="overlay-ctas" />
			<div class="ml-2">
				<Button class="px-2 py-2" on:click={() => handleClose()}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</Button>
			</div>
		</div>
		<div class="flex flex-col items-center">
			<slot />
		</div>
	</div>
</div>

<style>
	.jp-overlay {
		background: var(--background-gradient-radial);
	}
</style>
