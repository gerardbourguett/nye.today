<script lang="ts">
	import { CURRENT_YEAR } from '../lib/data/constants';
	import TimeProgress from '$lib/components/TimeProgress.svelte';
	import { onMount } from 'svelte';
	import CountDown from '$lib/components/CountDown.svelte';

	let isMounted = false;

	onMount(() => {
		isMounted = true;
	});
</script>

<svelte:head>
	<title>#{CURRENT_YEAR + 1}Live</title>
	<meta name="description" content="Countdown to #{CURRENT_YEAR + 1} Live" />
</svelte:head>

<div class="flex flex-1 flex-col items-center justify-center py-8 sm:py-12">
	<!-- Hero Section -->
	<div class="w-full max-w-4xl mx-auto text-center space-y-8 sm:space-y-12">
		<!-- Main Title -->
		<div class="space-y-4">
			<div class="inline-flex items-center gap-2 rounded-full bg-white dark:bg-zinc-900 px-4 py-2 shadow-sm border border-zinc-200 dark:border-zinc-800">
				<div class="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
				<span class="text-sm font-medium text-zinc-600 dark:text-zinc-400">
					Live Countdown
				</span>
			</div>
			
			<h1 class="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
				<span class="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-700 dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-300 bg-clip-text text-transparent">
					#{CURRENT_YEAR + 1}
				</span>
				<span class="bg-gradient-to-r from-sky-500 to-cyan-500 bg-clip-text text-transparent animate-pulse">
					Live
				</span>
			</h1>
		</div>

		<!-- Time Progress Card -->
		<div class="mx-auto w-full max-w-2xl">
			<div class="rounded-3xl bg-white dark:bg-zinc-900 p-6 sm:p-8 shadow-lg border border-zinc-200/50 dark:border-zinc-800/50">
				<TimeProgress />
			</div>
		</div>

		<!-- Countdown Section -->
		<div class="w-full space-y-6">
			<div class="mx-auto max-w-5xl">
				<CountDown />
			</div>
		</div>
	</div>
</div>
