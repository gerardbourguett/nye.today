<script lang="ts">
	import timezoneData from '../data/timezone.json';
	import CardContent from './ui/card/card-content.svelte';
	import CardDescription from './ui/card/card-description.svelte';
	import CardHeader from './ui/card/card-header.svelte';
	import CardTitle from './ui/card/card-title.svelte';
	import Card from './ui/card/card.svelte';
	import { onMount, onDestroy } from 'svelte';

	let timestamp: number = Date.now();

	onMount(() => {
		const interval = setInterval(() => {
			timestamp = Date.now();
		}, 1000); // Actualiza cada segundo

		onDestroy(() => {
			clearInterval(interval);
		});
	});

	function getLocalTime(zoneName: string, timestamp: number): string {
		return new Intl.DateTimeFormat('es-ES', {
			timeZone: zoneName,
			dateStyle: 'full',
			timeStyle: 'medium'
		}).format(new Date(timestamp));
	}

	function getTimeOnly(zoneName: string, timestamp: number): string {
		return new Intl.DateTimeFormat('en-US', {
			timeZone: zoneName,
			hour12: false,
			hour: '2-digit',
			minute: '2-digit'
		}).format(new Date(timestamp));
	}

	function getFlagUrl(countryCode: string): string {
		return `https://hatscripts.github.io/circle-flags/flags/${countryCode.toLowerCase()}.svg`;
	}

	type Zone = (typeof timezoneData)[0];

	function groupByGmtOffset(data: Zone[]) {
		const groups: Record<string, Zone[]> = {};
		for (const zone of data) {
			const key = zone.gmtOffset.toString();
			if (!groups[key]) {
				groups[key] = [];
			}
			groups[key].push(zone);
		}
		return groups;
	}

	const groupedZones = groupByGmtOffset(timezoneData);

	function formatOffset(offset: number): string {
		const hours = offset / 3600;
		return `GMT${hours >= 0 ? '+' : ''}${hours}`;
	}

	function minutesToNextMidnight(zoneName: string, now: number): number {
		const parts = new Intl.DateTimeFormat('en-US', {
			timeZone: zoneName,
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: false
		}).formatToParts(new Date(now));

		const getPart = (type: string) => parts.find((p) => p.type === type)?.value || '00';

		const year = Number(getPart('year'));
		const month = Number(getPart('month'));
		const day = Number(getPart('day'));
		const hour = Number(getPart('hour'));
		const minute = Number(getPart('minute'));
		const second = Number(getPart('second'));

		const localNow = new Date(year, month - 1, day, hour, minute, second);
		const nextMidnight = new Date(year, month - 1, day + 1, 0, 0, 0);

		const diffMs = nextMidnight.getTime() - localNow.getTime();
		return Math.floor(diffMs / 60000);
	}

	// Calcula y reordena cada vez que cambia timestamp
	$: groupedEntries = Object.entries(groupedZones).sort(([_, zonesA], [__, zonesB]) => {
		const minutesA = minutesToNextMidnight(zonesA[0].zoneName, timestamp);
		const minutesB = minutesToNextMidnight(zonesB[0].zoneName, timestamp);
		return minutesA - minutesB;
	});

	function getGroupTime(zoneName: string, timestamp: number): string {
		return new Intl.DateTimeFormat('en-US', {
			timeZone: zoneName,
			hour12: false,
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit'
		}).format(new Date(timestamp));
	}
</script>

<div class="space-y-8">
	<!-- Header -->
	<div class="space-y-4 text-center">
		<h1 class="text-3xl font-bold text-sky-400">Road to 2026</h1>
		<p class="mx-auto max-w-2xl text-zinc-600 dark:text-zinc-400">
			Track the New Year celebrations as they happen around the world. Each timezone celebrates at
			their local midnight.
		</p>
	</div>

	<!-- Timezone Groups -->
	<div class="space-y-8">
		{#each groupedEntries as [offset, zones]}
			<div class="space-y-4">
				<!-- Timezone Header -->
				<div class="flex items-center space-x-4">
					<div
						class="h-px flex-1 bg-gradient-to-r from-transparent via-sky-400/30 to-transparent"
					></div>
					<div class="flex items-center space-x-3">
						<div class="h-2 w-2 rounded-full bg-sky-400"></div>
						<h2 class="text-xl font-semibold text-sky-400">{formatOffset(Number(offset))}</h2>
						<span class="ml-2 text-2xl font-bold text-sky-400">
							{getGroupTime(zones[0].zoneName, timestamp)}
						</span>
						<div class="h-2 w-2 rounded-full bg-sky-400"></div>
					</div>
					<div
						class="h-px flex-1 bg-gradient-to-r from-transparent via-sky-400/30 to-transparent"
					></div>
				</div>

				<!-- Cards Grid -->
				<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
					{#each zones as zone}
						<Card
							class="border-zinc-200/50 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:border-sky-400/30 hover:shadow-lg hover:shadow-sky-400/10 dark:border-zinc-800/50 dark:bg-zinc-900/50 dark:hover:border-sky-400/30"
						>
							<CardHeader class="pb-3">
								<div class="flex items-start justify-between">
									<div class="flex flex-1 items-start space-x-3">
										<!-- Flag -->
										<div class="flex-shrink-0">
											<img
												src={getFlagUrl(zone.countryCode)}
												alt="Flag of {zone.countryName}"
												width="32"
												height="32"
												class="rounded-full shadow-sm"
												loading="lazy"
											/>
										</div>
										<!-- Country Info -->
										<div class="min-w-0 flex-1">
											<CardTitle
												class="truncate text-lg font-semibold text-zinc-900 dark:text-white"
											>
												{zone.countryName}
											</CardTitle>
											<CardDescription
												class="mt-1 truncate text-sm text-zinc-600 dark:text-zinc-400"
											>
												{zone.zoneName}
											</CardDescription>
										</div>
									</div>
									<!-- Time -->
									<div class="flex-shrink-0 text-right">
										<div class="text-2xl font-bold text-sky-400">
											{minutesToNextMidnight(zone.zoneName, timestamp) === 0
												? '<1'
												: minutesToNextMidnight(zone.zoneName, timestamp)}'
										</div>
									</div>
								</div>
							</CardHeader>
							<CardContent class="pt-0">
								<!-- <div class="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
									{getLocalTime(zone.zoneName, timestamp)}
								</div> -->
								<div
									class="mt-3 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-500"
								>
									<span>Stream Live in {zone.countryName}</span>
									<a
										href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
										target="_blank"
										class="text-sky-400">HERE</a
									>
								</div>
							</CardContent>
						</Card>
					{/each}
				</div>
			</div>
		{/each}
	</div>

	<!-- Footer Info -->
	<div class="border-t border-zinc-200/50 pt-8 text-center dark:border-zinc-800/50">
		<p class="text-sm text-zinc-600 dark:text-zinc-400">
			Times are updated in real-time. Refresh to see current local times.
		</p>
	</div>
</div>
