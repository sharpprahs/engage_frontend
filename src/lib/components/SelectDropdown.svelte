<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import { browser } from '$app/environment';
	import { writable } from "svelte/store";

	export let options: { label: string; value: string }[] = [];
	export let selectedValue: string = "";
	export let onChange: (value: string) => void = () => {};

	let isOpen = writable(false);
	let selectWrapperRef: HTMLDivElement;
	let triggerRef: HTMLDivElement;

	// селект открывается при клике на `.select-wrapper`
	function toggleDropdown(event?: Event) {
		if (event) event.stopPropagation();
		isOpen.update(value => !value);
	}

	function selectOption(option: { label: string; value: string }) {
		selectedValue = option.value;
		onChange(option.value);

		setTimeout(() => {
			isOpen.set(false);
			triggerRef.blur();
		}, 100);
	}

	function handleKeydown(event: KeyboardEvent, option?: { label: string; value: string }) {
		if (event.key === "Escape") isOpen.set(false);
		if (option && (event.key === "Enter" || event.key === " ")) {
			event.preventDefault();
			selectOption(option);
		}
	}

	// Закрываем селект при клике вне `.select-wrapper`
	function handleClickOutside(event: MouseEvent) {
		if (!selectWrapperRef.contains(event.target as Node)) {
			isOpen.set(false);
			triggerRef.blur();
		}
	}

	onMount(() => {
		if (browser) document.addEventListener("click", handleClickOutside);
	});
	onDestroy(() => {
		if (browser) document.removeEventListener("click", handleClickOutside);
	});
</script>

<!-- ✅ Теперь `.select-wrapper` реагирует на клики -->
<div
	class="select_wrapper"
	bind:this={selectWrapperRef}
	on:click={toggleDropdown}
	on:keydown={(e) => e.key === 'Enter' || e.key === ' ' ? toggleDropdown(e) : null}
	role="button"
	tabindex="0"
	aria-haspopup="listbox"
	aria-expanded={$isOpen}
>
	<div
		id="custom_select"
		role="button"
		bind:this={triggerRef}
		tabindex="0"
		class="select_trigger"
		on:keydown={(e) => e.key === 'Enter' || e.key === ' ' ? toggleDropdown(e) : null}
		aria-haspopup="listbox"
		aria-expanded={$isOpen}
	>
		{options.find(o => o.value === selectedValue)?.value || "Выберите вариант..."}
		<span class="arrow" class:isOpen={$isOpen}></span>
	</div>
	{#if $isOpen}
		<ul role="listbox" class="select_dropdown">
			{#each options as option}
				<li
					role="option"
					tabindex="0"
					on:click={() => selectOption(option)}
					on:keydown={(e) => handleKeydown(e, option)}
					class:selected={option.value === selectedValue}
					aria-selected={option.value === selectedValue}
				>
					{option.value}
				</li>
			{/each}
		</ul>
	{/if}
</div>
