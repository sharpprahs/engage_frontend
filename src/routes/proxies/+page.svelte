<script lang="ts">
	import './proxies.css';
	import SelectCard from '$lib/components/SelectCard.svelte';
	import type { PageProps } from './$types';
	import { writable } from 'svelte/store';
	import '$lib/styles/select_default.css';
	import '$lib/styles/cards_default_choice.css';
	import Pagination from '$lib/components/Pagination.svelte';
	import '$lib/styles/pagination_default.css';
	import ProxyItem from '$lib/components/ProxyItem.svelte';

	// Пример данных, полученных с сервера
	let proxies = [
		{
			id: 1,
			proxyType: 'M',
			proxyUrl: 'https://dark.shopping',
			proxySetting: '192.168.0.1:8080',
			proxyUser: 'proxyuser123',
			proxyPassword: 'asdsdasdasasdsa'
		},
		{
			id: 2,
			proxyType: 'O',
			proxyUrl: 'https://another.shop',
			proxySetting: '192.168.0.2:8080',
			proxyUser: 'user456',
			proxyPassword: 'anotherpass'
		},
		{
			id: 3,
			proxyType: 'O',
			proxyUrl: 'https://another.shop',
			proxySetting: '192.168.0.2:2472',
			proxyUser: 'user4s56',
			proxyPassword: 'anotherpass'
		}
		// …
	];


	let title = 'EngageMailer - Настройки проксей';
	let description = 'EngageMailer - инструмент для автоматизированной email-рассылки, CRM и эффективной работы с клиентами.';

	let { data }: PageProps = $props();

	const selectedSenderValue = writable(data.senderAccounts_dialogue[0]?.value || '');

	function handleSenderChange(value: string) {
		console.log('Выбранный отправитель:', value);
		selectedSenderValue.set(value);
	}


	// Функция переключения состояния

	let currentPage = $state(0);
	const totalPages = 100;
	function handlePageChange(newPage: number) {
		console.log('Кастомная логика для страницы:', newPage+1);
	}
	let fileData: string = $state('');
	let fileName: string = $state('');
	let fileInput: HTMLInputElement;

	// Функция для открытия диалога выбора файла
	function triggerFileInput() {
		fileInput.click();
	}

	// Обработка изменения значения input
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


<section class="choice_senders_to_download_proxies">
	<SelectCard
		title="Отправители"
		label="Аккаунты"
		options={data.senderAccounts_dialogue}
		selectedValue={$selectedSenderValue}
		onChange={handleSenderChange}
		className="default_card_container sender_card_colors"
		specialClassName="default_card_label select_wrapper_default sender_select_colors"
	/>
	<h3>
		Прокси добавляются пакетно, вы добавляете пул прокси от любого провайдера, указываете в первой строке провайдера, ссылку на сайт, откуда вы арендовали прокси, во второй строке тип прокси, их два, <span id="mobile_proxy">mobile</span> и <span id="others_proxy">others</span>, далее по очереди прокси в формате адрес_прокси: port_proxy:login_proxy:password_proxy и затем с новой строки оставшиеся прокси, постепенно каждый прокси будет провалидирован и добавлен, все прокси, которые будут успешно проверены - добавляются в пул.
	</h3>
</section>

<section class="pull_proxies_container">
   <div class="general_proxies">
    <h1>Пул прокси</h1>
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
	<ul class="proxies_list">
		{#each proxies as proxy (proxy.id)}
			<ProxyItem
				proxyType={proxy.proxyType}
				proxyUrl={proxy.proxyUrl}
				proxySetting={proxy.proxySetting}
				proxyUser={proxy.proxyUser}
				proxyPassword={proxy.proxyPassword}
			/>
		{/each}
	</ul>
	<Pagination
		class="pagination_default pagination_proxies"
		startValue={0}
		lastValue={totalPages}
		bind:currentValue={currentPage}
		sizeRender={5}
		onChange={handlePageChange}
	/>
</section>
<h3 id="mobile_h3_proxies">
	Прокси добавляются пакетно, вы добавляете пул прокси от любого провайдера, указываете в первой строке провайдера, ссылку на сайт, откуда вы арендовали прокси, во второй строке тип прокси, их два, <span id="mobile_proxy">mobile</span> и <span id="others_proxy">others</span>, далее по очереди прокси в формате адрес_прокси: port_proxy:login_proxy:password_proxy и затем с новой строки оставшиеся прокси, постепенно каждый прокси будет провалидирован и добавлен, все прокси, которые будут успешно проверены - добавляются в пул.
</h3>