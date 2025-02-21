<script>
	import { page } from '$app/state';
	import Header from '$lib/components/Header.svelte';
	import "$lib/styles/reset.css"
	import "$lib/styles/default.css"
	import Footer from '$lib/components/Footer.svelte';
	import NotFound from '$lib/components/NotFound.svelte';
</script>

{#if page.status !== 404 && page.url.pathname !== '/'}
	<Header />
{/if}

{#if page.status === 404}
	<NotFound />
{:else}
	<slot />
{/if}

{#if page.status !== 404 && page.url.pathname !== '/'}
	<Footer />
{/if}