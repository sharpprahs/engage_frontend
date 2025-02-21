<script lang="ts">
	import SelectDropdown from "$lib/components/SelectDropdown.svelte";

	export let title: string = "Default Title";
	export let label: string = "Label";
	export let options: { label: string; value: string }[] = [];
	export let selectedValue: string = "";
	export let className: string = "";
	export let specialClassName: string = "";
	export let onChange: (value: string) => void = () => {};
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
	</div>
</div>
