import { writable, get, type Writable } from "svelte/store";
import { onDestroy } from "svelte";

export function useAutoScroll(logsContainer: HTMLUListElement) {
	// Состояние автоскролла
	const autoScroll: Writable<boolean> = writable(true);
	const observer = new MutationObserver(() => scrollToBottom());

	// Функция скролла вниз
	function scrollToBottom() {
		if (logsContainer && get(autoScroll)) {
			logsContainer.scrollTop = logsContainer.scrollHeight;
		}
	}

	// Функция переключения автоскролла
	function toggleAutoScroll() {
		autoScroll.update(enabled => {
			const newState = !enabled;
			if (newState) scrollToBottom();
			return newState;
		});
	}

	// Следим за изменениями в списке логов
	observer.observe(logsContainer, { childList: true, subtree: true });
	// Скроллим сразу при загрузке
	scrollToBottom();

	// Очистка наблюдателя при размонтировании
	onDestroy(() => {
		observer.disconnect();
	});

	return { autoScroll, toggleAutoScroll };
}
