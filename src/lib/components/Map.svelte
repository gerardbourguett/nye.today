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

	let interval: ReturnType<typeof setInterval>;

	onMount(async () => {
		const response = await fetch('data/timezone.json');
		const data = await response.json();
		zones = data;
		updateNewYearCountries();

		// Actualiza cada minuto
		interval = setInterval(updateNewYearCountries, 60000);
	});

	onDestroy(() => {
		if (interval) clearInterval(interval);
	});
</script>

<div class="map-container">
	<header class="map-header">
		<h1
			class="bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl"
		>
			World Map
		</h1>
		<p class="mt-2 text-sm text-sky-100/80 sm:text-base">
			Countries that have already entered {new Date().getFullYear() + 1}
		</p>
	</header>

	<div class="map-wrapper">
		<svg viewBox="0 0 1000 500" class="world-map" preserveAspectRatio="xMidYMid meet">
			{#each zones as zone}
				<path
					id={zone.countryCode}
					d={zone.zoneName}
					fill={newYearCountries[zone.countryCode] ? '#38bdf8' : '#374151'}
					stroke="#1f2937"
					stroke-width="0.5"
					class="country-path cursor-pointer transition-all duration-300 hover:fill-sky-300"
					title="{zone.countryName}: {newYearCountries[zone.countryCode]
						? 'Already in ' + (new Date().getFullYear() + 1)
						: 'Not yet'}"
				/>
			{/each}
		</svg>
	</div>

	<div class="map-legend">
		<div class="legend-item">
			<div class="legend-color bg-sky-400"></div>
			<span class="legend-text">Already in {new Date().getFullYear() + 1}</span>
		</div>
		<div class="legend-item">
			<div class="legend-color bg-gray-600"></div>
			<span class="legend-text">Still in {new Date().getFullYear()}</span>
		</div>
	</div>
</div>

<style>
	.map-container {
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		padding: 1rem;
	}

	.map-header {
		text-align: center;
		margin-bottom: 2rem;
	}

	.map-wrapper {
		width: 100%;
		background: rgba(0, 0, 0, 0.1);
		border-radius: 1rem;
		padding: 1rem;
		border: 1px solid rgba(56, 189, 248, 0.2);
		backdrop-filter: blur(8px);
	}

	.world-map {
		width: 100%;
		height: auto;
		min-height: 300px;
	}

	.country-path {
		transition: all 0.3s ease;
	}

	.country-path:hover {
		stroke-width: 1;
		stroke: #38bdf8;
	}

	.map-legend {
		display: flex;
		justify-content: center;
		gap: 2rem;
		margin-top: 2rem;
		flex-wrap: wrap;
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.legend-color {
		width: 1rem;
		height: 1rem;
		border-radius: 0.25rem;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.legend-text {
		font-size: 0.875rem;
		color: #e5e7eb;
		font-weight: 500;
	}

	@media (max-width: 640px) {
		.map-container {
			padding: 0.5rem;
		}

		.map-wrapper {
			padding: 0.5rem;
		}

		.map-legend {
			gap: 1rem;
			flex-direction: column;
			align-items: center;
		}
	}
</style>
