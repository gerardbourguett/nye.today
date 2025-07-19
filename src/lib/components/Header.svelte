<script lang="ts">
	import ModeToggle from './ModeToggle.svelte';
	import { CURRENT_YEAR } from '../data/constants';
	import { Menu, X } from '@lucide/svelte/icons';
	import { Button } from '$lib/components/ui/button/index.js';

	let isMenuOpen = false;

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
	}
</script>

<!-- This special Svelte tag adds a class to the <body> when the menu is open -->
<!-- The 'overflow-hidden' class from Tailwind will prevent background scrolling -->
<svelte:body class:overflow-hidden={isMenuOpen} />

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

		<!-- Desktop Navigation -->
		<nav
			class="hidden items-center gap-2 rounded-full border border-sky-900/20 bg-black/30 px-2 py-1 shadow-inner sm:gap-4 md:flex"
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

		<!-- Mobile Navigation Toggle Button -->
		<div class="flex items-center gap-2 md:hidden">
			<ModeToggle />
			<Button
				onclick={toggleMenu}
				variant="outline"
				size="icon"
				class="border-sky-900/20 text-sky-100 hover:bg-sky-500/20"
			>
				{#if isMenuOpen}
					<X class="h-5 w-5" />
				{:else}
					<Menu class="h-5 w-5" />
				{/if}
				<span class="sr-only">Toggle menu</span>
			</Button>
		</div>
	</div>
</header>

<!-- Mobile Menu logic is now OUTSIDE the header tag -->

<!-- Mobile Menu Overlay -->
{#if isMenuOpen}
	<div
		class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
		on:click={closeMenu}
		on:keydown
	></div>
{/if}

<!-- Mobile Menu Panel -->
<div
	class="fixed top-0 right-0 z-50 h-full w-64 border-l border-sky-900/40 bg-black/95 shadow-2xl backdrop-blur-lg transition-transform duration-300 ease-in-out md:hidden"
	style="transform: translateX({isMenuOpen ? '0' : '100%'});"
	aria-hidden={!isMenuOpen}
>
	<div class="flex h-full flex-col bg-gradient-to-b from-black/98 to-black/95">
		<!-- Header -->
		<div class="flex items-center justify-between border-b border-sky-900/20 bg-black/80 p-4">
			<span class="text-lg font-semibold text-sky-100">Menu</span>
			<Button
				onclick={closeMenu}
				variant="outline"
				size="icon"
				class="border-sky-900/20 text-sky-100 hover:bg-sky-500/20"
			>
				<X class="h-5 w-5" />
				<span class="sr-only">Close menu</span>
			</Button>
		</div>

		<!-- Navigation Links -->
		<nav class="flex-1 bg-black/90 p-4">
			<div class="space-y-2">
				<a
					href="/roadto2026"
					on:click={closeMenu}
					class="flex items-center rounded-lg px-4 py-3 text-base font-medium text-sky-100 transition-all duration-200 hover:bg-gradient-to-r hover:from-sky-500/20 hover:to-cyan-500/20 hover:text-white focus:ring-2 focus:ring-sky-400 focus:outline-none"
				>
					Road to {CURRENT_YEAR + 1}
				</a>
				<a
					href="/map"
					on:click={closeMenu}
					class="flex items-center rounded-lg px-4 py-3 text-base font-medium text-sky-100 transition-all duration-200 hover:bg-gradient-to-r hover:from-sky-500/20 hover:to-cyan-500/20 hover:text-white focus:ring-2 focus:ring-sky-400 focus:outline-none"
				>
					Map
				</a>
				<a
					href="/nye-live"
					on:click={closeMenu}
					class="flex items-center rounded-lg px-4 py-3 text-base font-medium text-sky-100 transition-all duration-200 hover:bg-gradient-to-r hover:from-sky-500/20 hover:to-cyan-500/20 hover:text-white focus:ring-2 focus:ring-sky-400 focus:outline-none"
				>
					NYE.live
				</a>
				<a
					href="/stream"
					on:click={closeMenu}
					class="flex items-center rounded-lg px-4 py-3 text-base font-medium text-sky-100 transition-all duration-200 hover:bg-gradient-to-r hover:from-sky-500/20 hover:to-cyan-500/20 hover:text-white focus:ring-2 focus:ring-sky-400 focus:outline-none"
				>
					Stream
				</a>
			</div>
		</nav>
	</div>
</div>
