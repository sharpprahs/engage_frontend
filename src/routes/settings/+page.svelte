<script>
    import "./settings.css";
    let title = "EngageMailer - настройки";
    let description = "EngageMailer - настройки";
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

<section id="section_setting">
    <div class="settings_card">
        <h2>общие настройки</h2>
        <p>общие настройки системы</p>
        <div class="settings_panel">
           <div class="settings_panel_element">
               <label for="max_lead">max_lead</label>
               <input type="number" id="max_lead" placeholder="10" value="10">
           </div>
            <div class="settings_panel_element">
                <label for="proxy_range">proxy_range</label>
                <input type="number" id="proxy_range" placeholder="10" value="10">
            </div>
            <div class="settings_panel_element">
                <label for="proxy_min_speed">proxy_min_speed</label>
                <input type="number" id="proxy_min_speed" placeholder="10" value="10">
            </div>
            <div class="settings_panel_element">
                <label for="send_time_interval">send_time_interval</label>
                <input type="number" id="send_time_interval" placeholder="10" value="10">
                <span>———</span>
                <input type="number" id="send_time_interval" placeholder="10" value="10">
            </div>
          <button type="submit" class="saved_btn">сохранить</button>
        </div>
    </div>

  <div class="description_container">
   <div class="description_content">
   <h3>max_lead</h3>
     <p>Максимально возможное количество новых диалогов за 1 день для одного аккаунта любой группы аккаунтов</p>
   </div>
    <div class="description_content">
      <h3>proxy_range</h3>
      <p>Количество выводов, привязанных к 1 ip-адресу, в настоящее время с 1 ip-адреса может быть записано 100 выводов</p>
    </div>
    <div class="description_content">
      <h3>send_time_interval</h3>
      <p>Это значение является временным интервалом между параллельной отправкой приветственных сообщений, т.е. после отправки сообщения берется случайный интервал времени от 2 до 8 минут, и следующая отправка приветственного сообщения от следующего аккаунта основывается на значениях интервала.</p>
    </div>
    <div class="description_content">
      <h3>proxy_min_speed</h3>
      <p>Минимальная скорость прокси-сервера в настоящее время определена таким образом, что прокси-серверы со скоростью менее 20 мегабит в секунду будут считаться непригодными для использования.</p>
    </div>
  </div>

</section>