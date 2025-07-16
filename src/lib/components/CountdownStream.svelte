<script lang="ts">
	import { onMount } from 'svelte';
	export let stream: {
		timezone: string;
	};
	let countdown = '';

	function updateCountdown() {
		if (!stream.timezone) return;
		const now = new Date();
		// Calcula la próxima medianoche en la zona horaria del stream
		const tzDate = new Date(now.toLocaleString('en-US', { timeZone: stream.timezone }));
		const nextMidnight = new Date(tzDate);
		nextMidnight.setHours(24, 0, 0, 0);
		const diff = nextMidnight.getTime() - tzDate.getTime();
		if (diff > 0) {
			const hours = Math.floor(diff / 3600000);
			const minutes = Math.floor((diff % 3600000) / 60000);
			const seconds = Math.floor((diff % 60000) / 1000);
			countdown = `${hours}h ${minutes}m ${seconds}s`;
		} else {
			countdown = '¡Feliz Año Nuevo!';
		}
	}

	let interval: NodeJS.Timeout;
	onMount(() => {
		updateCountdown();
		interval = setInterval(updateCountdown, 1000);
		return () => clearInterval(interval);
	});
</script>

{#if stream.timezone}
	<div class="countdown">
		<span>Cuenta regresiva a la medianoche local: {countdown}</span>
	</div>
{/if}
