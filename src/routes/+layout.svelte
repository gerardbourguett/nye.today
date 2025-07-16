<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	let { children } = $props();
</script>

<div
	class="flex min-h-screen flex-col bg-gradient-to-b from-white to-zinc-100 text-zinc-900 antialiased transition-colors duration-300 dark:from-black dark:to-zinc-900 dark:text-white"
>
	<Header />
	<main
		class="mx-auto flex w-full max-w-7xl flex-grow flex-col items-center justify-center px-4 sm:px-6 lg:px-8"
	>
		{@render children()}
		<ModeWatcher />
	</main>
	<Footer />
</div>
