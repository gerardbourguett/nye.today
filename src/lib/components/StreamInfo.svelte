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

	// Función para obtener el ícono según el tipo de stream
	function getStreamIcon(type: string): string {
		switch (type) {
			case 'twitch':
				return '🎮';
			case 'youtube':
				return '📺';
			case 'iframe':
				return '🌐';
			default:
				return '📡';
		}
	}

	// Función para obtener el nombre de la plataforma
	function getPlatformName(type: string): string {
		switch (type) {
			case 'twitch':
				return 'Twitch';
			case 'youtube':
				return 'YouTube';
			case 'iframe':
				return 'Web Stream';
			default:
				return 'Stream';
		}
	}
</script>

<div class="stream-info-container">
	<div class="stream-header">
		<div class="stream-icon">
			{getStreamIcon(stream.type)}
		</div>
		<div class="stream-title">
			<h3>{stream.name}</h3>
			<span class="platform-badge">{getPlatformName(stream.type)}</span>
		</div>
	</div>

	<div class="stream-details">
		<div class="location-info">
			<div class="location-item">
				<span class="location-label">📍 Ciudad:</span>
				<span class="location-value">{stream.city || 'No especificada'}</span>
			</div>
			<div class="location-item">
				<span class="location-label">🌍 País:</span>
				<span class="location-value">{stream.country || 'No especificado'}</span>
			</div>
			<div class="location-item">
				<span class="location-label">🕐 Zona Horaria:</span>
				<span class="location-value">{stream.timezone || 'No especificada'}</span>
			</div>
		</div>

		{#if stream.description}
			<div class="stream-description">
				<h4>📝 Descripción</h4>
				<p>{stream.description}</p>
			</div>
		{/if}

		<div class="stream-status">
			<div class="status-indicator">
				<div class="status-dot"></div>
				<span>Stream preparado para Año Nuevo 2026</span>
			</div>
			<div class="coming-soon">
				<span class="coming-soon-text">🚀 Transmisión en vivo próximamente</span>
			</div>
		</div>

		<div class="stream-placeholder">
			<div class="placeholder-content">
				<div class="placeholder-icon">🎆</div>
				<h4>Celebración de Año Nuevo 2026</h4>
				<p>La transmisión en vivo comenzará cuando se acerque la medianoche en {stream.city}.</p>
				<div class="placeholder-features">
					<div class="feature-item">✨ Fuegos artificiales en vivo</div>
					<div class="feature-item">🎉 Celebraciones locales</div>
					<div class="feature-item">🌟 Eventos especiales</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.stream-info-container {
		width: 100%;
		max-width: 900px;
		margin: 0 auto;
		background: rgba(24, 24, 27, 0.8);
		border-radius: 1rem;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
		padding: 1.5rem;
		border: 1px solid rgba(56, 189, 248, 0.2);
		backdrop-filter: blur(8px);
	}

	.stream-header {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1.5rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid rgba(56, 189, 248, 0.2);
	}

	.stream-icon {
		font-size: 2.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 60px;
		height: 60px;
		background: rgba(56, 189, 248, 0.1);
		border-radius: 50%;
		border: 2px solid rgba(56, 189, 248, 0.3);
	}

	.stream-title h3 {
		color: #38bdf8;
		font-size: 1.5rem;
		font-weight: 600;
		margin: 0 0 0.5rem 0;
	}

	.platform-badge {
		background: rgba(56, 189, 248, 0.2);
		color: #38bdf8;
		padding: 0.25rem 0.75rem;
		border-radius: 1rem;
		font-size: 0.875rem;
		font-weight: 500;
		border: 1px solid rgba(56, 189, 248, 0.3);
	}

	.stream-details {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.location-info {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.75rem;
	}

	.location-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem;
		background: rgba(0, 0, 0, 0.2);
		border-radius: 0.5rem;
		border: 1px solid rgba(56, 189, 248, 0.1);
	}

	.location-label {
		color: #94a3b8;
		font-weight: 500;
	}

	.location-value {
		color: #e2e8f0;
		font-weight: 600;
	}

	.stream-description {
		padding: 1rem;
		background: rgba(0, 0, 0, 0.2);
		border-radius: 0.5rem;
		border-left: 3px solid #38bdf8;
	}

	.stream-description h4 {
		color: #38bdf8;
		margin: 0 0 0.5rem 0;
		font-size: 1rem;
		font-weight: 600;
	}

	.stream-description p {
		color: #d1d5db;
		margin: 0;
		line-height: 1.5;
	}

	.stream-status {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.status-indicator {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: #10b981;
		font-weight: 500;
	}

	.status-dot {
		width: 8px;
		height: 8px;
		background: #10b981;
		border-radius: 50%;
		animation: pulse 2s infinite;
	}

	.coming-soon {
		text-align: center;
		padding: 0.75rem;
		background: rgba(251, 191, 36, 0.1);
		border: 1px solid rgba(251, 191, 36, 0.3);
		border-radius: 0.5rem;
	}

	.coming-soon-text {
		color: #fbbf24;
		font-weight: 600;
	}

	.stream-placeholder {
		min-height: 300px;
		background: linear-gradient(135deg, rgba(56, 189, 248, 0.1), rgba(14, 165, 233, 0.1));
		border: 2px dashed rgba(56, 189, 248, 0.3);
		border-radius: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
	}

	.placeholder-content {
		text-align: center;
		max-width: 400px;
	}

	.placeholder-icon {
		font-size: 4rem;
		margin-bottom: 1rem;
	}

	.placeholder-content h4 {
		color: #38bdf8;
		font-size: 1.5rem;
		font-weight: 600;
		margin: 0 0 1rem 0;
	}

	.placeholder-content p {
		color: #94a3b8;
		margin: 0 0 1.5rem 0;
		line-height: 1.6;
	}

	.placeholder-features {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.feature-item {
		color: #e2e8f0;
		font-size: 0.875rem;
		padding: 0.5rem;
		background: rgba(0, 0, 0, 0.2);
		border-radius: 0.25rem;
	}

	@keyframes pulse {
		0%, 100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}

	@media (min-width: 640px) {
		.location-info {
			grid-template-columns: 1fr 1fr;
		}

		.stream-status {
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
		}

		.stream-placeholder {
			min-height: 400px;
		}
	}

	@media (min-width: 768px) {
		.location-info {
			grid-template-columns: 1fr 1fr 1fr;
		}

		.stream-placeholder {
			min-height: 480px;
		}

		.placeholder-features {
			flex-direction: row;
			justify-content: center;
			gap: 1rem;
		}
	}
</style>