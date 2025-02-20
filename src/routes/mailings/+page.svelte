<script>
	import "./mailings.css";
	import SelectCard from '$lib/components/SelectCard.svelte';

	// Список доступных аккаунтов
	let senderAccounts = ['mail_ru_msk_zone_1', 'gmail_zone_2', 'yandex_zone_3'];

	// Выбранное значение (по умолчанию)
	let selectedSender = senderAccounts[0];

	// Функция обработки изменения выбора
	function handleSenderChange(value) {
		selectedSender = value;
		console.log('Выбранный отправитель:', value);
		// Тут можно делать запрос в БД или обновлять состояние
	}
</script>
<section class="mailings_settings">
	<!-- Sender -->

		<SelectCard
			title="Отправители"
			description="Пул отправителей, с которых будет производиться отправка"
			label="Аккаунты"
			options={senderAccounts}
			selectedValue={selectedSender}
			onChange={handleSenderChange}
			className="mailings_settings_card"
			specialClassName="mailings_settings_label"
		/>


<!--	&lt;!&ndash; Recipient &ndash;&gt;-->
<!--	<div class="mailings_settings_card mailings_recipient">-->
<!--		<h3>Recipient</h3>-->
<!--		<p>The account of the user who will receive the message</p>-->
<!--		<label for="mailings_recipient_select">Base</label>-->
<!--		<select id="mailings_recipient_select" bind:value={selectedRecipient}>-->
<!--			<option value="web_arhitech">Web arhitech</option>-->
<!--			<option value="other_user">Other user</option>-->
<!--		</select>-->
<!--	</div>-->
</section>

<!--&lt;!&ndash; Status Section &ndash;&gt;-->
<!--<section class="mailings_status">-->
<!--	<h3>Status</h3>-->
<!--	<p>Shipping status</p>-->
<!--	<button class="start_btn">Start</button>-->
<!--	<p>-->
<!--		<a href="/mms" class="status_link">EngageMMS:</a> waiting for a text to be sent-->
<!--	</p>-->
<!--</section>-->

<!--&lt;!&ndash; Server Logs &ndash;&gt;-->
<!--<section class="mailings_server_logs">-->
<!--	<h3>Server logs</h3>-->
<!--	<ul>-->
<!--		<li>Server logs</li>-->
<!--		<li>Server logs</li>-->
<!--		<li>Server logs</li>-->
<!--		<li>Server logs</li>-->
<!--	</ul>-->
<!--</section>-->
