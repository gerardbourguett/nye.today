# Sistema de Notificaciones PWA - NYE.today

## Descripción

Se ha implementado un sistema completo de notificaciones para la PWA que alerta a los usuarios cuando territorios alrededor del mundo alcanzan la medianoche durante las celebraciones de Año Nuevo.

## Características Implementadas

### 1. Notificaciones Toast (svelte-sonner)
- **Librería**: `svelte-sonner` instalada con pnpm
- **Ubicación**: Configurado globalmente en `src/routes/+layout.svelte`
- **Funcionalidad**: Muestra notificaciones elegantes en la interfaz cuando un territorio alcanza medianoche
- **Características**:
  - Duración de 8 segundos
  - Botón de acción "Ver Stream" que abre el enlace correspondiente
  - Colores ricos y diseño moderno
  - Posición centrada en la parte superior

### 2. Notificaciones Push Nativas
- **API**: Notification API del navegador
- **Permisos**: Solicitud automática al cargar la página
- **Características**:
  - Icono personalizado de la PWA
  - Badge de notificación
  - Título: "🎉 ¡Feliz Año Nuevo!"
  - Descripción: Nombre del país que celebra
  - Tag único para evitar duplicados

### 3. Botón de Control de Notificaciones
- **Componente**: `NotificationButton.svelte`
- **Ubicación**: Header (desktop y mobile)
- **Funcionalidad**:
  - Permite activar/verificar estado de notificaciones
  - Indicador visual del estado (Bell/BellOff)
  - Feedback inmediato con toast
  - Responsive design

### 4. Detección Inteligente de Medianoche
- **Archivo**: `RoadTo2026.svelte`
- **Lógica**:
  - Verificación cada segundo junto con la actualización del timestamp
  - Prevención de notificaciones duplicadas usando Set con clave única
  - Detección cuando `minutesToNextMidnight` llega a 0
  - Soporte para múltiples zonas horarias simultáneamente

## Archivos Modificados

### 1. `src/routes/+layout.svelte`
```svelte
import { Toaster } from 'svelte-sonner';
// ...
<Toaster richColors position="top-center" />
```

### 2. `src/lib/components/RoadTo2026.svelte`
- Importación de `toast` de svelte-sonner
- Variables para control de notificaciones
- Funciones para permisos y notificaciones nativas
- Lógica de detección de medianoche
- Integración en el ciclo de actualización

### 3. `src/lib/components/NotificationButton.svelte` (Nuevo)
- Componente independiente para control de notificaciones
- Manejo de estados y permisos
- Feedback visual y de usuario

### 4. `src/lib/components/Header.svelte`
- Integración del botón de notificaciones
- Disponible en desktop y mobile

## Configuración PWA

La aplicación ya tenía configuración PWA completa en `vite.config.ts` con:
- Service Worker automático
- Manifest completo
- Iconos optimizados
- Caching estratégico

## Experiencia de Usuario

### Flujo de Activación
1. Usuario visita la página
2. Se solicitan permisos de notificación automáticamente
3. Usuario puede usar el botón en el header para verificar/activar
4. Feedback inmediato sobre el estado

### Flujo de Notificación
1. Sistema detecta territorio en medianoche (0 minutos)
2. Se muestra toast en la interfaz
3. Se envía notificación push nativa (si permisos concedidos)
4. Se previenen duplicados para el mismo día

## Tecnologías Utilizadas

- **svelte-sonner**: Notificaciones toast elegantes
- **Notification API**: Notificaciones push nativas del navegador
- **vite-plugin-pwa**: Configuración PWA completa
- **Lucide Svelte**: Iconos para el botón de control
- **TailwindCSS**: Estilos responsive y modernos

## Compatibilidad

- ✅ Chrome/Edge (Desktop y Mobile)
- ✅ Firefox (Desktop y Mobile)
- ✅ Safari (Desktop y Mobile)
- ✅ PWA Standalone Mode
- ✅ Responsive Design

## Notas de Desarrollo

- Las notificaciones se resetean diariamente para evitar spam
- El sistema es tolerante a fallos (funciona sin permisos)
- Optimizado para rendimiento (verificación cada segundo)
- Accesible y con feedback claro para el usuario