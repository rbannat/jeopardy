<script lang="ts">
	let className: string = '';
	export { className as class };
</script>

<button
	on:click
	class="bg-cadet-500 hover:bg-cadet-700 text-white font-bold py-2 px-4 rounded {className}"
>
	<slot />
</button>
