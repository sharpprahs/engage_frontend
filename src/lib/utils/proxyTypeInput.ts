import { writable } from 'svelte/store';

export const currentValueProxyType = writable<'M' | 'O'>('M');

export function handleKeydownProxyType(event: KeyboardEvent) {
	// Разрешаем навигационные клавиши
	const navKeys = ['ArrowLeft', 'ArrowRight', 'Home', 'End', 'Tab'];
	if (navKeys.includes(event.key)) return;

	// Запрещаем Backspace и Delete, чтобы нельзя было стереть символ
	if (event.key === 'Backspace' || event.key === 'Delete') {
		event.preventDefault();
		return;
	}

	// Приводим нажатую клавишу к верхнему регистру
	const keyUpper = event.key.toUpperCase();

	// Если введённый символ — M или O, заменяем текущее значение
	if (keyUpper === 'M' || keyUpper === 'O') {
		event.preventDefault(); // предотвращаем вставку символа по умолчанию
		currentValueProxyType.set(keyUpper as 'M' | 'O');
	} else {
		event.preventDefault(); // все остальные символы запрещены
	}
}

export function handlePasteProxyType(event: ClipboardEvent) {
	event.preventDefault();
	const pasteText = event.clipboardData?.getData('text') || '';
	// Берем последний символ из вставляемой строки и приводим к верхнему регистру
	const keyUpper = pasteText.trim().toUpperCase().slice(-1);
	if (keyUpper === 'M' || keyUpper === 'O') {
		currentValueProxyType.set(keyUpper as 'M' | 'O');
	}
}
