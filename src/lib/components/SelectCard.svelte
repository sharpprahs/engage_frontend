<script lang="ts">
	import SelectDropdown from "$lib/components/SelectDropdown.svelte";
	import AddBase from '$lib/icons/add_base.svelte';


	export let title: string = "Default Title";
	export let label: string = "Label";
	export let options: { label: string; value: string }[] = [];
	export let selectedValue: string = "";
	export let className: string = "";
	export let specialClassName: string = "";
	export let onChange: (value: string) => void = () => {};
	export let additionalInput: boolean = false;
</script>

<div class={`${className || ''}`}>
	<h2>{title}</h2>
	<div class={`${specialClassName || ''}`}>
		<label for="custom_select">{label}</label>
		<SelectDropdown
			options={options}
			selectedValue={selectedValue}
			onChange={onChange}
		/>
		{#if additionalInput}
			<div class="additional_input"><input type="text" placeholder="Новая база аккаунтов"><button aria-label="добавить новую базу аккаунтов"><AddBase/></button></div>
		{/if}
	</div>
</div>
