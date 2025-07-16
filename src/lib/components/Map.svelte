<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	// JSON de timezones en data/timezone.json
	let zones: {
		countryCode: string;
		countryName: string;
		zoneName: string;
		gmtOffset: number;
		timestamp: number;
	}[] = [];

	let newYearCountries: Record<string, string> = {};

	function updateNewYearCountries() {
		const now = new Date();
		newYearCountries = {};
		for (const zone of zones) {
			const local = new Date(now.getTime() + zone.gmtOffset * 1000);
			if (local.getUTCFullYear() >= 2026) {
				newYearCountries[zone.countryCode] = zone.countryName;
			}
		}
	}

	onMount(async () => {
		const response = await fetch('data/timezone.json');
		const data = await response.json();
		zones = data;
		updateNewYearCountries();
	});
</script>

<div>
	<h1>Map</h1>

	{#each zones as zone}
		<path
			id={zone.countryCode}
			d={zone.zoneName}
			fill={newYearCountries[zone.countryCode] ? '#FFD700' : '#ccc'}
			stroke="#333"
		/>
	{/each}
</div>
