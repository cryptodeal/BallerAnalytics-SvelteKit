<script>
  import { page, navigating } from '$app/stores';
  import Nav from '$lib/Nav.svelte'
  import Notifications from 'svelte-notifications';
	import PreloadingIndicator from '$lib/PreloadingIndicator.svelte';
  
  import Logo2 from '../../static/title.png?w=300;400;500&format=webp&srcset'

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
  .logo-container {
		width: 100%;
  }
  :global(.cool) {
    object-fit: contain;
  }
</style>

<Notifications>
  <div class='logo-container'>
      <img class='cool' srcset={Logo2} type="image/webp" alt="testattribute"/>
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

