<script>
	import '$lib/styles/header.css';
	import { page } from '$app/state';
	import { beforeNavigate } from '$app/navigation';
	import AgentGreen from '$lib/icons/agent_green.svelte';
	let isMenuOpen = false;

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
		document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
	}

	// Закрываем меню при каждом переходе на новую страницу
	beforeNavigate(() => {
		isMenuOpen = false;
		document.body.style.overflow = 'auto';
	});
</script>

<header>
	<a href="/">
		EngageMailer
		<span>alpha</span>
		<div class="icon_container">
			<AgentGreen/>
			<img src="/types_of_mail/outlook_black.svg" alt="outlook service">
			<img src="/types_of_mail/gmail_black.svg" alt="gmail service">
			<img src="/types_of_mail/yandex_black.svg" alt="yandex service">
		</div>
	</a>
	<ul id="pc_version">
		<li>
			<a href="/mailings" class:active={page.url.pathname === '/mailings'}>рассылки</a>
		</li>
		<li>
			<a href="/dialogues" class:active={page.url.pathname === '/dialogues'}>диалоги</a>
		</li>
		<li>
			<a href="/proxies" class:active={page.url.pathname === '/proxies'}>прокси</a>
		</li>
		<li>
			<a href="/users" class:active={page.url.pathname === '/users'}>аккаунты</a>
		</li>
		<li>
			<a href="/settings" class:active={page.url.pathname === '/settings'}>настройки</a>
		</li>
		<li>
			<button>
				<img src="/swap_mode_black.svg" alt="Сменить тему">
			</button>
		<li>
			<a href="/">
				<img src="/exit_black.svg" alt="Выйти из аккаунта">
			</a>
		</li>
	</ul>
	<button class="menu_icon {isMenuOpen ? '_active' : ''}" aria-label="Toggle menu" on:click={toggleMenu}>
		<span></span>
	</button>
	<div id="mobile_menu" class:isOpen={isMenuOpen}>
		<ul id="mobile_version">
			<li>
				<a href="/mailings" class:active={page.url.pathname === '/mailings'}>рассылки</a>
			</li>
			<li>
				<a href="/dialogues" class:active={page.url.pathname === '/dialogues'}>диалоги</a>
			</li>
			<li>
				<a href="/proxies" class:active={page.url.pathname === '/proxies'}>прокси</a>
			</li>
			<li>
				<a href="/users" class:active={page.url.pathname === '/users'}>пользователи</a>
			</li>
			<li>
				<a href="/settings" class:active={page.url.pathname === '/settings'}>настройки</a>
			</li>
			<li>
				<button>
					<img src="/swap_mode_black.svg" alt="Сменить тему">
				</button>
			<li>
				<a href="/">
					<img src="/exit_black.svg" alt="Выйти из аккаунта">
				</a>
			</li>
		</ul>
	</div>
</header>