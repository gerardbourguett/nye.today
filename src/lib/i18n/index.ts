import { browser } from '$app/environment';
import { init, register } from 'svelte-i18n';
import { locale as $locale } from 'svelte-i18n';

const defaultLocale = 'en';

// Registrar todos los idiomas disponibles
register('en', () => import('./locales/en.json'));
register('es', () => import('./locales/es.json'));
register('fr', () => import('./locales/fr.json'));
register('de', () => import('./locales/de.json'));
register('ja', () => import('./locales/ja.json'));
register('it', () => import('./locales/it.json'));
register('pt', () => import('./locales/pt.json'));
register('cn', () => import('./locales/cn.json'));
register('ru', () => import('./locales/ru.json'));
register('ar', () => import('./locales/ar.json'));
register('hi', () => import('./locales/hi.json'));
register('nl', () => import('./locales/nl.json'));
register('tr', () => import('./locales/tr.json'));
register('kp', () => import('./locales/kp.json'));

// Función para detectar el idioma del navegador
function getInitialLocale() {
	if (browser) {
		// Intentar obtener del localStorage primero
		const stored = localStorage.getItem('locale');
		if (stored) return stored;
		
		// Detectar del navegador
		const browserLang = navigator.language.split('-')[0];
		const supportedLocales = ['en', 'es', 'fr', 'de', 'ja', 'it', 'pt', 'cn', 'ru', 'ar', 'hi', 'nl', 'tr', 'kp'];
		
		if (supportedLocales.includes(browserLang)) {
			return browserLang;
		}
	}
	return defaultLocale;
}

// Inicializar i18n
init({
	fallbackLocale: defaultLocale,
	initialLocale: getInitialLocale(),
});

// Función para cambiar idioma y guardarlo
export function setLocale(newLocale: string) {
	if (browser) {
		localStorage.setItem('locale', newLocale);
		$locale.set(newLocale);
	}
	// La función locale de svelte-i18n se importará donde se use
}

// Exportar los idiomas disponibles
export const availableLocales = [
	{ code: 'en', name: 'English', flag: 'us' },
	{ code: 'es', name: 'Español', flag: 'es' },
	{ code: 'fr', name: 'Français', flag: 'fr' },
	{ code: 'de', name: 'Deutsch', flag: 'de' },
	{ code: 'ja', name: '日本語', flag: 'jp' },
	{ code: 'it', name: 'Italiano', flag: 'it' },
	{ code: 'pt', name: 'Português', flag: 'pt' },
	{ code: 'cn', name: '简体中文', flag: 'cn' },
	{ code: 'ru', name: 'Русский', flag: 'ru' },
	{ code: 'ar', name: 'العربية', flag: 'sa' }, // Saudi Arabia
	{ code: 'hi', name: 'हिंदी', flag: 'in' }, // India
	{ code: 'nl', name: 'Nederlands', flag: 'nl' }, // Netherlands
	{ code: 'tr', name: 'Türkçe', flag: 'tr' }, // Turkey
	{ code: 'kp', name: '한국어', flag: 'kp' }, // North Korea
];