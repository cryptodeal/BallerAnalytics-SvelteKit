<script>
  import { page, navigating } from '$app/stores';
  import Nav from '$lib/Nav.svelte'
  import Image from "svelte-image/src";
  import Notifications from 'svelte-notifications';
	import PreloadingIndicator from '$lib/PreloadingIndicator.svelte';

  $: segment = $page.path.split('/')[1];
</script>
<style>
  main {
    position: relative;
    background-color: white;
    padding: 2em;
    max-width: 56em;
    margin: 0 auto;
    box-sizing: border-box;
  }
  :global(.ql-align-center) {
    text-align: center;
  }
  :global(.ql-align-justify) {
    text-align: justify;
  }
  :global(.ql-align-right) {
    text-align: right;
  }
  :global(.cool) {
    object-fit: scale-down;
  }
</style>

<Notifications>
  <div class='logo-container'>
    <Image src='title.png' alt="Tankie News Network logo"/>
  </div>
  <Nav {segment}/>

  {#if $navigating}
    <PreloadingIndicator/>
  {/if}
  {#if segment === 'admin'}
    <slot></slot>
  {:else}
    <main>
      <slot></slot>
    </main>
  {/if}
</Notifications>

