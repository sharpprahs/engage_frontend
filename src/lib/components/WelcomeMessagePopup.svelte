<script lang="ts">
	import '$lib/styles/welcome_message_popup.css';
	import ClosePopup from '$lib/icons/close_popup_w.svelte';
	import DeleteRed from '$lib/icons/delete_red.svelte';
	import SavedGreen from '$lib/icons/saved_green.svelte';
	import TiptapEditor from '$lib/components/TiptapEditor.svelte';
	import { writable } from 'svelte/store';
	import Pagination from '$lib/components/Pagination.svelte';
	let { closePopup } = $props();
	import '$lib/styles/pagination_default.css';
	let currentPage = $state(2);
	const totalPages = 100;
	function handlePageChange(newPage: number) {
		console.log('Кастомная логика для страницы:', newPage+1);
	}
	// Интерфейс для элемента темы
	interface Theme {
		id: number;
		text: string;
	}

	const themes = writable<Theme[]>([
		{ id: 1, text: 'Поворот не туда' },
		{ id: 2, text: 'Ещё одна тема' },
	]);

	function removeTheme(id: number) {
		themes.update(list => list.filter(theme => theme.id !== id));
	}

	function updateTheme(id: number, newText: string) {
		themes.update(list =>
			list.map(theme => theme.id === id ? { ...theme, text: newText } : theme)
		);
	}

	// Обработчик ввода для темы
	function handleThemeInput(e: Event, id: number) {
		const input = e.target as HTMLInputElement;
		updateTheme(id, input.value);
	}
	// Функция для добавления новой темы
	function addTheme() {
		themes.update(list => {
			// Вычисляем новый уникальный id
			const newId = list.length > 0 ? Math.max(...list.map(theme => theme.id)) + 1 : 1;
			// Можно задать начальный текст, например "Новая тема"
			return [...list, { id: newId, text: 'Новая тема' }];
		});
	}
</script>
<div class="popup_header">
	<h4>Приветственные сообщения</h4>
	<button aria-label="Закрыть попап" onclick={closePopup}>
   <ClosePopup/>
	</button>
</div>
<p class="description_interval">Приветственные сообщения - это сообщения, которые система автоматически отправляет группе потенциальных лидов, они уникальны для каждого лида, эта мера направлена на то, чтобы избежать спам-фильтров.</p>

<ul class="welcome_messages">
	<li>
     <div class="welcome_named">
       <input value="Приветственное сообщение 1"/>
			 <button aria-label="сохранить изменения">
				 <SavedGreen/>
			 </button>
			 <button aria-label="удалить шаблон">
				 <DeleteRed/>
			 </button>
		 </div>
		<div class="theme">
			<div class="theme_title">
				<span>Темы</span>
				<button aria-label="Добавить тему" onclick={addTheme}>Добавить тему</button>
			</div>
			<div class="theme_items">
				{#each $themes as theme (theme.id)}
					<div class="theme_input">
						<input
							type="text"
							value={theme.text}
							oninput={(e) => handleThemeInput(e, theme.id)}
						/>
						<button aria-label="удалить тему" onclick={() => removeTheme(theme.id)}>
							<ClosePopup/>
						</button>
					</div>
				{/each}
			</div>
			<div class="theme_title">
				<span>Текст</span>
			</div>
			<TiptapEditor/>
		</div>
	</li>
</ul>
<div class="pagination_template_message">
	<Pagination
		class="pagination_default"
		startValue={0}
		lastValue={totalPages}
		bind:currentValue={currentPage}
		sizeRender={5}
		onChange={handlePageChange}
	/>
	<button class="add_new_template">Добавить приветственное сообщение</button>
</div>
