<script lang="ts">
	import "./mailings.css";
	import "$lib/styles/select_default.css"
	import "$lib/styles/button_default.css"
	import SelectCard from '$lib/components/SelectCard.svelte';
	import type { PageProps } from './$types';
	import { writable } from "svelte/store";
	import { useTypingEffect } from "$lib/utils/typingEffect";


	let title = "EngageMailer - рассылка сообщений";
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
		label="Аккаунты с которых рассылаем"
		options={data.senderAccounts}
		selectedValue={$selectedSenderValue}
		onChange={handleSenderChange}
		className="mailings_settings_card sender_card_colors"
		specialClassName="mailings_settings_label select_wrapper_default sender_select_colors"
	/>

	<!-- ✅ Селект получателей -->
	<SelectCard
		title="Получатели"
		label="База аккаунтов"
		options={data.recipientAccounts}
		selectedValue={$selectedRecipientValue}
		onChange={handleRecipientChange}
	className="mailings_settings_card recipient_card_colors"
	specialClassName="mailings_settings_label select_wrapper_default recipient_select_colors"
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
	<h3>Логи сервера</h3>
	<ul>
		<li>Server logs</li>
		<li>Server logs</li>
		<li>Server logs</li>
		<li>Server logs</li>
		<li>Server logs</li>
		<li>Server logs</li>
		<li>Server logs</li>
		<li>Server logs</li>
		<li>Server logs</li>
	</ul>
</section>
