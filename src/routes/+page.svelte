<script>
    import "./home.css";
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import AgentGreen  from '$lib/icons/agent_green.svelte';
    let secretKey = '';
    let title = "EngageMailer - улучшите коммуникацию с лидами";
    let description = "EngageMailer - инструмент для автоматизированной email-рассылки, CRM и эффективной работы с клиентами.";
    onMount(() => {
        console.log("Главная страница загружена");
    });
    function handleSubmit() {
        goto('/settings');
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

<div class="general_container">
    <h1>
        EngageMailer
        <span>Alpha</span>
        <div class="icon_container">
            <AgentGreen/>
            <img src="/types_of_mail/outlook_black.svg" alt="outlook service">
            <img src="/types_of_mail/gmail_black.svg" alt="gmail service">
            <img src="/types_of_mail/yandex_black.svg" alt="yandex service">
        </div>
    </h1>
    <p>Введите секретный ключ</p>
    <form on:submit|preventDefault={handleSubmit}>
        <input
          type="password"
          placeholder="Ввести ключ"
          bind:value={secretKey}
        />

        <div class="buttons">
            <button type="submit" class="login_btn">Войти</button>
            <a href="https://t.me/sinorp" class="link" target="_blank">запросить доступ</a>
            <a href="https://t.me/sharpsss" class="link" target="_blank">поддержка</a>
        </div>
    </form>

</div>
