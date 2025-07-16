<script lang="ts">
	import { streams } from '../../lib/data/streams';
	import StreamPlayer from '../../lib/components/StreamPlayer.svelte';
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

<h1 class="mb-4 text-2xl font-bold">New Year Live</h1>

<div class="stream-list mb-6">
	{#each streams as stream}
		<Button
			class={`w-full ${selected.id === stream.id ? 'selected' : ''}`}
			onclick={() => (selected = stream)}
			aria-label={stream.name}
		>
			{stream.name} ({stream.city})
		</Button>
	{/each}
</div>

{#if selected.timezone}
	<div class="countdown mb-4">
		<span>
			Countdown to midnight in <b>{selected.city}</b>:
			<span class="mono">{countdown}</span>
		</span>
	</div>
{/if}

<StreamPlayer stream={selected} />

<style>
	.stream-list {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-bottom: 2rem;
	}
	.stream-list button.selected,
	.stream-list .selected {
		background: gold !important;
		color: #222 !important;
		font-weight: bold;
		border: 2px solid #222;
	}
	.countdown {
		font-size: 1.2rem;
		color: #fff;
		background: #18181b;
		border-radius: 0.5rem;
		padding: 0.5rem 1rem;
		display: inline-block;
		margin-bottom: 1rem;
	}
	.countdown .mono {
		font-family: 'Fira Mono', 'Consolas', monospace;
		font-weight: bold;
		color: #ffd700;
		margin-left: 0.5rem;
	}
</style>
