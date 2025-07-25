<script lang="ts">
	import { _ } from 'svelte-i18n';
	export let stream: {
		id: string;
		name: string;
		type: string;
		channel?: string;
		videoId?: string;
		url?: string;
		description?: string;
		city?: string;
		country?: string;
		timezone?: string;
	};

	// Cambia esto por tu dominio real en producción
	const parent = 'nye.today';
</script>

<div class="player-container">
	{#if stream.type === 'twitch' && stream.channel}
		<iframe
			src={`https://player.twitch.tv/?channel=${stream.channel}&parent=${parent}`}
			frameborder="0"
			allowfullscreen
			allow="autoplay; fullscreen"
			width="100%"
			height="300"
			class="stream-iframe"
			title={stream.name}
		></iframe>
	{:else if stream.type === 'youtube' && stream.videoId}
		<iframe
			src={`https://www.youtube.com/embed/${stream.videoId}`}
			frameborder="0"
			allowfullscreen
			width="100%"
			height="300"
			class="stream-iframe"
			title={stream.name}
		></iframe>
	{:else if stream.type === 'iframe' && stream.url}
		<iframe
			src={stream.url}
			frameborder="0"
			allowfullscreen
			width="100%"
			height="300"
			class="stream-iframe"
			title={stream.name}
		></iframe>
	{:else}
		<div class="fallback">
			<div class="fallback-content">
				<p class="fallback-text">{$_('stream.error_message')}</p>
				<small class="fallback-subtext">{$_('stream.error_subtext')}</small>
			</div>
		</div>
	{/if}
	{#if stream.description}
		<div class="description">{stream.description}</div>
	{/if}
</div>

<style>
	.player-container {
		width: 100%;
		max-width: 900px;
		margin: 0 auto;
		background: rgba(24, 24, 27, 0.8);
		border-radius: 1rem;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
		padding: 1rem;
		border: 1px solid rgba(56, 189, 248, 0.2);
		backdrop-filter: blur(8px);
	}

	.stream-iframe {
		border-radius: 0.5rem;
		background: #000;
	}

	.description {
		margin-top: 1rem;
		color: #d1d5db;
		font-size: 0.875rem;
		line-height: 1.5;
		padding: 0.75rem;
		background: rgba(0, 0, 0, 0.2);
		border-radius: 0.5rem;
		border-left: 3px solid #38bdf8;
	}

	.fallback {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 300px;
		background: rgba(239, 68, 68, 0.1);
		border: 1px solid rgba(239, 68, 68, 0.3);
		border-radius: 0.5rem;
	}

	.fallback-content {
		text-align: center;
		padding: 2rem;
	}

	.fallback-text {
		color: #ef4444;
		font-size: 1rem;
		font-weight: 500;
		margin-bottom: 0.5rem;
	}

	.fallback-subtext {
		color: #9ca3af;
		font-size: 0.875rem;
	}

	@media (min-width: 640px) {
		.player-container {
			padding: 1.5rem;
		}

		.stream-iframe {
			height: 400px;
		}

		.fallback {
			min-height: 400px;
		}
	}

	@media (min-width: 768px) {
		.stream-iframe {
			height: 480px;
		}

		.fallback {
			min-height: 480px;
		}

		.description {
			font-size: 1rem;
		}
	}

	@media (min-width: 1024px) {
		.stream-iframe {
			height: 540px;
		}

		.fallback {
			min-height: 540px;
		}
	}
</style>
