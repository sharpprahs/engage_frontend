<script lang="ts">
	import "./dialogues.css";
import SelectCard from '$lib/components/SelectCard.svelte';
import type { PageProps } from './$types';
import { writable} from 'svelte/store';
import "$lib/styles/select_default.css"
	import "$lib/styles/cards_default_choice.css"
import "$lib/styles/button_default.css"
	import EmailGreen  from '$lib/icons/email_green.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import SelectDropdown from '$lib/components/SelectDropdown.svelte';
	import '$lib/styles/pagination_default.css';




	let progressValue = 50;
let title = "EngageMailer - Диалоги";
let description = "EngageMailer - инструмент для автоматизированной email-рассылки, CRM и эффективной работы с клиентами.";

let { data }: PageProps = $props();

// ✅ Разделяем состояние для каждого селекта
const selectedSenderValue = writable(data.senderAccounts_dialogue[0]?.value || "");

// ✅ Обновляем только `selectedSenderValue`
function handleSenderChange(value: string) {
	console.log("Выбранный отправитель:", value);
	selectedSenderValue.set(value);
}
	let currentPage = $state(2);
	const totalPages = 100;

	function handlePageChange(newPage: number) {
		console.log('Кастомная логика для страницы:', newPage+1);
	}
	let selectedMessageType = $state("normal"); // Значение по умолчанию
	let templateValues = [
		{ label: "Обычное сообщение", value: "normal" },
		{ label: "Шаблонное сообщение", value: "template" },
		{ label: "Приоритетное сообщение", value: "priority" }
	];

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

<section class="senders_choice_panel">
	<!-- ✅ Селект отправителей -->
	<SelectCard
		title="Отправители"
		label="Аккаунты"
		options={data.senderAccounts_dialogue}
		selectedValue={$selectedSenderValue}
		onChange={handleSenderChange}
		className="default_card_container sender_card_colors"
		specialClassName="default_card_label select_wrapper_default sender_select_colors"
	/>
	<div class="reading_status_container">
    <h2><div class="img_container"><EmailGreen/></div>Статус чтения</h2>
		<p>рассылка запущена чтение идёт полным ходом...</p>
		<div class="progress_wrapper">
			<div class="custom-progress">
				<div class="progress-fill" style="width: {progressValue}%"></div>
			</div>
			<span class="progress_label">50%</span>
		</div>
	</div>
</section>

<main class="chat_container">
   <div class="user_list">
     <h1>
			 <div class="count_incoming">
        <span>5</span>
			 </div>
			 Диалоги
		 </h1>
		 <div class="search_container">
			 <input type="text" class="search_input" placeholder="Поиск лида...">
			 <button class="search-button" aria-label="search"></button>
		 </div>
		 <ul>
			 <li class="active_dialogue">
				 <div class="user_name">Имя Фамилия <span>+1</span></div>
				 <span class="last_message">Последнее сообщение..</span>
			 </li>
			 <li class="active_dialogue">
				 <div class="user_name">Имя Фамилия<span>+4</span></div>
				 <span class="last_message">Последнее сообщение..</span>
			 </li>
			 <li>
				 <div class="user_name">Имя Фамилия</div>
				 <span class="last_message">Последнее сообщение..</span>
			 </li>
			 <li>
				 <div class="user_name">Имя Фамилия</div>
				 <span class="last_message">Последнее сообщение..</span>
			 </li>
			 <li>
				 <div class="user_name">Имя Фамилия</div>
				 <span class="last_message">Последнее сообщение..</span>
			 </li>
			 <li>
				 <div class="user_name">Имя Фамилия</div>
				 <span class="last_message">Последнее сообщение..</span>
			 </li>
		 </ul>
		 <!-- Пагинация с номерами страниц -->
		 <Pagination
			 class="pagination_default pagination_dialogue"
			 startValue={0}
			 lastValue={totalPages}
			 bind:currentValue={currentPage}
			 sizeRender={5}
			 onChange={handlePageChange}
		 />
	 </div>
	<section class="chat_box">
		<div class="chat_header">
			<div class="recipient_about"><div class="recipient_row_con"><h3>Виктория Степанова</h3><button id="like" aria-label="like"></button> <button id="block" aria-label="block"></button></div> 		<time datetime="2024-02-18T22:08">Sunday 22.08</time> </div>
			<div class="dialogue_short_info">
				<p class="email_info">
					от <a href="mailto:test@mail.ru">test@mail.ru</a></p>
					<p class="email_info">кому <a href="mailto:test@mail.ru">test@mail.ru</a></p>
			</div>
		</div>
		<ul class="messages_list">
			<li class="message sender_user">
				<p class="sender"><strong>Виктор Геннадьев</strong> <time datetime="2024-02-18T21:00">21:00</time></p>
				<p class="message_text">Здравствуйте, мы занимаемся сертификацией оборудования Figure 01...</p>
			</li>
			<li class="message recipient_user">
				<p class="sender"><strong>Виктор Геннадьев</strong> <time datetime="2024-02-18T21:00">21:00</time></p>
				<p class="message_text">Здравствуйте, свяжусь с вами позже, мне интересно</p>
			</li>
		</ul>
		<form class="message_input">
			<input type="text" placeholder="Введите сообщение..." name="message">
			<button type="submit" aria-label="send message"><span></span></button>
		</form>
		<div class="template_container">
		<div class="select_wrapper_default template_select_colors">
		<SelectDropdown
			options={templateValues}
			bind:selectedValue={selectedMessageType}
		/>
		</div>
			<p>Не рекомендуем часто использовать шаблоны, лучше формируйте более уникальные предложения</p>
		</div>
	</section>
</main>

<style>

</style>