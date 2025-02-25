import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
		senderAccounts_dialogue: [
			{ label: "Mail.ru MSK", value: "mail_ru_msk_zone_1" },
			{ label: "Gmail Zone 2", value: "gmail_zone_2" },
			{ label: "Yandex Zone 3", value: "yandex_zone_3" }
		]
	};
};