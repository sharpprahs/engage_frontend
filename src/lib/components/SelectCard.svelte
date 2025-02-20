<script lang="ts">
	export let title: string = 'Default Title';
	export let description: string = 'Default description';
	export let label: string = 'Label';
	export let options: string[] = [];
	export let selectedValue: string = '';
	export let className: string = '';
	export let specialClassName: string = '';
	export let onChange: (value: string) => void = () => {};

	function handleChange(event: Event) {
		const value = (event.target as HTMLSelectElement).value;
		if (onChange) onChange(value);
	}
</script>

<div class={`${className || ''}`}>
	<h3>{title}</h3>
	<p>{description}</p>
  <div class={`${specialClassName || ''}`}>
	<label for="select_dropdown">{label}</label>
		<div class="select_wrapper">
	<select id="select_dropdown" bind:value={selectedValue} on:change={handleChange} aria-label={label}>
		{#each options as option}
			<option value={option}>{option}</option>
		{/each}
	</select>
		</div>
	</div>
</div>
