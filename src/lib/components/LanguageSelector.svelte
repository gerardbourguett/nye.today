<script lang="ts">
	import { locale } from 'svelte-i18n';
	import { setLocale, availableLocales } from '$lib/i18n';
		import { ChevronDown } from '@lucide/svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	let isOpen = false;

	function changeLocale(newLocale: string) {
		setLocale(newLocale);
		$locale = newLocale;
		isOpen = false;
		dispatch('localeChanged', { locale: newLocale });
	}

	function toggleDropdown() {
		isOpen = !isOpen;
	}

	function closeDropdown() {
		isOpen = false;
	}

	// Función para obtener la URL de la bandera
	function getFlagUrl(countryCode: string): string {
		return `https://hatscripts.github.io/circle-flags/flags/${countryCode.toLowerCase()}.svg`;
	}

	// Obtener el idioma actual
	$: currentLang = availableLocales.find((lang) => lang.code === $locale) || availableLocales[0];
</script>

<svelte:window on:click={closeDropdown} />

<div class="relative inline-block text-left">
	<!-- Botón principal -->
	<button
		on:click|stopPropagation={toggleDropdown}
		class="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-200/50 bg-white/80 p-2 text-sm font-medium text-zinc-700 shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-zinc-300/60 hover:bg-zinc-50 focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20 focus:outline-none dark:border-zinc-700/50 dark:bg-zinc-800/80 dark:text-zinc-200 dark:hover:border-zinc-600/60 dark:hover:bg-zinc-700/80 dark:focus:ring-sky-400/20"
		aria-expanded={isOpen}
		aria-haspopup="true"
		title={currentLang.name}
	>
		<img
			src={getFlagUrl(currentLang.flag)}
			alt="Flag of {currentLang.name}"
			width="20"
			height="20"
			class="rounded-full shadow-sm"
			loading="lazy"
		/>
		<ChevronDown class="h-3 w-3 transition-transform duration-200 {isOpen ? 'rotate-180' : ''}" />
	</button>

	<!-- Dropdown menu -->
	{#if isOpen}
		<div
			class="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-lg border border-zinc-200/50 bg-white/95 shadow-lg ring-1 ring-black/5 backdrop-blur-sm focus:outline-none dark:border-zinc-700/50 dark:bg-zinc-800/95 dark:ring-white/5"
			role="menu"
			aria-orientation="vertical"
		>
			<div class="py-1" role="none">
				{#each availableLocales as lang}
					<button
						on:click|stopPropagation={() => changeLocale(lang.code)}
						class="group flex w-full items-center gap-3 px-4 py-2 text-sm transition-colors duration-150 {$locale ===
						lang.code
							? 'bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300'
							: 'text-zinc-700 hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-700/50'}"
						role="menuitem"
					>
						<img
							src={getFlagUrl(lang.flag)}
							alt="Flag of {lang.name}"
							width="20"
							height="20"
							class="rounded-full shadow-sm"
							loading="lazy"
						/>
						<div class="flex flex-col items-start">
							<span class="font-medium">{lang.name}</span>
							<span class="text-xs text-zinc-500 dark:text-zinc-400">{lang.code.toUpperCase()}</span
							>
						</div>
						{#if $locale === lang.code}
							<div class="ml-auto h-2 w-2 rounded-full bg-sky-500"></div>
						{/if}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>
