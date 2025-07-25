<script lang="ts">
	import { CURRENT_YEAR } from '../data/constants';
	import { Github, Coffee, Twitch, Twitter, Heart, Globe, Star } from '@lucide/svelte';
	import { _ } from 'svelte-i18n';
</script>

<footer
	class="relative mt-12 w-full overflow-hidden border-t border-zinc-200/50 bg-gradient-to-b from-transparent to-zinc-50/50 px-4 pt-8 pb-6 transition-all duration-300 dark:border-zinc-800/50 dark:to-zinc-900/30"
>
	<!-- Decorative gradient line -->
	<div
		class="absolute top-0 left-1/2 h-px w-32 -translate-x-1/2 bg-gradient-to-r from-transparent via-sky-400/60 to-transparent"
	></div>

	<!-- Main content container -->
	<div class="mx-auto max-w-6xl">
		<!-- Social links section -->
		<div class="mb-8">
			<div class="mb-6 text-center">
				<h3 class="mb-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
					{$_('footer.connect_with_us') || 'Connect with us'}
				</h3>
				<div class="mx-auto h-px w-16 bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-zinc-600"></div>
			</div>
			<div class="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6">
				<a
					class="group relative flex items-center gap-2 rounded-xl border border-zinc-200/50 bg-white/50 px-4 py-3 text-zinc-600 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-sky-400/30 hover:bg-sky-50/50 hover:text-sky-600 hover:shadow-lg hover:shadow-sky-400/10 dark:border-zinc-800/50 dark:bg-zinc-900/50 dark:text-zinc-300 dark:hover:border-sky-400/30 dark:hover:bg-sky-900/20 dark:hover:text-sky-400"
					href="https://github.com/gerardbourguett"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Github
						size={20}
						class="transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
					/>
					<span class="hidden text-sm font-medium sm:inline">{$_('footer.repository') || 'Repository'}</span>
					<Star size={12} class="absolute -top-1 -right-1 text-yellow-400 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110" />
				</a>
				<a
					class="group relative flex items-center gap-2 rounded-xl border border-zinc-200/50 bg-white/50 px-4 py-3 text-zinc-600 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-amber-400/30 hover:bg-amber-50/50 hover:text-amber-600 hover:shadow-lg hover:shadow-amber-400/10 dark:border-zinc-800/50 dark:bg-zinc-900/50 dark:text-zinc-300 dark:hover:border-amber-400/30 dark:hover:bg-amber-900/20 dark:hover:text-amber-400"
					href="https://ko-fi.com/vanderfondi"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Coffee
						size={20}
						class="transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
					/>
					<span class="hidden text-sm font-medium sm:inline">{$_('footer.give_me_coffee') || 'Give me a coffee'}</span>
					<Heart size={12} class="absolute -top-1 -right-1 text-red-400 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110" />
				</a>
				<a
					class="group relative flex items-center gap-2 rounded-xl border border-zinc-200/50 bg-white/50 px-4 py-3 text-zinc-600 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-purple-400/30 hover:bg-purple-50/50 hover:text-purple-600 hover:shadow-lg hover:shadow-purple-400/10 dark:border-zinc-800/50 dark:bg-zinc-900/50 dark:text-zinc-300 dark:hover:border-purple-400/30 dark:hover:bg-purple-900/20 dark:hover:text-purple-400"
					href="https://www.twitch.tv/vanderfondi"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Twitch
						size={20}
						class="transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
					/>
					<span class="hidden text-sm font-medium sm:inline">{$_('footer.twitch') || 'Twitch'}</span>
					<div class="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:animate-pulse"></div>
				</a>
				<a
					class="group relative flex items-center gap-2 rounded-xl border border-zinc-200/50 bg-white/50 px-4 py-3 text-zinc-600 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-sky-400/30 hover:bg-sky-50/50 hover:text-sky-600 hover:shadow-lg hover:shadow-sky-400/10 dark:border-zinc-800/50 dark:bg-zinc-900/50 dark:text-zinc-300 dark:hover:border-sky-400/30 dark:hover:bg-sky-900/20 dark:hover:text-sky-400"
					href="https://www.twitter.com/vanderfondi"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Twitter
						size={20}
						class="transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
					/>
					<span class="hidden text-sm font-medium sm:inline">{$_('footer.twitter') || 'Twitter'}</span>
					<Globe size={12} class="absolute -top-1 -right-1 text-blue-400 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110" />
				</a>
			</div>
		</div>

		<!-- Divider -->
		<div class="mb-6 flex items-center justify-center">
			<div class="h-px flex-1 bg-gradient-to-r from-transparent via-zinc-200 to-transparent dark:via-zinc-700"></div>
			<div class="mx-4 flex items-center gap-1 text-zinc-400">
				<Heart size={12} class="text-red-400" />
				<span class="text-xs font-medium">NYE.today</span>
				<Heart size={12} class="text-red-400" />
			</div>
			<div class="h-px flex-1 bg-gradient-to-r from-transparent via-zinc-200 to-transparent dark:via-zinc-700"></div>
		</div>

		<!-- Copyright section -->
		<div class="text-center">
			<p class="mb-2 text-sm text-zinc-600 dark:text-zinc-400">
				© {CURRENT_YEAR + 1} VanderFondi. {$_('footer.made_with') || 'Made with'}
				<Heart size={14} class="mx-1 inline text-red-400" />
				{$_('footer.by') || 'by'} a passionate developer
			</p>
			<p class="text-xs text-zinc-500 dark:text-zinc-500">
				{$_('footer.licensed_under') || 'Licensed under'}
				<a
					href="https://creativecommons.org/licenses/by/4.0/"
					target="_blank"
					rel="noopener noreferrer"
					class="mx-1 font-medium text-sky-500 transition-colors duration-200 hover:text-sky-600 hover:underline dark:text-sky-400 dark:hover:text-sky-300"
					>Creative Commons BY 4.0</a
				>
				• {$_('footer.built_with') || 'Built with SvelteKit & TailwindCSS'}
			</p>
		</div>
	</div>

	<!-- Background decoration -->
	<div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400/20 via-purple-400/20 to-amber-400/20"></div>
</footer>
