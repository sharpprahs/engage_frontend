<script lang="ts">

	export let senderName:string;
	export let senderSurname: string;
	export let senderEmail: string;
	export let senderPassword: string;



	// Состояние для показа/скрытия пароля
	let showPassword = false;


	function togglePassword() {
		showPassword = !showPassword;
	}
</script>

<li>
	<div class="named_sender">
		<!-- Инпут для выбора типа прокси -->
		<input
			inputmode="text"
			bind:value={senderName}
			class="names_item"
		/>
		<!-- Инпут для URL прокси -->
		<input type="text" bind:value={senderSurname} class="names_item" />
		<form class="sender_setting" on:submit|preventDefault>
			<input type="text" bind:value={senderEmail} />
			<div class="password_sender">
				<input type={showPassword ? 'text' : 'password'} bind:value={senderPassword} />
				<button
					class="show_hidden_password"
					class:active={showPassword}
					on:click={togglePassword}
					aria-label="Показать скрыть пароль">
				</button>
			</div>
		</form>
	</div>

	<div class="buttons_action_sender">
		<button class="saved_changes" aria-label="Сохранить изменения"></button>
		<button class="paused" aria-label="Приостановить работу прокси"></button>
		<button class="delete" aria-label="Удалить прокси"></button>
	</div>
</li>
