<script>
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
  <p>{sailing.scheduled_departure}</p>
  <p>{sailing.actual_departure}</p>
  <p>{sailing.eta}</p>
  <p>{sailing.sailing_status}</p>
  <p>{sailing.vessel}</p>
  <pre>{JSON.stringify(sailing, null, 2)}</pre>
{/each}

<pre>{sailings}</pre>
