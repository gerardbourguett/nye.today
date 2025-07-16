<script lang="ts">
	import { CURRENT_YEAR } from '../../lib/data/constants';
</script>

<svelte:head>
	<title>#{CURRENT_YEAR + 1}Live | Stream</title>
	<meta name="description" content="Stream of the world to celebrate the New Year" />
</svelte:head>

<div class="flex min-h-auto flex-col items-center justify-center space-y-8 text-center">
	<h1 class="text-5xl font-bold text-sky-500">Site Under Construction</h1>
	<p class="max-w-xl text-xl text-gray-700 dark:text-gray-200">
		Soon you will be able to watch <span class="font-semibold text-cyan-500">Twitch</span> live
		coverage from <span class="font-semibold text-cyan-500">different locations</span> around the
		world as they celebrate
		<span class="font-semibold text-cyan-500">New Year's Eve</span> at midnight in their time zones.
	</p>
	<div class="flex items-center justify-center">
		<svg
			class="h-16 w-16 animate-bounce text-sky-400"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			viewBox="0 0 48 48"
		>
			<circle cx="24" cy="24" r="20" stroke="currentColor" stroke-width="3" />
			<path
				d="M24 12v12l8 4"
				stroke="currentColor"
				stroke-width="3"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</div>
	<p class="text-base text-gray-500 dark:text-gray-400">
		Come back soon to watch live celebrations from around the world as the New Year arrives in each
		time zone!
	</p>
</div>
