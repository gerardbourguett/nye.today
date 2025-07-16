<script lang="ts">
	import { CURRENT_YEAR } from '../../lib/data/constants';
	import Map from '../../lib/components/Map.svelte';
</script>

<svelte:head>
	<title>#{CURRENT_YEAR + 1}Live | Map</title>
	<meta name="description" content="Map of the world to celebrate the New Year" />
</svelte:head>

<div class="flex min-h-auto flex-col items-center justify-center space-y-8 text-center">
	<Map />
</div>
