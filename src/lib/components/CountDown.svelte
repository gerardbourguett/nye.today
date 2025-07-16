<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { fly } from 'svelte/transition';
	import { CURRENT_YEAR } from '../../data/constants';

	const targetDate = new Date(`${CURRENT_YEAR + 1}-01-01T00:00:00`);

	let timeLeft = {
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0
	};

	let interval: ReturnType<typeof setInterval>;

	function updateCountdown() {
		const now = new Date();
		const difference = targetDate.getTime() - now.getTime();

		if (difference > 0) {
			timeLeft = {
				days: Math.floor(difference / (1000 * 60 * 60 * 24)),
				hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
				minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
				seconds: Math.floor((difference % (1000 * 60)) / 1000)
			};
		} else {
			timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
			if (interval) clearInterval(interval);
		}
	}

	onMount(() => {
		updateCountdown();
		interval = setInterval(updateCountdown, 1000);
	});

	onDestroy(() => {
		if (interval) clearInterval(interval);
	});
</script>

<div class="flex flex-col items-center space-y-3">
	<div class="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
		<!-- Days -->
		<div class="flex flex-col items-center space-y-3">
			<div
				class="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl border border-zinc-200/50 bg-zinc-100/30 p-6 backdrop-blur-sm transition-all duration-300 md:h-32 md:w-32 dark:border-zinc-800/80 dark:bg-zinc-900/30"
			>
				{#key timeLeft.days}
					<span
						in:fly={{ y: 20, duration: 400, delay: 300 }}
						out:fly={{ y: -20, duration: 300 }}
						class="number-glow absolute font-mono text-5xl font-bold text-zinc-800 md:text-6xl dark:text-zinc-100"
					>
						{timeLeft.days.toString().padStart(2, '0')}
					</span>
				{/key}
			</div>
			<span class="text-sm tracking-wider text-zinc-600 uppercase md:text-base dark:text-zinc-400">
				Days
			</span>
		</div>

		<!-- Hours -->
		<div class="flex flex-col items-center space-y-3">
			<div
				class="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl border border-zinc-200/50 bg-zinc-100/30 p-6 backdrop-blur-sm transition-all duration-300 md:h-32 md:w-32 dark:border-zinc-800/80 dark:bg-zinc-900/30"
			>
				{#key timeLeft.hours}
					<span
						in:fly={{ y: 20, duration: 400, delay: 300 }}
						out:fly={{ y: -20, duration: 300 }}
						class="number-glow absolute font-mono text-5xl font-bold text-zinc-800 md:text-6xl dark:text-zinc-100"
					>
						{timeLeft.hours.toString().padStart(2, '0')}
					</span>
				{/key}
			</div>
			<span class="text-sm tracking-wider text-zinc-600 uppercase md:text-base dark:text-zinc-400">
				Hours
			</span>
		</div>

		<!-- Minutes -->
		<div class="flex flex-col items-center space-y-3">
			<div
				class="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl border border-zinc-200/50 bg-zinc-100/30 p-6 backdrop-blur-sm transition-all duration-300 md:h-32 md:w-32 dark:border-zinc-800/80 dark:bg-zinc-900/30"
			>
				{#key timeLeft.minutes}
					<span
						in:fly={{ y: 20, duration: 400, delay: 300 }}
						out:fly={{ y: -20, duration: 300 }}
						class="number-glow absolute font-mono text-5xl font-bold text-zinc-800 md:text-6xl dark:text-zinc-100"
					>
						{timeLeft.minutes.toString().padStart(2, '0')}
					</span>
				{/key}
			</div>
			<span class="text-sm tracking-wider text-zinc-600 uppercase md:text-base dark:text-zinc-400">
				Minutes
			</span>
		</div>

		<!-- Seconds -->
		<div class="flex flex-col items-center space-y-3">
			<div
				class="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl border border-zinc-200/50 bg-zinc-100/30 p-6 backdrop-blur-sm transition-all duration-300 md:h-32 md:w-32 dark:border-zinc-800/80 dark:bg-zinc-900/30"
			>
				{#key timeLeft.seconds}
					<span
						in:fly={{ y: 20, duration: 400, delay: 300 }}
						out:fly={{ y: -20, duration: 300 }}
						class="number-glow absolute font-mono text-5xl font-bold text-zinc-800 md:text-6xl dark:text-zinc-100"
					>
						{timeLeft.seconds.toString().padStart(2, '0')}
					</span>
				{/key}
			</div>
			<span class="text-sm tracking-wider text-zinc-600 uppercase md:text-base dark:text-zinc-400">
				Seconds
			</span>
		</div>
	</div>
</div>

<style>
	.number-glow {
		text-shadow:
			0 0 5px rgba(125, 211, 252, 0.4),
			0 0 10px rgba(125, 211, 252, 0.3),
			0 0 20px rgba(56, 189, 248, 0.2);
	}
	.dark .number-glow {
		text-shadow:
			0 0 5px rgba(14, 165, 233, 0.5),
			0 0 10px rgba(14, 165, 233, 0.4),
			0 0 20px rgba(56, 189, 248, 0.3);
	}
</style>
