<script lang="ts">
	import { streams } from '../../lib/data/streams';
	import StreamInfo from '../../lib/components/StreamInfo.svelte';
	import { Button } from '../../lib/components/ui/button';
	import { onMount, onDestroy } from 'svelte';

	let selected = streams[0];

	// Countdown a la medianoche local del stream
	let countdown = '';

	function updateCountdown() {
		if (!selected.timezone) {
			countdown = '';
			return;
		}
		const now = new Date();
		// Hora local en la zona horaria del stream
		const tzNow = new Date(now.toLocaleString('en-US', { timeZone: selected.timezone }));
		const nextMidnight = new Date(tzNow);
		nextMidnight.setHours(24, 0, 0, 0);
		const diff = nextMidnight.getTime() - tzNow.getTime();
		if (diff > 0) {
			const hours = Math.floor(diff / 3600000);
			const minutes = Math.floor((diff % 3600000) / 60000);
			const seconds = Math.floor((diff % 60000) / 1000);
			countdown = `${hours}h ${minutes}m ${seconds}s`;
		} else {
			countdown = '¡Feliz Año Nuevo!';
		}
	}

	let interval: ReturnType<typeof setInterval>;
	onMount(() => {
		updateCountdown();
		interval = setInterval(updateCountdown, 1000);
	});
	onDestroy(() => clearInterval(interval));

	// Actualiza el countdown al cambiar de stream
	$: selected, updateCountdown();
</script>

<div class="min-h-screen pb-6">
	<!-- Header Section -->
	<div
		class="border-b border-zinc-200/50 bg-gradient-to-b from-white to-zinc-50 dark:border-zinc-800/50 dark:from-zinc-900 dark:to-zinc-950"
	>
		<div class="mx-auto max-w-4xl px-4 py-8 sm:py-12">
			<div class="space-y-4 text-center">
				<div
					class="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1 dark:border-red-800 dark:bg-red-950/30"
				>
					<div class="h-2 w-2 animate-pulse rounded-full bg-red-500"></div>
					<span class="text-sm font-medium text-red-600 dark:text-red-400">Live Streams</span>
				</div>
				<h1 class="text-3xl font-bold text-zinc-900 sm:text-4xl dark:text-zinc-100">
					New Year <span
						class="bg-gradient-to-r from-sky-500 to-cyan-500 bg-clip-text text-transparent"
						>Live</span
					>
				</h1>
				<p class="mx-auto max-w-2xl text-zinc-600 dark:text-zinc-400">
					Watch New Year celebrations as they happen around the world. Each timezone celebrates at
					their local midnight.
				</p>
			</div>
		</div>
	</div>

	<div class="mx-auto max-w-4xl space-y-8 px-4 py-6">
		<!-- Stream Selection -->
		<div>
			<h2 class="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Select Location</h2>
			<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
				{#each streams as stream}
					<button
						class="relative rounded-2xl border p-4 text-left transition-all duration-200 {selected.id ===
						stream.id
							? 'border-sky-200 bg-sky-50 shadow-lg ring-1 ring-sky-200 dark:border-sky-800 dark:bg-sky-950/50 dark:ring-sky-800'
							: 'border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700'}"
						onclick={() => (selected = stream)}
						aria-label={stream.name}
					>
						<div class="mb-2 flex items-center justify-between">
							<span class="font-medium text-zinc-900 dark:text-zinc-100">{stream.name}</span>
							{#if selected.id === stream.id}
								<div class="h-2 w-2 animate-pulse rounded-full bg-sky-500"></div>
							{/if}
						</div>
						<div class="text-sm text-zinc-600 dark:text-zinc-400">{stream.city}</div>
					</button>
				{/each}
			</div>
		</div>

		<!-- Countdown Section -->
		{#if selected.timezone}
			<div
				class="rounded-2xl border border-sky-200/50 bg-gradient-to-br from-sky-50 to-cyan-50 p-6 dark:border-sky-800/50 dark:from-sky-950/50 dark:to-cyan-950/50"
			>
				<div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
					<div>
						<h3 class="mb-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
							Countdown to midnight in <span class="text-sky-600 dark:text-sky-400"
								>{selected.city}</span
							>
						</h3>
						<p class="text-sm text-zinc-600 dark:text-zinc-400">
							{selected.timezone}
						</p>
					</div>
					<div class="text-center sm:text-right">
						<div class="font-mono text-2xl font-bold text-sky-600 md:text-3xl dark:text-sky-400">
							{countdown}
						</div>
					</div>
				</div>
			</div>
		{/if}

		<!-- Stream Info -->
		<div
			class="overflow-hidden rounded-2xl border border-zinc-200/50 bg-white shadow-sm dark:border-zinc-800/50 dark:bg-zinc-900"
		>
			<StreamInfo stream={selected} />
		</div>
	</div>
</div>

<style>
	/* Custom scrollbar for webkit browsers */
	::-webkit-scrollbar {
		width: 6px;
	}

	::-webkit-scrollbar-track {
		background: rgba(0, 0, 0, 0.1);
	}

	::-webkit-scrollbar-thumb {
		background: rgba(56, 189, 248, 0.3);
		border-radius: 3px;
	}

	::-webkit-scrollbar-thumb:hover {
		background: rgba(56, 189, 248, 0.5);
	}
</style>
