<script>
  import Sailing from './Sailing.svelte';

  export let route_name = "";
  export let average_sailing = "";
  export let sailing_date = "";
  export let sailings = {};
</script>

<svelte:head>
	<title>Ferrytime</title>
</svelte:head>

<h1>{route_name}</h1>
<h2>{average_sailing}</h2>

{#each Object.values(sailings) as sailing}
  <Sailing {...sailing} />
{/each}

<pre>{sailings}</pre>
