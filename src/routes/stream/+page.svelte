<script lang="ts">
	import { CURRENT_YEAR } from '../../lib/data/constants';
	import { onMount, onDestroy } from 'svelte';

	// Target date: December 31, 2025 at 10:00 UTC (countdown to 2026)
	const targetDate = new Date('2025-12-31T10:00:00Z');

	let timeLeft = {
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0
	};

	let showStream = false;
	let interval: NodeJS.Timeout;

	function updateCountdown() {
		const now = new Date().getTime();
		const distance = targetDate.getTime() - now;

		if (distance <= 0) {
			showStream = true;
			clearInterval(interval);
			return;
		}

		timeLeft = {
			days: Math.floor(distance / (1000 * 60 * 60 * 24)),
			hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
			minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
			seconds: Math.floor((distance % (1000 * 60)) / 1000)
		};
	}

	let streamNotes = [
		{
			title: 'Global Celebration',
			content: 'Join millions of people worldwide celebrating the New Year together in real-time'
		},
		{
			title: 'Live Countdown',
			content: 'Experience the excitement as we count down to the first moments of the new year'
		},
		{
			title: 'Interactive Chat',
			content: 'Connect with viewers from around the world and share your New Year wishes'
		},
		{
			title: 'Special Moments',
			content: 'Witness fireworks, celebrations, and cultural traditions from different time zones'
		}
	];

	let currentNoteIndex = 0;

	onMount(() => {
		updateCountdown();
		interval = setInterval(updateCountdown, 1000);

		// Auto-rotate notes
		const notesInterval = setInterval(() => {
			if (showStream) {
				currentNoteIndex = (currentNoteIndex + 1) % streamNotes.length;
			}
		}, 5000);

		return () => {
			clearInterval(interval);
			clearInterval(notesInterval);
		};
	});

	onDestroy(() => {
		if (interval) clearInterval(interval);
	});
</script>

<svelte:head>
	<title>#{CURRENT_YEAR + 1} Live | Stream</title>
	<meta name="description" content="Live stream of the world celebrating the New Year together" />
</svelte:head>

{#if !showStream}
	<!-- Countdown Section -->
	<div class="flex w-full flex-col items-center justify-center">
		<div class="space-y-8 text-center">
			<!-- Header -->
			<div class="space-y-4">
				<div class="flex items-center justify-center space-x-4">
					<div class="h-4 w-4 animate-pulse rounded-full bg-red-500"></div>
					<h1 class="text-3xl font-bold text-sky-400">COMING SOON</h1>
				</div>
				<h2 class="text-2xl font-semibold text-white">New Year 2026 Live Stream</h2>
				<p class="text-zinc-400">December 31, 2025 at 10:00 UTC</p>
			</div>

			<!-- Countdown Timer -->
			<div class="grid grid-cols-2 gap-6 sm:grid-cols-4">
				<div class="flex flex-col items-center space-y-2">
					<div
						class="flex h-20 w-20 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm"
					>
						<span class="text-2xl font-bold text-sky-400">{timeLeft.days}</span>
					</div>
					<span class="text-sm text-zinc-400">Days</span>
				</div>
				<div class="flex flex-col items-center space-y-2">
					<div
						class="flex h-20 w-20 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm"
					>
						<span class="text-2xl font-bold text-sky-400"
							>{timeLeft.hours.toString().padStart(2, '0')}</span
						>
					</div>
					<span class="text-sm text-zinc-400">Hours</span>
				</div>
				<div class="flex flex-col items-center space-y-2">
					<div
						class="flex h-20 w-20 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm"
					>
						<span class="text-2xl font-bold text-sky-400"
							>{timeLeft.minutes.toString().padStart(2, '0')}</span
						>
					</div>
					<span class="text-sm text-zinc-400">Minutes</span>
				</div>
				<div class="flex flex-col items-center space-y-2">
					<div
						class="flex h-20 w-20 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm"
					>
						<span class="text-2xl font-bold text-sky-400"
							>{timeLeft.seconds.toString().padStart(2, '0')}</span
						>
					</div>
					<span class="text-sm text-zinc-400">Seconds</span>
				</div>
			</div>

			<!-- Info -->
			<div class="mx-auto max-w-md space-y-4">
				<div class="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm">
					<h3 class="mb-3 text-lg font-semibold text-sky-400">What to Expect</h3>
					<ul class="space-y-2 text-sm text-zinc-300">
						<li>• Global New Year celebrations from around the world</li>
						<li>• Live countdown to 2026 with millions of viewers</li>
						<li>• Interactive chat and real-time reactions</li>
						<li>• Special moments and cultural traditions</li>
					</ul>
				</div>
			</div>

			<!-- Current Time -->
			<div class="text-sm text-zinc-500">
				Current UTC: {new Date().toLocaleTimeString('en-US', { timeZone: 'UTC', hour12: false })}
			</div>
		</div>
	</div>
{:else}
	<!-- Stream Content -->
	<div class="flex h-screen w-full flex-col bg-gradient-to-br from-black via-zinc-900 to-black">
		<!-- Header Section -->
		<div class="flex items-center justify-between p-6 text-white">
			<div class="flex items-center space-x-4">
				<div class="h-3 w-3 animate-pulse rounded-full bg-red-500"></div>
				<h1 class="text-xl font-bold text-sky-400">LIVE STREAM</h1>
			</div>
			<div class="text-sm text-zinc-400">
				2026 New Year Celebration
			</div>
		</div>

		<!-- Main Content -->
		<div class="flex flex-1 flex-col gap-6 p-6 lg:flex-row">
			<!-- Stream Section -->
			<div class="flex flex-1 flex-col">
				<div
					class="relative aspect-video w-full overflow-hidden rounded-xl border border-sky-900/30 bg-black shadow-2xl"
				>
					<iframe
						src="https://player.twitch.tv/?channel=vanderfondi&parent=localhost&parent=nyetoday.com"
						allowfullscreen
						allow="autoplay; fullscreen"
						class="h-full w-full"
						frameborder="0"
						scrolling="no"
						title="Twitch Stream"
					></iframe>
					<!-- Live indicator overlay -->
					<div
						class="absolute top-4 left-4 flex items-center space-x-2 rounded-full bg-red-600/90 px-3 py-1 backdrop-blur-sm"
					>
						<div class="h-2 w-2 animate-pulse rounded-full bg-white"></div>
						<span class="text-xs font-semibold text-white">LIVE from Santiago, Chile</span>
					</div>
				</div>

				<!-- Stream Info -->
				<div class="mt-4 flex items-center justify-between text-white">
					<div>
						<h2 class="text-lg font-semibold text-sky-400">New Year Celebration Stream</h2>
						<p class="text-sm text-zinc-400">Join the global countdown to 2026</p>
					</div>
					<a
						href="https://www.twitch.tv/vanderfondi"
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center space-x-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium transition-colors hover:bg-sky-700"
					>
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"
							/>
						</svg>
						<span>Watch on Twitch</span>
					</a>
				</div>
			</div>

			<!-- Notes Section -->
			<div class="flex w-full flex-col space-y-4 lg:w-80">
				<div class="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm">
					<h3 class="mb-4 text-lg font-semibold text-sky-400">Stream Highlights</h3>
					<div class="space-y-4">
						{#each streamNotes as note, index}
							<div
								class="transition-all duration-500 {index === currentNoteIndex
									? 'scale-100 opacity-100'
									: 'scale-95 opacity-60'}"
							>
								<h4 class="mb-2 font-medium text-white">{note.title}</h4>
								<p class="text-sm leading-relaxed text-zinc-300">{note.content}</p>
							</div>
						{/each}
					</div>
				</div>

				<!-- Time Zones -->
				<div class="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm">
					<h3 class="mb-4 text-lg font-semibold text-sky-400">Global Times</h3>
					<div class="space-y-2 text-sm">
						<div class="flex justify-between">
							<span class="text-zinc-400">UTC</span>
							<span class="text-white"
								>{new Date().toLocaleTimeString('en-US', { timeZone: 'UTC', hour12: false })}</span
							>
						</div>
						<div class="flex justify-between">
							<span class="text-zinc-400">SCL</span>
							<span class="text-white"
								>{new Date().toLocaleTimeString('es-CL', {
									timeZone: 'America/Santiago',
									hour12: false
								})}</span
							>
						</div>
						<div class="flex justify-between">
							<span class="text-zinc-400">PUQ</span>
							<span class="text-white"
								>{new Date().toLocaleTimeString('es-CL', {
									timeZone: 'America/Punta_Arenas',
									hour12: false
								})}</span
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
