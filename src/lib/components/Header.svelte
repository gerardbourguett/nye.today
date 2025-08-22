<script lang="ts">
	import ModeToggle from './ModeToggle.svelte';
	import { CURRENT_YEAR } from '../data/constants';
	import { Menu, X } from '@lucide/svelte/icons';
	import { Button } from '$lib/components/ui/button/index.js';
	import { _ } from 'svelte-i18n';
	import LanguageSelector from './LanguageSelector.svelte';
	import NotificationButton from './NotificationButton.svelte';

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
	class="sticky top-0 z-50 w-full border-b border-zinc-200/50 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 dark:border-zinc-800/50 dark:bg-black/80 dark:supports-[backdrop-filter]:bg-black/60"
>
	<!-- Status bar height spacer for iOS PWA -->
	<div class="h-safe-top bg-white/80 dark:bg-black/80"></div>

	<div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
		<a
			href="/"
			class="flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
			aria-label="NYE.today"
		>
			<div class="relative">
				<div
					class="absolute inset-0 rounded-full bg-gradient-to-br from-sky-400 to-cyan-500 opacity-20 blur-sm"
				></div>
				<svg
					class="relative h-8 w-8 text-sky-500 dark:text-sky-400"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
					viewBox="0 0 24 24"
				>
					<circle cx="12" cy="12" r="10" stroke="currentColor"></circle>
					<path d="M12 6v6l4 2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
					></path>
				</svg>
			</div>
			<span
				class="bg-gradient-to-r from-zinc-900 to-zinc-700 bg-clip-text text-xl font-bold text-transparent dark:from-zinc-100 dark:to-zinc-300"
			>
				NYE.today
			</span>
		</a>

		<!-- Desktop Navigation -->
		<nav class="hidden items-center gap-1 md:flex">
			<a
				href="/roadto2026"
				class="relative rounded-xl px-4 py-2 text-sm font-medium text-zinc-700 transition-all duration-200 hover:bg-zinc-100 hover:text-zinc-900 active:scale-95 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
			>
				{$_('nav.road_to_2026')}
			</a>
			<a
				href="/map"
				class="relative rounded-xl px-4 py-2 text-sm font-medium text-zinc-700 transition-all duration-200 hover:bg-zinc-100 hover:text-zinc-900 active:scale-95 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
			>
				{$_('nav.map')}
			</a>
			<a
				href="/nye-live"
				class="relative rounded-xl px-4 py-2 text-sm font-medium text-zinc-700 transition-all duration-200 hover:bg-zinc-100 hover:text-zinc-900 active:scale-95 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
			>
				{$_('nav.live')}
			</a>
			<a
				href="/stream"
				class="relative rounded-xl px-4 py-2 text-sm font-medium text-zinc-700 transition-all duration-200 hover:bg-zinc-100 hover:text-zinc-900 active:scale-95 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
			>
				{$_('nav.stream')}
			</a>
			<div class="mx-2 h-6 w-px bg-zinc-200 dark:bg-zinc-700"></div>
			<div class="flex items-center gap-1">
				<NotificationButton />
				<!-- Menu button for desktop settings -->
				<button
					on:click={toggleMenu}
					class="pwa-hidden flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 transition-all duration-200 hover:bg-zinc-200 active:scale-95 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
					aria-label="Settings menu"
				>
					{#if isMenuOpen}
						<X class="h-4 w-4" />
					{:else}
						<Menu class="h-4 w-4" />
					{/if}
				</button>
			</div>
		</nav>

		<!-- Mobile Controls -->
		<div class="flex items-center gap-2 md:hidden">
			<NotificationButton />
			<!-- Hide hamburger menu in PWA standalone mode -->
			<button
				on:click={toggleMenu}
				class="pwa-hidden flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-all duration-200 hover:bg-zinc-200 active:scale-95 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
				aria-label="Toggle menu"
			>
				{#if isMenuOpen}
					<X class="h-5 w-5" />
				{:else}
					<Menu class="h-5 w-5" />
				{/if}
			</button>
		</div>
	</div>
</header>

<!-- Mobile Menu logic is now OUTSIDE the header tag -->

<!-- Mobile Menu Overlay -->
{#if isMenuOpen}
	<div
		class="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
		on:click={closeMenu}
		on:keydown
		role="button"
		tabindex="0"
	></div>
{/if}

<!-- Mobile Menu Panel - iOS style slide up -->
<div
	class="fixed right-0 bottom-0 left-0 z-50 max-h-[80vh] rounded-t-3xl border-t border-zinc-200/50 bg-white/95 shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-out dark:border-zinc-800/50 dark:bg-zinc-900/95"
	style="transform: translateY({isMenuOpen ? '0' : '100%'});"
	aria-hidden={!isMenuOpen}
>
	<!-- Handle bar for dragging -->
	<div class="flex justify-center py-3">
		<div class="h-1.5 w-12 rounded-full bg-zinc-300 dark:bg-zinc-600"></div>
	</div>

	<!-- Navigation Links -->
	<nav class="pb-safe-bottom px-6">
		<div class="space-y-1 pb-6">
			<!-- Navigation Links (visible on mobile) -->
			<div class="space-y-1 md:hidden">
				<a
					href="/roadto2026"
					on:click={closeMenu}
					class="flex items-center rounded-2xl px-4 py-4 text-base font-medium text-zinc-800 transition-all duration-200 hover:bg-zinc-100 active:scale-95 dark:text-zinc-200 dark:hover:bg-zinc-800"
				>
					<div
						class="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-cyan-500 text-sm font-bold text-white"
					>
						2026
					</div>
					{$_('nav.road_to_2026')}
				</a>
				<a
					href="/map"
					on:click={closeMenu}
					class="flex items-center rounded-2xl px-4 py-4 text-base font-medium text-zinc-800 transition-all duration-200 hover:bg-zinc-100 active:scale-95 dark:text-zinc-200 dark:hover:bg-zinc-800"
				>
					<div
						class="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white"
					>
						<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
							/>
						</svg>
					</div>
					{$_('nav.map')}
				</a>
				<a
					href="/nye-live"
					on:click={closeMenu}
					class="flex items-center rounded-2xl px-4 py-4 text-base font-medium text-zinc-800 transition-all duration-200 hover:bg-zinc-100 active:scale-95 dark:text-zinc-200 dark:hover:bg-zinc-800"
				>
					<div
						class="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-red-400 to-pink-500 text-white"
					>
						<div class="h-2 w-2 animate-pulse rounded-full bg-white"></div>
					</div>
					{$_('nav.live')}
				</a>
				<a
					href="/stream"
					on:click={closeMenu}
					class="flex items-center rounded-2xl px-4 py-4 text-base font-medium text-zinc-800 transition-all duration-200 hover:bg-zinc-100 active:scale-95 dark:text-zinc-200 dark:hover:bg-zinc-800"
				>
					<div
						class="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 text-white"
					>
						<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15"
							/>
						</svg>
					</div>
					{$_('nav.stream')}
				</a>
			</div>

			<!-- Settings Section -->
			<div class="mt-4 border-t border-zinc-200 pt-4 dark:border-zinc-700">
				<h3
					class="mb-3 px-4 text-sm font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400"
				>
					Configuraci&oacute;n
				</h3>
				<div class="space-y-1">
					<!-- Theme Toggle -->
					<div
						class="flex items-center justify-between rounded-2xl px-4 py-4 text-base font-medium text-zinc-800 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
					>
						<div class="flex items-center">
							<div
								class="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white"
							>
								<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<circle cx="12" cy="12" r="4"></circle>
									<path d="M12 2v2"></path>
									<path d="M12 20v2"></path>
									<path d="m4.93 4.93 1.41 1.41"></path>
									<path d="m17.66 17.66 1.41 1.41"></path>
									<path d="M2 12h2"></path>
									<path d="M20 12h2"></path>
									<path d="m6.34 17.66-1.41 1.41"></path>
									<path d="m19.07 4.93-1.41 1.41"></path>
								</svg>
							</div>
							Tema
						</div>
						<div class="pwa-hidden">
							<ModeToggle />
						</div>
					</div>

					<!-- Language Selector -->
					<div
						class="flex items-center justify-between rounded-2xl px-4 py-4 text-base font-medium text-zinc-800 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
					>
						<div class="flex items-center">
							<div
								class="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 text-white"
							>
								<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
									/>
								</svg>
							</div>
							Idioma
						</div>
						<div class="pwa-hidden">
							<LanguageSelector />
						</div>
					</div>
				</div>
			</div>
		</div>
	</nav>
</div>
