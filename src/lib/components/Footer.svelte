<script lang="ts">
	import { CURRENT_YEAR } from '../data/constants';
	import { Github, Coffee, Twitch, Twitter, Heart } from '@lucide/svelte';
	import { _ } from 'svelte-i18n';
</script>

<footer
	class="pb-safe-bottom mt-20 w-full bg-gradient-to-t from-zinc-50/50 to-transparent px-4 dark:from-zinc-950/50"
>
	<div class="mx-auto max-w-6xl">
		<!-- Copyright section -->
		<div class="pt-12 text-center">
			<div class="mb-6 flex items-center justify-center gap-3">
				<Heart size={20} class="animate-pulse text-red-500" />
				<span
					class="bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 bg-clip-text text-lg font-semibold tracking-tight text-transparent dark:from-zinc-100 dark:via-zinc-300 dark:to-zinc-100"
				>
					NYE.today
				</span>
				<Heart size={20} class="animate-pulse text-red-500" />
			</div>

			<p class="mb-4 text-base font-medium tracking-wide text-zinc-700 dark:text-zinc-300">
				© 2024 - {CURRENT_YEAR}
			</p>

			<div class="mx-auto max-w-md space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
				<div class="flex flex-wrap items-center justify-center gap-2">
					<span>{$_('footer.licensed_under') || 'Licensed under'}</span>
					<a
						href="https://creativecommons.org/licenses/by/4.0/"
						target="_blank"
						rel="noopener noreferrer"
						class="font-semibold text-sky-600 underline-offset-2 transition-all duration-200 hover:text-sky-700 hover:underline dark:text-sky-400 dark:hover:text-sky-300"
						>CC BY 4.0</a
					>
				</div>
				<div class="text-zinc-500 dark:text-zinc-500">
					{$_('footer.built_with') || 'Built with SvelteKit & TailwindCSS'}
				</div>
			</div>
		</div>

		<!-- Social links section -->
		<div class="border-t border-zinc-200/30 pt-10 pb-4 dark:border-zinc-800/30">
			<div class="flex flex-wrap items-center justify-center gap-6 text-sm">
				<a
					href="https://github.com/gerardbourguett"
					target="_blank"
					rel="noopener noreferrer"
					class="group flex items-center gap-2 text-zinc-600 transition-colors duration-300 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
				>
					<Github class="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
					<span>{$_('footer.repository') || 'GitHub'}</span>
				</a>

				<a
					href="https://ko-fi.com/vanderfondi"
					target="_blank"
					rel="noopener noreferrer"
					class="group flex items-center gap-2 text-orange-600 transition-colors duration-300 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300"
				>
					<Coffee class="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
					<span>{$_('footer.give_me_coffee') || 'Coffee'}</span>
				</a>

				<a
					href="https://www.twitch.tv/vanderfondi"
					target="_blank"
					rel="noopener noreferrer"
					class="group flex items-center gap-2 text-purple-600 transition-colors duration-300 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
				>
					<Twitch class="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
					<span>{$_('footer.twitch') || 'Live'}</span>
				</a>

				<a
					href="https://www.twitter.com/vanderfondi"
					target="_blank"
					rel="noopener noreferrer"
					class="group flex items-center gap-2 text-sky-600 transition-colors duration-300 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
				>
					<Twitter class="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
					<span>{$_('footer.twitter') || 'Twitter'}</span>
				</a>
			</div>
		</div>
	</div>
</footer>
