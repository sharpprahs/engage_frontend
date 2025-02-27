<script lang="ts">
	import { useBodyScroll } from '$lib/utils/popup';
	import { browser } from '$app/environment';

	export let isOpen: boolean = false;
	export let onClose: () => void;

	const { toggleBodyScroll } = useBodyScroll();

	// Отключаем прокрутку при открытии попапа
	$: if (browser) {
		toggleBodyScroll(isOpen);
	}

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			onClose();
		}
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === "Escape") {
			onClose();
		}
	}
</script>

{#if isOpen}
	<div
		class="popup_overlay"
		role="button"
		tabindex={0}
		on:click={handleBackdropClick}
		on:keydown={handleKeyDown}
	>
	<div class="popup_content">
		<slot></slot>
	</div>
	</div>
{/if}
