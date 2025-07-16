<script lang="ts">
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
			height="480"
			title={stream.name}
		></iframe>
	{:else if stream.type === 'youtube' && stream.videoId}
		<iframe
			src={`https://www.youtube.com/embed/${stream.videoId}`}
			frameborder="0"
			allowfullscreen
			width="100%"
			height="480"
			title={stream.name}
		></iframe>
	{:else if stream.type === 'iframe' && stream.url}
		<iframe
			src={stream.url}
			frameborder="0"
			allowfullscreen
			width="100%"
			height="480"
			title={stream.name}
		></iframe>
	{:else}
		<div class="fallback">
			<p>No se puede mostrar este stream.</p>
			<small>Revisa la configuración del stream seleccionado.</small>
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
		background: #18181b;
		border-radius: 1rem;
		box-shadow: 0 2px 8px #0002;
		padding: 1rem;
	}
	.description {
		margin-top: 1rem;
		color: #aaa;
		font-size: 1rem;
	}
	.fallback {
		color: #f00;
		text-align: center;
		padding: 2rem;
	}
</style>
