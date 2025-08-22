<script lang="ts">
	import { onMount } from 'svelte';
	import { Bell, BellOff } from '@lucide/svelte';
	import { Button } from './ui/button/index.js';
	import { toast } from 'svelte-sonner';
	import { _ } from 'svelte-i18n';

	let notificationPermission: NotificationPermission = 'default';
	let isSupported = false;

	onMount(() => {
		isSupported = 'Notification' in window;
		if (isSupported) {
			notificationPermission = Notification.permission;
		}
	});

	async function toggleNotifications() {
		if (!isSupported) {
			toast.error('Notificaciones no soportadas', {
				description: 'Tu navegador no soporta notificaciones push'
			});
			return;
		}

		if (notificationPermission === 'default') {
			const permission = await Notification.requestPermission();
			notificationPermission = permission;

			if (permission === 'granted') {
				toast.success('¡Notificaciones activadas!', {
					description: 'Recibirás notificaciones cuando los territorios celebren la medianoche'
				});
			} else {
				toast.error('Notificaciones denegadas', {
					description: 'Puedes activarlas desde la configuración de tu navegador'
				});
			}
		} else if (notificationPermission === 'granted') {
			toast.info('Notificaciones ya activadas', {
				description: 'Las notificaciones están funcionando correctamente'
			});
		} else {
			toast.error('Notificaciones bloqueadas', {
				description: 'Actívalas desde la configuración de tu navegador'
			});
		}
	}
</script>

{#if isSupported}
	<Button
		variant={notificationPermission === 'granted' ? 'default' : 'outline'}
		size="sm"
		on:click={toggleNotifications}
		class="flex items-center gap-2 transition-all duration-200 hover:scale-105"
	>
		{#if notificationPermission === 'granted'}
			<Bell class="h-4 w-4" />
			<span class="hidden sm:inline">Notificaciones ON</span>
		{:else}
			<BellOff class="h-4 w-4" />
			<span class="hidden sm:inline">Activar Notificaciones</span>
		{/if}
	</Button>
{/if}
