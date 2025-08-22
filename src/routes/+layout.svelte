<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import BottomNavigation from '$lib/components/BottomNavigation.svelte';
	import { Toaster } from 'svelte-sonner';
	let { children } = $props();

	//Internacionalización
	import '$lib/i18n';
	import { isLoading } from 'svelte-i18n';
</script>

{#if $isLoading}
	<div class="flex min-h-screen items-center justify-center bg-white dark:bg-zinc-900">
		<div class="flex flex-col items-center gap-4">
			<div class="relative">
				<div class="h-8 w-8 rounded-full border-4 border-zinc-200 dark:border-zinc-700"></div>
				<div
					class="absolute top-0 left-0 h-8 w-8 animate-spin rounded-full border-4 border-sky-500 border-t-transparent"
				></div>
			</div>
			<div class="text-sm font-medium text-zinc-600 dark:text-zinc-400">Loading...</div>
		</div>
	</div>
{:else}
	<div
		class="flex min-h-screen flex-col bg-zinc-50 text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-50"
	>
		<Header />
		<main class="flex flex-1 flex-col">
			<div class="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 sm:px-6 lg:px-8">
				{@render children()}
			</div>
			<ModeWatcher />
		</main>
		<Footer />
		<BottomNavigation />
	</div>
	<Toaster richColors position="top-center" />
{/if}
