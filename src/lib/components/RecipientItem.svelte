<script lang="ts">

	export let recipientName:string;
	export let recipientSurname: string;
	export let recipientEmail: string;

</script>

<li>
	<div class="named_sender">
		<!-- Инпут для выбора типа прокси -->
		<input
			inputmode="text"
			bind:value={recipientName}
			class="names_item"
		/>
		<!-- Инпут для URL прокси -->
		<input type="text" bind:value={recipientSurname} class="names_item" />
		<form class="sender_setting" on:submit|preventDefault>
			<input type="text" bind:value={recipientEmail} />
		</form>
	</div>

	<div class="buttons_action_sender">
		<button class="saved_changes" aria-label="Сохранить изменения"></button>
		<button class="paused" aria-label="Приостановить работу прокси"></button>
		<button class="delete" aria-label="Удалить прокси"></button>
	</div>
</li>
