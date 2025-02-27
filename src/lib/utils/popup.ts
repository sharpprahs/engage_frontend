import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const usePopup = () => {
	const activePopup = writable<string | null>(null);

	const openPopup = (popupType: string) => activePopup.set(popupType);
	const closePopup = () => activePopup.set(null);

	return { activePopup, openPopup, closePopup };
};

export const useBodyScroll = () => {
	const toggleBodyScroll = (locked: boolean) => {
		if (browser) {
			document.body.classList.toggle('overflow_hidden', locked);
		}
	};

	return { toggleBodyScroll };
};