import { writable, type Writable } from "svelte/store";
import { onMount, onDestroy } from "svelte";

interface TypingEffectOptions {
	text: string;
	typingSpeed: number;
	deletingSpeed: number;
	pauseBetweenCycles: number;
}

type AnimationState = "typing" | "pausing" | "deleting";

export function useTypingEffect({
																	text,
																	typingSpeed = 90,
																	deletingSpeed = 50,
																	pauseBetweenCycles = 2000
																}: TypingEffectOptions) {
	const statusText: Writable<string> = writable("");
	const showCursor: Writable<boolean> = writable(true);

	// Track active resources
	let animationFrameId: number | null = null;
	let timeoutId: ReturnType<typeof setTimeout> | null = null;
	let cursorIntervalId: ReturnType<typeof setInterval> | null = null;
	let state: AnimationState = "typing";
	let index = 0;
	let lastTime = 0;
	let isDestroyed = false; // Destruction flag

	function animate(timestamp: number) {
		if (isDestroyed) return;

		if (!lastTime) lastTime = timestamp;
		const delta = timestamp - lastTime;

		switch (state) {
			case "typing":
				if (delta >= typingSpeed) {
					index++;
					statusText.set(text.slice(0, index));
					lastTime = timestamp;

					if (index === text.length) {
						state = "pausing";
						timeoutId = setTimeout(() => {
							if (isDestroyed) return;
							state = "deleting";
							lastTime = performance.now();
							animationFrameId = requestAnimationFrame(animate);
						}, pauseBetweenCycles);
						return;
					}
				}
				break;

			case "deleting":
				if (delta >= deletingSpeed) {
					index--;
					statusText.set(text.slice(0, index));
					lastTime = timestamp;

					if (index === 0) {
						state = "typing";
					}
				}
				break;
		}

		if (!isDestroyed) {
			animationFrameId = requestAnimationFrame(animate);
		}
	}

	// ✨ Мигание курсора
	function blinkCursor() {
		cursorIntervalId = setInterval(() => {
			showCursor.update(c => !c);
		}, 500);
	}

	onMount(() => {
		animationFrameId = requestAnimationFrame(animate);
		blinkCursor();
	});

	onDestroy(() => {
		isDestroyed = true;
		if (animationFrameId) cancelAnimationFrame(animationFrameId);
		if (timeoutId) clearTimeout(timeoutId);
		if (cursorIntervalId) clearInterval(cursorIntervalId);
	});

	return { statusText, showCursor };
}
