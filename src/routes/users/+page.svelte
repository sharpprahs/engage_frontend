<script lang="ts">
	import './users.css';
	import { writable } from 'svelte/store';
	import SelectCard from '$lib/components/SelectCard.svelte';
	import "$lib/styles/cards_default_choice.css"
	import "$lib/styles/select_default.css"
	import type { PageProps } from './$types';
	import { usePopup } from '$lib/utils/popup';
	import Modal from '$lib/components/Modal.svelte';
	import IntervalPopup from '$lib/components/SendsIntervalPopup.svelte';
	import TemplatePopup from '$lib/components/TemplateMessagesPopup.svelte';
	import WelcomeMessagePopup from '$lib/components/WelcomeMessagePopup.svelte';
	import SenderItem from '$lib/components/SenderItem.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import '$lib/styles/pagination_default.css';
	import RecipientItem from '$lib/components/RecipientItem.svelte';

	let title = "EngageMailer - Настройки пользователей";
	let description = "EngageMailer - инструмент для автоматизированной email-рассылки, CRM и эффективной работы с клиентами.";

	// Активный таб
	let activeTab = writable<'accounts' | 'base'>('accounts');
	// Функция для переключения табов
	function setTab(tab: 'accounts' | 'base') {
		activeTab.set(tab);
	}
	let { data }: PageProps = $props();

	const selectedSenderValue = writable(data.senderAccounts[0]?.value || "");
	const selectedRecipientValue = writable(data.recipientAccounts[0]?.value || "");
	function handleRecipientChange(value: string) {
		console.log("Выбранный получатель:", value);
		selectedRecipientValue.set(value);
	}

	function handleSenderChange(value: string) {
		console.log("Выбранный отправитель:", value);
		selectedSenderValue.set(value);
	}
	const { activePopup, openPopup, closePopup } = usePopup();
	let fileData: string = $state('');
	let fileName: string = $state('');
	let fileInput: HTMLInputElement = $state();
	function triggerFileInput() {
		fileInput.click();
	}
	async function handleFileChange(event: Event) {
		const input = event.target as HTMLInputElement;
		if (!input.files || input.files.length === 0) return;

		const file = input.files[0];

		// Проверка на формат файла
		if (file.type !== 'text/plain' && !file.name.endsWith('.txt')) {
			alert('Можно загружать только файлы формата .txt');
			return;
		}

		fileName = file.name;
		fileData = await file.text();
	}
	let fileDataRecipient: string = $state('');
	let fileNameRecipient: string = $state('');
	let fileInputRecipient: HTMLInputElement = $state();
	function triggerFileInputR() {
		fileInputRecipient.click();
	}
	async function handleFileChangeR(event: Event) {
		const input = event.target as HTMLInputElement;
		if (!input.files || input.files.length === 0) return;

		const file = input.files[0];

		// Проверка на формат файла
		if (file.type !== 'text/plain' && !file.name.endsWith('.txt')) {
			alert('Можно загружать только файлы формата .txt');
			return;
		}

		fileNameRecipient = file.name;
		fileDataRecipient = await file.text();
	}

	// Функция для открытия диалога выбора файла

	let senderUsers = [
		{
			id: 1,
			senderName: 'Виктор',
			senderSurname: 'Солов',
			senderEmail: 'test1232@mail.ru',
			senderPassword: 'proxyuser123'
		},
		{
			id: 2,
			senderName: 'Виктор',
			senderSurname: 'Солов',
			senderEmail: 'test1232@mail.ru',
			senderPassword: 'proxyuser123'
		},
		{
			id: 3,
			senderName: 'Виктор',
			senderSurname: 'Солов',
			senderEmail: 'test1232@mail.ru',
			senderPassword: 'proxyuser123'
		}
	];

	let recipientUsers = [
		{
			id: 1,
			recipientName: 'Виктор',
			recipientSurname: 'Солов',
			recipientEmail: 'test1232@mail.ru',
		},
		{
			id: 2,
			recipientName: 'Виктор',
			recipientSurname: 'Солов',
			recipientEmail: 'test1232@mail.ru',
		},
		{
			id: 3,
			recipientName: 'Виктор',
			recipientSurname: 'Солов',
			recipientEmail: 'test1232@mail.ru',
		}
	];

	let currentPage = $state(0);
	const totalPages = 100;
	function handlePageChange(newPage: number) {
		console.log('Кастомная логика для страницы:', newPage+1);
	}
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

<div class="tabs_container">
	<button class="tab" class:active={$activeTab === 'accounts'} onclick={() => setTab('accounts')}>
		Аккаунты
	</button>
	<button class="tab" class:active={$activeTab === 'base'} onclick={() => setTab('base')}>
		База
	</button>
</div>

<!-- Контент табов -->
{#if $activeTab === 'accounts'}
	<section class="choice_accounts_container">
		<SelectCard
			title="Отправители"
			label="База аккаунтов"
			options={data.senderAccounts}
			selectedValue={$selectedSenderValue}
			onChange={handleSenderChange}
			additionalInput={true}
			className="default_card_container sender_card_colors"
			specialClassName="default_card_label select_wrapper_default sender_select_colors"
		/>
		<div class="settings_description_senders">

			<h3>Вы можете настраивать интервал между отправками, шаблоны и приветственные сообщения, также можете загрузить аккаунты, чтобы аккаунты могли быть проверены и добавлены в базу данных, вы загружаете текстовый файл формата логин_аккаунт:пароль_аккаунта, затем с новой строки еще один аккаунт и т.д. затем заходит система из пула прокси и проверяет кучу аккаунтов, после всех успешно проверенных аккаунтов они будут добавлены</h3>

			<div class="setting_senders">
				<button
					type="button"
					onclick={() => openPopup('interval')}
					class="link_style_button iwm"
				>
					<span>Интервал</span>
				</button>

				<button
					type="button"
					onclick={() => openPopup('template')}
					class="link_style_button tm"
				>
					<span>Шаблоны</span>
				</button>

				<button
					type="button"
					onclick={() => openPopup('welcome')}
					class="link_style_button wm"
				>
					<span>Сообщения</span>
				</button>
			</div>
		</div>

		<!-- Вместо старого попапа используем компонент Modal -->
		<Modal isOpen={!!$activePopup} onClose={closePopup}>
			{#if $activePopup === 'interval'}
				<IntervalPopup closePopup={closePopup} />

			{:else if $activePopup === 'template'}
				<TemplatePopup closePopup={closePopup} />


			{:else if $activePopup === 'welcome'}
				<WelcomeMessagePopup closePopup={closePopup} />
			{/if}

		</Modal>
	</section>
<section class="pull_accounts_container">
	<div class="general_accounts">
		<h1>Пул аккаунтов</h1>
		<div class="file_upload">
			<input
				type="file"
				accept=".txt"
				onchange={handleFileChange}
				bind:this={fileInput}
				style="display: none;"
			/>
			<button onclick={triggerFileInput} class="upload_button">
				Добавить новую пачку
			</button>
			{#if fileData}
				<div class="file_data">
					<p> {fileName}</p>
				</div>
			{/if}
		</div>
	</div>
	<ul class="users_list">
		{#each senderUsers as user (user.id)}
			<SenderItem
				senderName={user.senderName}
				senderSurname={user.senderSurname}
				senderEmail={user.senderEmail}
				senderPassword={user.senderPassword}
			/>
		{/each}
	</ul>
	<Pagination
		class="pagination_default pagination_users"
		startValue={0}
		lastValue={totalPages}
		bind:currentValue={currentPage}
		sizeRender={5}
		onChange={handlePageChange}
	/>
</section>
	{/if}

{#if $activeTab === 'base'}
	<section class="choice_accounts_container">
		<SelectCard
			title="Получатели"
			label="База лидов"
			options={data.recipientAccounts}
			selectedValue={$selectedRecipientValue}
			onChange={handleRecipientChange}
			additionalInput={true}
			className="default_card_container recipient_card_colors"
			specialClassName="default_card_label select_wrapper_default recipient_select_colors"
		/>
		<div class="settings_description_senders">

			<h3>
				Добавление получателей в систему позволяет загружать базу в удобном формате для автоматической обработки. Вам необходимо подготовить текстовый файл, содержащий логины аккаунтов, каждый с новой строки в формате login_account. Без пробелов, специальных символов или разделителей. После загрузки файл будет обработан системой, и все аккаунты добавятся в порядке очереди. Сервис-воркер работает в фоне, чтобы избежать перегрузки и ошибок, он поэтапно обрабатывает записи, проверяет на дубликаты и фильтрует недопустимые данные. Если аккаунт уже есть в базе, он не будет добавлен повторно.
			</h3>
		</div>
	</section>
	<section class="pull_accounts_container">
		<div class="general_accounts recipient_img">
			<h1>Пул лидов</h1>
			<div class="file_upload">
				<input
					type="file"
					accept=".txt"
					onchange={handleFileChangeR}
					bind:this={fileInputRecipient}
					style="display: none;"
				/>
				<button onclick={triggerFileInputR} class="upload_button">
					Добавить новую пачку
				</button>
				{#if fileDataRecipient}
					<div class="file_data">
						<p> {fileNameRecipient}</p>
					</div>
				{/if}
			</div>
		</div>
		<ul class="users_list">
			{#each recipientUsers as recipient (recipient.id)}
				<RecipientItem
					recipientName={recipient.recipientName}
					recipientSurname={recipient.recipientSurname}
					recipientEmail={recipient.recipientEmail}
				/>
			{/each}
		</ul>
		<Pagination
			class="pagination_default pagination_users"
			startValue={0}
			lastValue={totalPages}
			bind:currentValue={currentPage}
			sizeRender={5}
			onChange={handlePageChange}
		/>
	</section>
	{/if}

