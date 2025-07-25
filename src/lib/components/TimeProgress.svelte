<script lang="ts">
	import { CURRENT_YEAR } from '../data/constants';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	// @ts-ignore
	import SocialIcons from '@rodneylab/svelte-social-icons';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	const progress = tweened(0, {
		duration: 3000,
		easing: cubicOut
	});

	onMount(() => {
		const startOfYear = new Date(`${CURRENT_YEAR}-01-01T00:00:00`);
		const endOfYear = new Date(`${CURRENT_YEAR + 1}-01-01T00:00:00`);
		const totalYearTime = endOfYear.getTime() - startOfYear.getTime();

		const updateProgress = () => {
			const now = new Date();
			const elapsedTime = now.getTime() - startOfYear.getTime();
			const percent = (elapsedTime / totalYearTime) * 100;
			progress.set(percent);
		};

		updateProgress();
		const interval = setInterval(updateProgress, 1000);

		return () => clearInterval(interval);
	});

	const url = 'https://nye.today';
	$: title = $_('progress.time_progress', {
		currentYear: CURRENT_YEAR,
		progress: $progress.toFixed(6)
	});
	const encodedUrl = encodeURIComponent(url);
	$: encodedTitle = encodeURIComponent(title);
</script>

<div class="mx-auto w-full max-w-sm space-y-4 px-4 sm:max-w-md sm:space-y-6">
	<!-- Progress Bar Container -->
	<div class="relative">
		<!-- Background Track -->
		<div
			class="h-2 rounded-full border border-gray-700/30 bg-gradient-to-r from-gray-900/50 to-gray-800/50 shadow-inner backdrop-blur-sm sm:h-3"
		>
			<!-- Progress Fill -->
			<div
				class="relative h-full overflow-hidden rounded-full bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 shadow-lg transition-all duration-1000 ease-out"
				style="width: {$progress}%"
			>
				<!-- Animated Shine Effect -->
				<div
					class="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/20 to-transparent"
				></div>
				<!-- Glow Effect -->
				<div
					class="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/50 via-cyan-400/50 to-teal-400/50 blur-sm"
				></div>
			</div>
		</div>

		<!-- Progress Indicator Dot -->
		<div
			class="absolute top-1/2 h-3 w-3 -translate-y-1/2 transform rounded-full border-2 border-white/20 bg-gradient-to-br from-cyan-700 to-blue-500 shadow-lg transition-all duration-1000 ease-out sm:h-4 sm:w-4 dark:from-cyan-300 dark:to-blue-500"
			style="left: calc({$progress}% - 6px)"
		>
			<div
				class="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-cyan-200 to-blue-400 opacity-60"
			></div>
		</div>
	</div>

	<!-- Progress Text -->
	<div class="space-y-2 text-center sm:space-y-3">
		<!-- Year Transition Display -->
		<div class="flex items-center justify-center gap-1">
			<span class="text-2xl font-light text-gray-500 sm:text-3xl dark:text-gray-300"
				>{CURRENT_YEAR}</span
			>
			<span class="text-xl font-light text-gray-500 sm:text-2xl dark:text-gray-500">→</span>
			<span class="text-2xl font-light text-cyan-400 sm:text-3xl dark:text-cyan-400"
				>{CURRENT_YEAR + 1}</span
			>
		</div>

		<!-- Progress Label -->
		<div
			class="text-xs font-medium tracking-wider text-gray-500 uppercase sm:text-sm dark:text-gray-400"
		>
			{$_('progress.progress')}
			<span class="text-xs font-medium tracking-wide text-gray-500 uppercase"
				>{$_('progress.complete')}</span
			>
		</div>

		<!-- Progress Percentage -->
		<div class="space-y-1">
			<div class="text-lg font-extralight text-gray-700 tabular-nums sm:text-xl dark:text-gray-300">
				{$progress.toFixed(6)}%
			</div>
			<div class="flex justify-center gap-2 pt-3 sm:gap-3 sm:pt-4">
				<a
					href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&hashtags=nye,countdown,live`}
					target="_blank"
					rel="noopener noreferrer"
					class="social-icon"
					aria-label="Share on Twitter"
				>
					<SocialIcons network="twitter" fgColor="#eeeeee" bgColor="#111111" />
				</a>
				<a
					href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`}
					target="_blank"
					rel="noopener noreferrer"
					class="social-icon"
					aria-label="Share on Telegram"
				>
					<SocialIcons network="telegram" fgColor="#eeeeee" bgColor="#111111" />
				</a>
				<a
					href={`https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`}
					target="_blank"
					rel="noopener noreferrer"
					class="social-icon"
					aria-label="Share on Reddit"
				>
					<SocialIcons network="reddit" fgColor="#eeeeee" bgColor="#111111" />
				</a>
				<a
					href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
					target="_blank"
					rel="noopener noreferrer"
					class="social-icon"
					aria-label="Share on WhatsApp"
				>
					<SocialIcons network="whatsapp" fgColor="#eeeeee" bgColor="#111111" />
				</a>
				<a
					href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
					target="_blank"
					rel="noopener noreferrer"
					class="social-icon"
					aria-label="Share on Facebook"
				>
					<SocialIcons network="facebook" fgColor="#eeeeee" bgColor="#111111" />
				</a>
			</div>
		</div>
	</div>
</div>

<style>
	.social-icon {
		display: inline-block;
		transition: transform 0.2s ease-in-out;
	}
	.social-icon:hover {
		transform: scale(1.15);
	}

	@media (max-width: 640px) {
		.social-icon {
			transform: scale(0.9);
		}
		.social-icon:hover {
			transform: scale(1.05);
		}
	}
</style>
