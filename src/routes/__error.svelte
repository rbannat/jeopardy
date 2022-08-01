<script context="module" lang="ts">
	/** @type {import('./__types/__error').Load} */
	export function load({ status, error }) {
		return {
			props: { status, error }
		};
	}
</script>

<script lang="ts">
	import { dev } from '$app/env';

	export let status: number;
	export let error: { message: string; stack: string };

	// we don't want to use <svelte:window bind:online> here, because we only care about the online
	// state when the page first loads
	let online = typeof navigator !== 'undefined' ? navigator.onLine : true;
</script>

<svelte:head>
	<title>{status}</title>
</svelte:head>

<div class="prose prose-invert max-w-full">
	{#if online}
		<h1>Yikes!</h1>

		{#if error.message}
			<p class="error">{status}: {error.message}</p>
		{:else}
			<p class="error">Encountered a {status} error</p>
		{/if}

		{#if status >= 500}
			{#if dev && error.stack}
				<pre>{error.stack}</pre>
			{:else}
				<p>Please try reloading the page.</p>
			{/if}
		{/if}
	{:else}
		<h1>It looks like you're offline</h1>

		<p>Reload the page once you've found the internet.</p>
	{/if}
</div>

<style>
	.error {
		background-color: #da106e;
		color: white;
		padding: 12px 16px;
		font: 600 16px/1.7 var(--font);
		border-radius: 2px;
	}
</style>
