<script lang="ts">
	import { CURRENT_YEAR } from '../data/constants';
	import { Github, Coffee, Twitch, Twitter } from '@lucide/svelte';
</script>

<footer
	class="mt-8 w-full border-t border-zinc-200/50 px-4 pt-6 pb-4 transition-colors duration-300 dark:border-zinc-800/50"
>
	<div class="mb-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8">
		<a
			class="group flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-600 transition-all duration-200 hover:bg-zinc-100 hover:text-sky-500 dark:text-zinc-300 dark:hover:bg-zinc-800/50 dark:hover:text-sky-400"
			href="https://github.com/gerardbourguett"
			target="_blank"
			rel="noopener noreferrer"
		>
			<Github
				size={20}
				class="transition-transform duration-200 group-hover:scale-110 sm:size-22"
			/>
			<span class="hidden text-sm font-medium sm:inline">Repository</span>
		</a>
		<a
			class="group flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-600 transition-all duration-200 hover:bg-zinc-100 hover:text-amber-500 dark:text-zinc-300 dark:hover:bg-zinc-800/50 dark:hover:text-amber-400"
			href="https://ko-fi.com/vanderfondi"
			target="_blank"
			rel="noopener noreferrer"
		>
			<Coffee
				size={20}
				class="transition-transform duration-200 group-hover:scale-110 sm:size-22"
			/>
			<span class="hidden text-sm font-medium sm:inline">Give me a coffee</span>
		</a>
		<a
			class="group flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-600 transition-all duration-200 hover:bg-zinc-100 hover:text-purple-500 dark:text-zinc-300 dark:hover:bg-zinc-800/50 dark:hover:text-purple-400"
			href="https://www.twitch.tv/vanderfondi"
			target="_blank"
			rel="noopener noreferrer"
		>
			<Twitch
				size={20}
				class="transition-transform duration-200 group-hover:scale-110 sm:size-22"
			/>
			<span class="hidden text-sm font-medium sm:inline">Twitch</span>
		</a>
		<a
			class="group flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-600 transition-all duration-200 hover:bg-zinc-100 hover:text-sky-400 dark:text-zinc-300 dark:hover:bg-zinc-800/50 dark:hover:text-sky-300"
			href="https://www.twitter.com/vanderfondi"
			target="_blank"
			rel="noopener noreferrer"
		>
			<Twitter
				size={20}
				class="transition-transform duration-200 group-hover:scale-110 sm:size-22"
			/>
			<span class="hidden text-sm font-medium sm:inline">Twitter</span>
		</a>
	</div>
	<div
		class="flex items-center justify-center text-center text-xs text-zinc-500 sm:text-sm dark:text-zinc-400"
	>
		<p class="px-4">
			© {CURRENT_YEAR} VanderFondi. Licensed under
			<a
				href="https://creativecommons.org/licenses/by/4.0/"
				target="_blank"
				rel="noopener noreferrer"
				class="mx-1 transition-colors duration-200 hover:text-sky-500 hover:underline dark:hover:text-sky-400"
				>Creative Commons BY 4.0</a
			>.
		</p>
	</div>
</footer>
