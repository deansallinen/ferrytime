<script>
  import data from '../sailings.json';
  import Route from './Route.svelte';

  let selected = "";
  $: route = data.filter(route => route.route_name === selected)[0];
</script>

<svelte:head>
	<title>Ferrytime</title>
</svelte:head>

<ul>
  {#each data as route} 
    <li on:click={(e) => selected = route.route_name }>{route.route_name}</li>
  {/each}
</ul>

<Route {...route} /> 
