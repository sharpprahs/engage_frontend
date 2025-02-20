<script>
	import { page } from '$app/state';
	import Header from '$lib/components/Header.svelte';
	import "$lib/styles/reset.css"
	import "$lib/styles/default.css"
	import Footer from '$lib/components/Footer.svelte';
</script>

{#if page.url.pathname!== '/'}
	<Header />
{/if}

<slot />

{#if page.url.pathname !== '/'}
	<Footer />
{/if}
