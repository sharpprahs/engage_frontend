<script lang="ts">

	export let recipientName:string;
	export let recipientSurname: string;
	export let recipientEmail: string;
	// Массив кастомных полей
	// Значение по умолчанию — пустой массив, если не передан из родителя
	export let customFields: { name: string; value: string }[] = [];
	// Функция добавления нового поля
	function addCustomField() {
		customFields = [
			...customFields,
			{ name: 'custom_field_name', value: 'Текст' }
		];
	}

</script>

<li>
	<div class="named_sender">
		<input
			inputmode="text"
			bind:value={recipientName}
			class="names_item"
		/>
		<input type="text" bind:value={recipientSurname} class="names_item" />
			<input type="text" bind:value={recipientEmail} />
		<!-- Выводим все кастомные поля -->
		{#each customFields as field}
			<div class="custom_content">
				<input
					type="text"
					bind:value={field.name}
					class="custom_name"
					placeholder="custom_field_name"
				/>
				<input
					type="text"
					bind:value={field.value}
					class="custom_value"
					placeholder="Текст"
				/>
			</div>
		{/each}
	</div>

	<div class="buttons_action_sender">
		<button class="saved_changes" aria-label="Сохранить изменения"></button>
		<!-- Кнопка для добавления кастомного поля -->
		<button class="add_custom_field" aria-label="Добавить кастомное поле" on:click={addCustomField}></button>
		<button class="paused" aria-label="Приостановить работу прокси"></button>
		<button class="delete" aria-label="Удалить прокси"></button>
	</div>
</li>
