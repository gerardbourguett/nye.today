<script lang="ts">
	import ModeToggle from './ModeToggle.svelte';
	import { CURRENT_YEAR } from '../data/constants';
</script>

<header
	class="sticky top-0 z-50 w-full border-b border-sky-900/40 bg-black/70 shadow-lg backdrop-blur-lg"
>
	<div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-8">
		<a
			href="/"
			class="flex items-center gap-2 bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent drop-shadow-lg transition-transform hover:scale-105"
			aria-label="NYE.today"
		>
			<svg
				class="h-7 w-7 animate-pulse text-sky-400"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				viewBox="0 0 24 24"
			>
				<circle cx="12" cy="12" r="10" stroke="currentColor"></circle>
				<path d="M12 6v6l4 2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
				></path>
			</svg>
			NYE.today
		</a>
		<nav
			class="flex items-center gap-2 rounded-full border border-sky-900/20 bg-black/30 px-2 py-1 shadow-inner sm:gap-4"
		>
			<a
				href="/roadto2026"
				class="relative rounded-full px-3 py-1 text-base font-medium text-sky-100 transition-all duration-200 hover:bg-gradient-to-r hover:from-sky-500/80 hover:to-cyan-500/80 hover:text-white focus:ring-2 focus:ring-sky-400 focus:outline-none"
			>
				Road to {CURRENT_YEAR + 1}
			</a>
			<a
				href="/map"
				class="relative rounded-full px-3 py-1 text-base font-medium text-sky-100 transition-all duration-200 hover:bg-gradient-to-r hover:from-sky-500/80 hover:to-cyan-500/80 hover:text-white focus:ring-2 focus:ring-sky-400 focus:outline-none"
			>
				Map
			</a>
			<a
				href="/nye-live"
				class="relative rounded-full px-3 py-1 text-base font-medium text-sky-100 transition-all duration-200 hover:bg-gradient-to-r hover:from-sky-500/80 hover:to-cyan-500/80 hover:text-white focus:ring-2 focus:ring-sky-400 focus:outline-none"
			>
				NYE.live
			</a>
			<a
				href="/stream"
				class="relative rounded-full px-3 py-1 text-base font-medium text-sky-100 transition-all duration-200 hover:bg-gradient-to-r hover:from-sky-500/80 hover:to-cyan-500/80 hover:text-white focus:ring-2 focus:ring-sky-400 focus:outline-none"
			>
				Stream
			</a>
			<span
				class="mx-2 hidden h-6 w-px bg-gradient-to-b from-sky-400/60 to-cyan-400/10 sm:inline-block"
				aria-hidden="true"
			></span>
			<div class="ml-1">
				<ModeToggle />
			</div>
		</nav>
	</div>
</header>
