<script>
  /* import {onMount} from 'svelte'; */

  import data from '../sailings.json';

  console.log(data[0]);
  /* onMount(async () => { }); */
</script>
<style> </style>

<svelte:head>
	<title>Ferrytime</title>
</svelte:head>

<ul>
  {#each data as route} 
    <li>{route.route_name}</li>
  {/each}
</ul>

<pre>{JSON.stringify(data, null, 2)}</pre>
