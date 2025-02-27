<script lang="ts">
	import { writable, get } from 'svelte/store';

	// Принимаем данные прокси через пропсы
	export let proxyType: 'M' | 'O' = 'M'; // начальное значение типа прокси
	export let proxyUrl: string = 'https://dark.shopping';
	export let proxySetting: string = '192.168.0.1:8080';
	export let proxyUser: string = 'proxyuser123';
	export let proxyPassword: string = 'asdsdasdasasdsa';

	// Локальное состояние для типа прокси, инициализируем значением proxyType
	const currentValueProxyType = writable<'M' | 'O'>(proxyType);

	// Состояние для показа/скрытия пароля
	let showPassword = false;

	// Обработчик ввода для мобильных и десктопов (on:input)
	function handleInput(event: Event) {
		const input = event.target as HTMLInputElement;
		const value = input.value.toUpperCase();

		// Разрешаем только один символ M или O
		if (value === 'M' || value === 'O') {
			currentValueProxyType.set(value as 'M' | 'O');
		} else {
			// Если значение некорректное (например, удаление или лишние символы),
			// возвращаем предыдущее корректное значение
			input.value = get(currentValueProxyType);
		}
	}

	// Дополнительная обработка вставки (on:paste)
	function handlePaste(event: ClipboardEvent) {
		event.preventDefault();
		const pasteText = event.clipboardData?.getData('text') || '';
		const keyUpper = pasteText.trim().toUpperCase().slice(-1);
		if (keyUpper === 'M' || keyUpper === 'O') {
			currentValueProxyType.set(keyUpper as 'M' | 'O');
		}
	}

	// Если хочется оставить обработку keydown для десктопа, можно оставить её
	function handleKeydown(event: KeyboardEvent) {
		const navKeys = ['ArrowLeft', 'ArrowRight', 'Home', 'End', 'Tab'];
		if (navKeys.includes(event.key)) return;

		// Запрещаем удаление символа
		if (event.key === 'Backspace' || event.key === 'Delete') {
			event.preventDefault();
			return;
		}

		// Приводим клавишу к верхнему регистру и проверяем
		const keyUpper = event.key.toUpperCase();
		if (keyUpper === 'M' || keyUpper === 'O') {
			event.preventDefault();
			currentValueProxyType.set(keyUpper as 'M' | 'O');
		} else {
			event.preventDefault();
		}
	}

	function togglePassword() {
		showPassword = !showPassword;
	}
</script>

<li>
	<div class="named_proxy">
		<!-- Инпут для выбора типа прокси -->
		<input
			bind:value={$currentValueProxyType}
			on:input={handleInput}
			on:paste={handlePaste}
			on:keydown={handleKeydown}
			inputmode="text"
			pattern="^[MmOo]$"
			maxlength="1"
		class="type_proxy"
		class:type_proxy_m={$currentValueProxyType === 'M'}
		class:type_proxy_o={$currentValueProxyType === 'O'}
		/>
		<!-- Инпут для URL прокси -->
		<input type="text" bind:value={proxyUrl} />
	</div>
	<form class="proxy_setting" on:submit|preventDefault>
		<input type="text" bind:value={proxySetting} />
		<input type="text" bind:value={proxyUser} />
		<div class="password_proxy">
			<input type={showPassword ? 'text' : 'password'} bind:value={proxyPassword} />
			<button
				class="show_hidden_password"
				class:active={showPassword}
				on:click={togglePassword}
				aria-label="Показать скрыть пароль">
			</button>
		</div>
		<div class="buttons_action_proxy">
			<button class="saved_changes" aria-label="Сохранить изменения"></button>
			<button class="paused" aria-label="Приостановить работу прокси"></button>
			<button class="delete" aria-label="Удалить прокси"></button>
		</div>
	</form>
</li>
