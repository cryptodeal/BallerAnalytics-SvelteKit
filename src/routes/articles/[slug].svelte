<script context="module">
  export async function load({ page, fetch }) {
		const url = `http://localhost:8000/api/articles/${page.params.slug}`;
		const res = await fetch(url, {
      mode: 'cors',
      credentials: 'include',
    });
    const data = await res.json()

		if (res.ok) {
			return {
				props: {
					post: data[0]
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>
<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">

<script>
  import dayjs from 'dayjs'
	export let post;
</script>

<style>
	/*
		By default, CSS is locally scoped to the component,
		and any unused styles are dead-code-eliminated.
		In this page, Svelte can't know which elements are
		going to appear inside the {{{post.html}}} block,
		so we have to use the :global(...) modifier to target
		all elements inside .content
	*/
	.content :global(h2) {
		font-size: 1.4em;
		font-weight: 500;
	}

	.content :global(pre) {
		background-color: #f9f9f9;
		box-shadow: inset 1px 1px 5px rgba(0,0,0,0.05);
		padding: 0.5em;
		border-radius: 2px;
		overflow-x: auto;
	}

	.content :global(pre) :global(code) {
		background-color: transparent;
		padding: 0;
	}

	.content :global(ul) {
		line-height: 1.5;
	}

	.content :global(li) {
		margin: 0 0 0.5em 0;
	}
</style>

<svelte:head>
	<title>{post.title}</title>
</svelte:head>

<h1>{post.title}</h1>
  <p style='text-muted'>Published
    {#if post.publishedDate}
      on {dayjs(post.publishedDate).format('MMM. D, YYYY')} 
    {/if}
    {#if post.categories && post.categories.length}
      in {#each post.categories as cat, j}
        {#if j == 0}
          <a href='/articles/{cat.key}'>{cat.name}</a>
        {:else}
          , <a href='/articles/{cat.key}'>{cat.name}</a>
        {/if}
      {/each}
    {/if}
    {#if post.author.length}
      by {#each post.author as aut, i}
        {#if i == 0}
          <a href='/contributors/{aut.userkey}'>{aut.email}</a>
        {:else}
          , <a href='/contributors/{aut.userkey}'>{aut.email}</a>

        {/if}
      {/each}
    {/if}
  </p>

<div class='content'>
	{#if !post.content}
		<p>No post data</p>
	{:else}
		{@html post.content.extended}
	{/if}
</div>
