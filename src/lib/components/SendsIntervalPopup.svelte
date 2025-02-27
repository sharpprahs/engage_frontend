<script lang="ts">
	import '$lib/styles/sends_interval_popup.css';
	import ClosePopup from '$lib/icons/close_popup_w.svelte';

	export let closePopup: () => void;
</script>
<div class="popup_header">
	<h4>Настройка интервала приветственных сообщений</h4>
   <button aria-label="Закрыть попап" on:click={closePopup}>
		 <ClosePopup/>
	 </button>
</div>
<p class="description_interval">Минимальное и максимальное время между написанием письма следующему лиду с 1 аккаунта в минутах</p>
<div class="settings_panel_element_time_interval">

		<label for="send_time_interval">send_time_interval</label>
		<div id="settings_range_row_items"><input type="number" id="send_time_interval" placeholder="10" value="10">
			<span>———</span> <input type="number" id="send_time_interval" placeholder="10" value="10"></div>
	<button class="saved_change_time_interval">Начать</button></div>

