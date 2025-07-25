<script lang="ts">
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
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
			countdown = $_('countdown_component.new_year_here');
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
	<div class="countdown-container">
		<div class="countdown-content">
			<span class="countdown-text">
				{$_('countdown_component.until_new_year')}:
				<span class="countdown-time">{countdown}</span>
			</span>
		</div>
	</div>
{/if}

<style>
	.countdown-container {
		margin: 1rem 0;
	}

	.countdown-content {
		display: inline-block;
		padding: 0.75rem 1rem;
		background: rgba(24, 24, 27, 0.8);
		border-radius: 0.75rem;
		border: 1px solid rgba(56, 189, 248, 0.2);
		backdrop-filter: blur(8px);
	}

	.countdown-text {
		font-size: 0.875rem;
		color: #fff;
		font-weight: 500;
	}

	.countdown-time {
		font-family: 'Fira Mono', 'Consolas', monospace;
		font-weight: bold;
		color: #38bdf8;
		margin-left: 0.5rem;
	}

	@media (min-width: 640px) {
		.countdown-content {
			padding: 1rem 1.5rem;
		}

		.countdown-text {
			font-size: 1rem;
		}
	}

	@media (min-width: 768px) {
		.countdown-text {
			font-size: 1.125rem;
		}
	}
</style>
