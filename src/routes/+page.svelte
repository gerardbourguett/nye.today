<script lang="ts">
	import { CURRENT_YEAR } from '../data/constants';
	import TimeProgress from '$lib/components/TimeProgress.svelte';
	import { onMount } from 'svelte';
	import CountDown from '$lib/components/CountDown.svelte';

	let isMounted = false;

	onMount(() => {
		isMounted = true;
	});
</script>

<div
	class="flex w-full flex-1 flex-col items-center justify-center space-y-10 text-center sm:space-y-16"
>
	<div class="space-y-10 sm:space-y-12">
		<h1 class="text-6xl font-medium tracking-tight sm:text-7xl md:text-9xl">
			#{CURRENT_YEAR + 1}<span class="animate-pulse text-sky-500">Live</span>
		</h1>

		<div class="mx-auto w-full max-w-xl px-4 sm:max-w-2xl">
			<TimeProgress />
		</div>

		<div class="animate-fade-in space-y-12 px-4 text-center">
			<div class="mx-auto max-w-4xl">
				<CountDown />
			</div>
			<!--  <div class="max-w-4xl mx-auto">
        <AnalogWatch client:load />
      </div> -->
		</div>
	</div>
</div>
