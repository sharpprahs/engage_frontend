import { onMount } from "svelte";

export function onClickOutside(node: HTMLElement, callback: () => void) {
	onMount(() => {
		function handleClick(event: MouseEvent) {
			if (!node.contains(event.target as Node)) {
				callback();
			}
		}

		document.addEventListener("click", handleClick, true);

		return () => {
			document.removeEventListener("click", handleClick, true);
		};
	});
}
