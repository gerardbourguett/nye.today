<script lang="ts">
	import { CURRENT_YEAR } from '../../lib/data/constants';
	import RoadTo2026 from '../../lib/components/RoadTo2026.svelte';
</script>

<svelte:head>
	<title>#{CURRENT_YEAR + 1}Live | Road to 2026</title>
	<meta name="description" content="Countdown to #{CURRENT_YEAR + 1} Live" />
</svelte:head>

<div>
	<RoadTo2026 />
</div>
