<script lang="ts">
	import "./mailings.css";
	import "$lib/styles/select_default.css"
	import "$lib/styles/button_default.css"
	import "$lib/styles/cards_default_choice.css"
	import SelectCard from '$lib/components/SelectCard.svelte';
	import type { PageProps } from './$types';
	import { writable } from "svelte/store";
	import { useTypingEffect } from "$lib/utils/typingEffect";
	import { useAutoScroll } from "$lib/utils/autoScroll";



	let title = "EngageMailer - Рассылка сообщений";
	let description = "EngageMailer - инструмент для автоматизированной email-рассылки, CRM и эффективной работы с клиентами.";

	let { data }: PageProps = $props();

	// ✅ Разделяем состояние для каждого селекта
	const selectedSenderValue = writable(data.senderAccounts[0]?.value || "");
	const selectedRecipientValue = writable(data.recipientAccounts[0]?.value || "");

	// ✅ Обновляем только `selectedSenderValue`
	function handleSenderChange(value: string) {
		console.log("Выбранный отправитель:", value);
		selectedSenderValue.set(value);
	}

	// ✅ Обновляем только `selectedRecipientValue`
	function handleRecipientChange(value: string) {
		console.log("Выбранный получатель:", value);
		selectedRecipientValue.set(value);
	}
	// Используем утилиту с нужным текстом
	const { statusText, showCursor } = useTypingEffect({
		text: "жду начала рассылки",
		typingSpeed: 90,
		deletingSpeed: 80,
		pauseBetweenCycles: 5000
	});

	// --- Автоскролл ---
	let logsContainer: HTMLUListElement | null = null;
	// Переменная autoScroll – это store, уже объявленный через writable в useAutoScroll
	let autoScroll;
	// Объявляем toggleAutoScroll через $state, чтобы изменения отслеживались корректно
	let toggleAutoScroll = $state(() => () => {});

	// Когда logsContainer станет доступен, вызываем useAutoScroll
	$effect(() => {
		if (logsContainer) {
			const { autoScroll: as, toggleAutoScroll: ta } = useAutoScroll(logsContainer);
			autoScroll = as;
			toggleAutoScroll = ta;
		}
	});

</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="keywords" content="email, рассылка, автоматизация, CRM, EngageMailer" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content="/og-image.png" />
	<meta property="og:url" content="https://yourwebsite.com/" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<section class="mailings_settings">
	<!-- ✅ Селект отправителей -->
	<SelectCard
		title="Отправители"
		label="База аккаунтов"
		options={data.senderAccounts}
		selectedValue={$selectedSenderValue}
		onChange={handleSenderChange}
		className="default_card_container sender_card_colors"
		specialClassName="default_card_label select_wrapper_default sender_select_colors"
	/>

	<!-- ✅ Селект получателей -->
	<SelectCard
		title="Получатели"
		label="База лидов"
		options={data.recipientAccounts}
		selectedValue={$selectedRecipientValue}
		onChange={handleRecipientChange}
	className="default_card_container recipient_card_colors"
	specialClassName="default_card_label select_wrapper_default recipient_select_colors"
	/>
</section>

<!-- Status Section -->
<section class="mailings_status">
	<h1>Статус</h1>
	<div class="mailing_status_now">
		<p>рассылки нет</p>
		<button class="btn_default">начать</button>
	</div>
	<div id="engage_mms">
		<span class="engage">Engage</span><span class="mms">MMS:</span>
		<p>{$statusText}<span class="cursor" class:visible={$showCursor}>|</span></p>
	</div>
</section>

<!-- Server Logs -->
<section class="mailings_server_logs">
	<div class="logs_row"><h3>Логи сервера</h3>
		<button onclick={toggleAutoScroll} class="toggle_scroll" 	class:active={$autoScroll}>
		{$autoScroll ? "Остановить автоскролл" : "Включить автоскролл"}
	</button></div>
	<ul bind:this={logsContainer}>
		<li><div class="log_title"><span id="log_time">12:22</span>Server:</div><div>
			<span class="log_data">Отправитель: xxxczs@gmail.com</span>
			<span class="log_data">Получатель: asdsad@list.ru</span>
			<span class="log_data">User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36</span>
			<span class="log_data">Proxy: 192.168.0.1:2000</span>
			<span class="log_data">Тема: Про что-то</span>
			<span class="log_data">Сообщение: текст сообщения</span>
			<span class="log_data">Отправитель: xxxczs@gmail.com</span>
			<br><span class="log_action">Найдены сессионные куки, используем их для входа</span></div></li>

		<li><div class="log_title"><span id="log_time">12:22</span>Server:</div><div>
			<span class="log_data">Отправитель: xxxczs@gmail.com</span>
			<span class="log_data">Получатель: asdsad@list.ru</span>
			<span class="log_data">User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36</span>
			<span class="log_data">Proxy: 192.168.0.1:2000</span>
			<span class="log_data">Тема: Про что-то</span>
			<span class="log_data">Сообщение: текст сообщения</span>
			<span class="log_data">Отправитель: xxxczs@gmail.com</span>
			<br><span class="log_action">Найдены сессионные куки, используем их для входа</span></div></li>

		<li><div class="log_title"><span id="log_time">12:22</span>Server:</div><div>
			<span class="log_data">Отправитель: xxxczs@gmail.com</span>
			<span class="log_data">Получатель: asdsad@list.ru</span>
			<span class="log_data">User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36</span>
			<span class="log_data">Proxy: 192.168.0.1:2000</span>
			<span class="log_data">Тема: Про что-то</span>
			<span class="log_data">Сообщение: текст сообщения</span>
			<span class="log_data">Отправитель: xxxczs@gmail.com</span>
			<br><span class="log_action">Найдены сессионные куки, используем их для входа</span></div></li>

		<li><div class="log_title"><span id="log_time">12:22</span>Server:</div><div>
			<span class="log_data">Отправитель: xxxczs@gmail.com</span>
			<span class="log_data">Получатель: asdsad@list.ru</span>
			<span class="log_data">User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36</span>
			<span class="log_data">Proxy: 192.168.0.1:2000</span>
			<span class="log_data">Тема: Про что-то</span>
			<span class="log_data">Сообщение: текст сообщения</span>
			<span class="log_data">Отправитель: xxxczs@gmail.com</span>
			<br><span class="log_action">Найдены сессионные куки, используем их для входа</span></div></li>

		<li><div class="log_title"><span id="log_time">12:22</span>Server:</div><div>
			<span class="log_data">Отправитель: xxxczs@gmail.com</span>
			<span class="log_data">Получатель: asdsad@list.ru</span>
			<span class="log_data">User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36</span>
			<span class="log_data">Proxy: 192.168.0.1:2000</span>
			<span class="log_data">Тема: Про что-то</span>
			<span class="log_data">Сообщение: текст сообщения</span>
			<span class="log_data">Отправитель: xxxczs@gmail.com</span>
			<br><span class="log_action">Найдены сессионные куки, используем их для входа</span></div></li>

		<li><div class="log_title"><span id="log_time">12:22</span>Server:</div><div>
			<span class="log_data">Отправитель: xxxczs@gmail.com</span>
			<span class="log_data">Получатель: asdsad@list.ru</span>
			<span class="log_data">User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36</span>
			<span class="log_data">Proxy: 192.168.0.1:2000</span>
			<span class="log_data">Тема: Про что-то</span>
			<span class="log_data">Сообщение: текст сообщения</span>
			<span class="log_data">Отправитель: xxxczs@gmail.com</span>
			<br><span class="log_action">Найдены сессионные куки, используем их для входа</span></div></li>

		<li><div class="log_title"><span id="log_time">12:22</span>Server:</div><div>
			<span class="log_data">Отправитель: xxxczs@gmail.com</span>
			<span class="log_data">Получатель: asdsad@list.ru</span>
			<span class="log_data">User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36</span>
			<span class="log_data">Proxy: 192.168.0.1:2000</span>
			<span class="log_data">Тема: Про что-то</span>
			<span class="log_data">Сообщение: текст сообщения</span>
			<span class="log_data">Отправитель: xxxczs@gmail.com</span>
			<br><span class="log_action">Найдены сессионные куки, используем их для входа</span></div></li>

	</ul>
</section>
