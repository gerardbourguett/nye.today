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

<div class="container mx-auto max-w-4xl px-4 py-6">
	<header class="mb-8">
		<h1
			class="mb-4 bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-3xl font-bold text-transparent md:text-4xl"
		>
			New Year Live
		</h1>
		<p class="text-lg text-sky-100/80">
			Watch New Year celebrations as they happen around the world. Each timezone celebrates at their
			local midnight.
		</p>
	</header>

	<!-- Stream Selection -->
	<div class="mb-8">
		<h2 class="mb-4 text-xl font-semibold text-sky-100">Select Location</h2>
		<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
			{#each streams as stream}
				<button
					class="relative rounded-lg border p-4 text-left transition-all duration-200 {selected.id ===
					stream.id
						? 'border-sky-400 bg-gradient-to-r from-sky-500/20 to-cyan-500/20 text-white shadow-lg'
						: 'border-sky-900/40 bg-black/30 text-sky-100 hover:border-sky-500/60 hover:bg-sky-500/10'}"
					onclick={() => (selected = stream)}
					aria-label={stream.name}
				>
					<div class="mb-2 flex items-center justify-between">
						<span class="font-medium">{stream.name}</span>
						{#if selected.id === stream.id}
							<div class="h-2 w-2 animate-pulse rounded-full bg-sky-400"></div>
						{/if}
					</div>
					<div class="text-sm text-sky-200/70">{stream.city}</div>
				</button>
			{/each}
		</div>
	</div>

	<!-- Countdown Section -->
	{#if selected.timezone}
		<div
			class="mb-8 rounded-xl border border-sky-500/20 bg-gradient-to-r from-sky-900/30 to-cyan-900/30 p-6 backdrop-blur-sm"
		>
			<div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
				<div>
					<h3 class="mb-1 text-lg font-semibold text-sky-100">
						Countdown to midnight in <span class="text-cyan-300">{selected.city}</span>
					</h3>
					<p class="text-sm text-sky-200/70">
						{selected.timezone}
					</p>
				</div>
				<div class="text-center sm:text-right">
					<div
						class="bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text font-mono text-2xl font-bold text-transparent md:text-3xl"
					>
						{countdown}
					</div>
				</div>
			</div>
		</div>
	{/if}

	<!-- Stream Info -->
	<div class="overflow-hidden rounded-xl border border-sky-900/40 bg-black/20">
		<StreamInfo stream={selected} />
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
