// low fps
import { writable, type Writable } from "svelte/store";
import { onMount, onDestroy } from "svelte";

// Типизация опций
interface TypingEffectOptions {
	text: string;
	typingSpeed: number;
	deletingSpeed: number;
	pauseBetweenCycles: number;
}
// Функция создания эффекта печати с высокой плавностью FPS
export function useTypingEffect({
																	text,
																	typingSpeed = 90,
																	deletingSpeed = 50,
																	pauseBetweenCycles = 2000
																}: TypingEffectOptions) {
	// Реактивные переменные
	const statusText: Writable<string> = writable("");
	const showCursor: Writable<boolean> = writable(true);

	let index = 0;
	let deleting = false;
	let cursorInterval: ReturnType<typeof setInterval> | undefined;
	let typingTimeout: ReturnType<typeof setTimeout> | undefined;

	// 🔄 Функция анимации печати (использует `requestAnimationFrame`)
	function typeAndDelete() {
		typingTimeout = setTimeout(() => {
			if (!deleting) {
				// Печатаем текст
				if (index < text.length) {
					statusText.set(text.slice(0, index + 1));
					index++;
					typeAndDelete();
				} else {
					// Пауза перед удалением
					setTimeout(() => {
						deleting = true;
						typeAndDelete();
					}, pauseBetweenCycles);
				}
			} else {
				// Удаляем текст
				if (index > 0) {
					statusText.set(text.slice(0, index - 1));
					index--;
					typeAndDelete();
				} else {
					// Начинаем заново
					deleting = false;
					typeAndDelete();
				}
			}
		}, deleting ? deletingSpeed : typingSpeed);
	}

	// ✨ Мигание курсора (раз в 500мс)
	function blinkCursor() {
		cursorInterval = setInterval(() => {
			showCursor.update(c => !c);
		}, 500);
	}

	// ▶ Запуск анимации при монтировании компонента
	onMount(() => {
		typeAndDelete();
		blinkCursor();
	});

	// 🛑 Очистка при размонтировании (важно!)
	onDestroy(() => {
		if (cursorInterval) clearInterval(cursorInterval);
		if (typingTimeout) clearTimeout(typingTimeout);
	});

	return { statusText, showCursor };
}
