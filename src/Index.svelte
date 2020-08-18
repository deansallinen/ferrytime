<script>
  import IndexCard from "./IndexCard.svelte";

  export let data;
  export let changeSelected;
</script>

<h2 class="mb-4 text-xl font-semibold text-white antialiased ">All Routes</h2>

<div class="w-full">
  {#each data as route (route.route_name)}
    <IndexCard {route} {changeSelected} />
  {/each}
</div>
