<script lang="ts">
	import { page } from '$app/stores';
	import { Clock, Map, Radio, Calendar } from '@lucide/svelte';
	import { _ } from 'svelte-i18n';

	$: currentPath = $page.url.pathname;

	const navItems = [
		{
			href: '/',
			icon: Clock,
			label: 'countdown.live',
			active: currentPath === '/'
		},
		{
			href: '/map',
			icon: Map,
			label: 'nav.map',
			active: currentPath === '/map'
		},
		{
			href: '/nye-live',
			icon: Radio,
			label: 'nav.live',
			active: currentPath === '/nye-live'
		},
		{
			href: '/roadto2026',
			icon: Calendar,
			label: 'nav.road_to_2026',
			active: currentPath === '/roadto2026'
		}
	];
</script>

<!-- Mobile Bottom Navigation -->
<nav class="fixed bottom-0 left-0 right-0 z-40 border-t border-zinc-200/50 bg-white/80 backdrop-blur-xl dark:border-zinc-800/50 dark:bg-zinc-900/80 sm:hidden">
	<div class="grid grid-cols-4 h-16 pb-safe-bottom">
		{#each navItems as item}
			<a
				href={item.href}
				class="flex flex-col items-center justify-center gap-1 px-2 py-2 transition-all duration-200 {item.active
					? 'text-sky-600 dark:text-sky-400'
					: 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'}"
			>
				<div class="relative">
					{#if item.active}
						<div class="absolute -inset-2 rounded-full bg-sky-100 dark:bg-sky-950/50 animate-pulse"></div>
					{/if}
					<svelte:component this={item.icon} class="relative h-5 w-5" />
				</div>
				<span class="text-xs font-medium truncate max-w-full">
					{$_(item.label) || item.label}
				</span>
			</a>
		{/each}
	</div>
</nav>

<!-- Spacer to prevent content overlap on mobile -->
<div class="h-16 sm:hidden"></div>