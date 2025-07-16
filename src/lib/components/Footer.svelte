<script lang="ts">
	import { CURRENT_YEAR } from '../../data/constants';
	import { Github, Coffee, Twitch, Twitter } from '@lucide/svelte';
</script>

<footer
	class="mt-8 w-full border-t border-zinc-200 px-4 pt-6 pb-4 transition-colors duration-300 dark:border-zinc-800"
>
	<div class="mb-4 flex flex-wrap items-center justify-center gap-8">
		<a
			class="group flex items-center gap-2 text-zinc-600 transition-colors duration-200 hover:text-sky-500 dark:text-zinc-300 dark:hover:text-sky-400"
			href="https://github.com/gerardbourguett"
			target="_blank"
			rel="noopener noreferrer"
		>
			<Github size={22} class="transition-transform duration-200 group-hover:scale-110" />
			<span class="hidden sm:inline">Repository</span>
		</a>
		<a
			class="group flex items-center gap-2 text-zinc-600 transition-colors duration-200 hover:text-amber-500 dark:text-zinc-300 dark:hover:text-amber-400"
			href="https://ko-fi.com/vanderfondi"
			target="_blank"
			rel="noopener noreferrer"
		>
			<Coffee size={22} class="transition-transform duration-200 group-hover:scale-110" />
			<span class="hidden sm:inline">Give me a coffee</span>
		</a>
		<a
			class="group flex items-center gap-2 text-zinc-600 transition-colors duration-200 hover:text-purple-500 dark:text-zinc-300 dark:hover:text-purple-400"
			href="https://www.twitch.tv/vanderfondi"
			target="_blank"
			rel="noopener noreferrer"
		>
			<Twitch size={22} class="transition-transform duration-200 group-hover:scale-110" />
			<span class="hidden sm:inline">Twitch</span>
		</a>
		<a
			class="group flex items-center gap-2 text-zinc-600 transition-colors duration-200 hover:text-sky-400 dark:text-zinc-300 dark:hover:text-sky-300"
			href="https://www.twitter.com/vanderfondi"
			target="_blank"
			rel="noopener noreferrer"
		>
			<Twitter size={22} class="transition-transform duration-200 group-hover:scale-110" />
			<span class="hidden sm:inline">Twitter</span>
		</a>
	</div>
	<div
		class="flex items-center justify-center text-center text-xs text-zinc-500 sm:text-sm dark:text-zinc-400"
	>
		<p>
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
