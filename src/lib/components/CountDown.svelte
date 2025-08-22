<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import { CURRENT_YEAR } from '../data/constants';
	import { _ } from 'svelte-i18n';

	const targetDate = new Date(`2026-01-01T00:00:00`);

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

<div class="w-full space-y-8">
	<!-- Mobile layout (2x2) -->
	<div class="grid grid-cols-2 gap-4 sm:hidden">
		<!-- Days -->
		<div class="flex flex-col items-center space-y-3">
			<div class="relative h-24 w-full">
				<div
					class="absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-400/10 to-cyan-500/10 dark:from-sky-400/20 dark:to-cyan-500/20"
				></div>
				<div
					class="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border border-zinc-200/50 bg-white/80 shadow-lg backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80"
				>
					<div class="relative flex h-12 w-16 items-center justify-center">
						{#key timeLeft.days}
							<span
								in:fade={{ duration: 200 }}
								out:fade={{ duration: 100 }}
								class="absolute inset-0 flex items-center justify-center font-mono text-3xl font-bold text-zinc-900 dark:text-zinc-100"
								style="font-variant-numeric: tabular-nums; font-feature-settings: 'tnum';"
							>
								{timeLeft.days.toString().padStart(2, '0')}
							</span>
						{/key}
					</div>
				</div>
			</div>
			<span class="text-sm font-medium tracking-wide text-zinc-600 uppercase dark:text-zinc-400">
				{$_('countdown.days')}
			</span>
		</div>

		<!-- Hours -->
		<div class="flex flex-col items-center space-y-3">
			<div class="relative h-24 w-full">
				<div
					class="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-400/10 to-teal-500/10 dark:from-emerald-400/20 dark:to-teal-500/20"
				></div>
				<div
					class="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border border-zinc-200/50 bg-white/80 shadow-lg backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80"
				>
					<div class="relative flex h-12 w-16 items-center justify-center">
						{#key timeLeft.hours}
							<span
								in:fade={{ duration: 200 }}
								out:fade={{ duration: 100 }}
								class="absolute inset-0 flex items-center justify-center font-mono text-3xl font-bold text-zinc-900 dark:text-zinc-100"
								style="font-variant-numeric: tabular-nums; font-feature-settings: 'tnum';"
							>
								{timeLeft.hours.toString().padStart(2, '0')}
							</span>
						{/key}
					</div>
				</div>
			</div>
			<span class="text-sm font-medium tracking-wide text-zinc-600 uppercase dark:text-zinc-400">
				{$_('countdown.hours')}
			</span>
		</div>

		<!-- Minutes -->
		<div class="flex flex-col items-center space-y-3">
			<div class="relative h-24 w-full">
				<div
					class="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400/10 to-orange-500/10 dark:from-amber-400/20 dark:to-orange-500/20"
				></div>
				<div
					class="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border border-zinc-200/50 bg-white/80 shadow-lg backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80"
				>
					<div class="relative flex h-12 w-16 items-center justify-center">
						{#key timeLeft.minutes}
							<span
								in:fade={{ duration: 200 }}
								out:fade={{ duration: 100 }}
								class="absolute inset-0 flex items-center justify-center font-mono text-3xl font-bold text-zinc-900 dark:text-zinc-100"
								style="font-variant-numeric: tabular-nums; font-feature-settings: 'tnum';"
							>
								{timeLeft.minutes.toString().padStart(2, '0')}
							</span>
						{/key}
					</div>
				</div>
			</div>
			<span class="text-sm font-medium tracking-wide text-zinc-600 uppercase dark:text-zinc-400">
				{$_('countdown.minutes')}
			</span>
		</div>

		<!-- Seconds -->
		<div class="flex flex-col items-center space-y-3">
			<div class="relative h-24 w-full">
				<div
					class="absolute inset-0 rounded-2xl bg-gradient-to-br from-rose-400/10 to-pink-500/10 dark:from-rose-400/20 dark:to-pink-500/20"
				></div>
				<div
					class="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border border-zinc-200/50 bg-white/80 shadow-lg backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80"
				>
					<div class="relative flex h-12 w-16 items-center justify-center">
						{#key timeLeft.seconds}
							<span
								in:fade={{ duration: 200 }}
								out:fade={{ duration: 100 }}
								class="absolute inset-0 flex items-center justify-center font-mono text-3xl font-bold text-zinc-900 dark:text-zinc-100"
								style="font-variant-numeric: tabular-nums; font-feature-settings: 'tnum';"
							>
								{timeLeft.seconds.toString().padStart(2, '0')}
							</span>
						{/key}
					</div>
				</div>
			</div>
			<span class="text-sm font-medium tracking-wide text-zinc-600 uppercase dark:text-zinc-400">
				{$_('countdown.seconds')}
			</span>
		</div>
	</div>

	<!-- Desktop layout (1x4) -->
	<div class="hidden sm:grid sm:grid-cols-4 sm:gap-6 md:gap-8">
		<!-- Days -->
		<div class="flex flex-col items-center space-y-4">
			<div class="relative h-32 w-full max-w-32">
				<div
					class="absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-400/10 to-cyan-500/10 dark:from-sky-400/20 dark:to-cyan-500/20"
				></div>
				<div
					class="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border border-zinc-200/50 bg-white/80 shadow-lg backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80"
				>
					<div class="relative flex h-16 w-24 items-center justify-center">
						{#key timeLeft.days}
							<span
								in:fade={{ duration: 200 }}
								out:fade={{ duration: 100 }}
								class="absolute inset-0 flex items-center justify-center font-mono text-4xl font-bold text-zinc-900 md:text-5xl dark:text-zinc-100"
								style="font-variant-numeric: tabular-nums; font-feature-settings: 'tnum';"
							>
								{timeLeft.days.toString().padStart(2, '0')}
							</span>
						{/key}
					</div>
				</div>
			</div>
			<span class="text-sm font-medium tracking-wide text-zinc-600 uppercase dark:text-zinc-400">
				{$_('countdown.days')}
			</span>
		</div>

		<!-- Hours -->
		<div class="flex flex-col items-center space-y-4">
			<div class="relative h-32 w-full max-w-32">
				<div
					class="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-400/10 to-teal-500/10 dark:from-emerald-400/20 dark:to-teal-500/20"
				></div>
				<div
					class="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border border-zinc-200/50 bg-white/80 shadow-lg backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80"
				>
					<div class="relative flex h-16 w-24 items-center justify-center">
						{#key timeLeft.hours}
							<span
								in:fade={{ duration: 200 }}
								out:fade={{ duration: 100 }}
								class="absolute inset-0 flex items-center justify-center font-mono text-4xl font-bold text-zinc-900 md:text-5xl dark:text-zinc-100"
								style="font-variant-numeric: tabular-nums; font-feature-settings: 'tnum';"
							>
								{timeLeft.hours.toString().padStart(2, '0')}
							</span>
						{/key}
					</div>
				</div>
			</div>
			<span class="text-sm font-medium tracking-wide text-zinc-600 uppercase dark:text-zinc-400">
				{$_('countdown.hours')}
			</span>
		</div>

		<!-- Minutes -->
		<div class="flex flex-col items-center space-y-4">
			<div class="relative h-32 w-full max-w-32">
				<div
					class="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400/10 to-orange-500/10 dark:from-amber-400/20 dark:to-orange-500/20"
				></div>
				<div
					class="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border border-zinc-200/50 bg-white/80 shadow-lg backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80"
				>
					<div class="relative flex h-16 w-24 items-center justify-center">
						{#key timeLeft.minutes}
							<span
								in:fade={{ duration: 200 }}
								out:fade={{ duration: 100 }}
								class="absolute inset-0 flex items-center justify-center font-mono text-4xl font-bold text-zinc-900 md:text-5xl dark:text-zinc-100"
								style="font-variant-numeric: tabular-nums; font-feature-settings: 'tnum';"
							>
								{timeLeft.minutes.toString().padStart(2, '0')}
							</span>
						{/key}
					</div>
				</div>
			</div>
			<span class="text-sm font-medium tracking-wide text-zinc-600 uppercase dark:text-zinc-400">
				{$_('countdown.minutes')}
			</span>
		</div>

		<!-- Seconds -->
		<div class="flex flex-col items-center space-y-4">
			<div class="relative h-32 w-full max-w-32">
				<div
					class="absolute inset-0 rounded-2xl bg-gradient-to-br from-rose-400/10 to-pink-500/10 dark:from-rose-400/20 dark:to-pink-500/20"
				></div>
				<div
					class="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border border-zinc-200/50 bg-white/80 shadow-lg backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80"
				>
					<div class="relative flex h-16 w-24 items-center justify-center">
						{#key timeLeft.seconds}
							<span
								in:fade={{ duration: 200 }}
								out:fade={{ duration: 100 }}
								class="absolute inset-0 flex items-center justify-center font-mono text-4xl font-bold text-zinc-900 md:text-5xl dark:text-zinc-100"
								style="font-variant-numeric: tabular-nums; font-feature-settings: 'tnum';"
							>
								{timeLeft.seconds.toString().padStart(2, '0')}
							</span>
						{/key}
					</div>
				</div>
			</div>
			<span class="text-sm font-medium tracking-wide text-zinc-600 uppercase dark:text-zinc-400">
				{$_('countdown.seconds')}
			</span>
		</div>
	</div>

	<!-- Quick actions for mobile -->
	<div class="flex justify-center gap-3 sm:hidden">
		<a
			href="/nye-live"
			class="flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 px-5 py-3 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:shadow-xl active:scale-95"
		>
			<div class="h-2 w-2 animate-pulse rounded-full bg-white"></div>
			Watch Live
		</a>
		<a
			href="/map"
			class="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-700 shadow-lg transition-all duration-200 hover:shadow-xl active:scale-95 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
		>
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
				/>
			</svg>
			World Map
		</a>
	</div>
</div>
