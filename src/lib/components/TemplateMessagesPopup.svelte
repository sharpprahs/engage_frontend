<script lang="ts">
	import '$lib/styles/template_messages_popup.css';
	import ClosePopup from '$lib/icons/close_popup_w.svelte';
	import SavedGreen from '$lib/icons/saved_green.svelte';
	import DeleteRed from '$lib/icons/delete_red.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import '$lib/styles/pagination_default.css';
	let { closePopup } = $props();
	let currentPage = $state(2);
	const totalPages = 100;

	function handlePageChange(newPage: number) {
		console.log('Кастомная логика для страницы:', newPage+1);
	}
</script>
<div class="popup_header">
	<h4>Шаблоны сообщений</h4>
	<button aria-label="Закрыть попап" onclick={closePopup}>
		<ClosePopup/>
	</button>
</div>
<p class="description_interval">Шаблоны сообщений, которае могут быть быстро использованы при отправке сообщения, это быстрый набор некоторых основных ответов или вопросов в диалоге</p>
 <ul class="template_items">
	 <li>
		 <div class="templated_name">
			 <input type="text" value="Шаблон"/>
			 <button aria-label="сохранить изменения">
				 <SavedGreen/>
			 </button>
			 <button aria-label="удалить шаблон">
				 <DeleteRed/>
			 </button>
		 </div>
		 <textarea class="template_text">Are you comfortable talking now? Hello again << recipient_name >> this is << sender_name >> I wanted to clarify, is everything still on?</textarea>
	 </li>
	 <li>
		 <div class="templated_name">
			 <input type="text" value="Шаблон"/>
			 <button aria-label="сохранить изменения">
				 <SavedGreen/>
			 </button>
			 <button aria-label="удалить шаблон">
				 <DeleteRed/>
			 </button>
		 </div>
		 <textarea class="template_text">Are you comfortable talking now? Hello again << recipient_name >> this is << sender_name >> I wanted to clarify, is everything still on?</textarea>
	 </li>
	 <li>
		 <div class="templated_name">
			 <input type="text" value="Шаблон"/>
			 <button aria-label="сохранить изменения">
				 <SavedGreen/>
			 </button>
			 <button aria-label="удалить шаблон">
				 <DeleteRed/>
			 </button>
		 </div>
		 <textarea class="template_text">Are you comfortable talking now? Hello again << recipient_name >> this is << sender_name >> I wanted to clarify, is everything still on?</textarea>
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
	<button class="add_new_template">Добавить шаблон</button>
</div>


