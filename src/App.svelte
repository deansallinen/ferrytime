<script>
  import { onMount } from "svelte";
  import Index from "./Index.svelte";
  import Route from "./Route.svelte";
  import Tailwind from "./Tailwind.svelte";

  let data = [];
  let selected;

  onMount(async () => {
    let res = await fetch(
      "https://raw.githubusercontent.com/deansallinen/ferrytime-action/master/sailings.json"
    );
    data = await res.json();
    console.log(`Fetched data: ${new Date()}`);
  });

  export let changeSelected = routeName => {
    selected = data.filter(route => route.route_name === routeName)[0];
    window.scrollTo(0, 0);
  };
</script>

<Tailwind />

<svelte:head>
  <title>Ferrytime</title>
</svelte:head>
<div class="flex flex-col font-sans min-h-screen text-grey-darkest bg-blue-500">

  <nav class="bg-blue antialiased">
    <div
      class="flex flex-wrap items-center justify-between max-w-xl mx-auto p-4
      md:p-8">
      <button
        class="flex items-center no-underline text-white focus:outline-none"
        on:click={changeSelected(null)}>
        <span class="font-bold text-xl tracking-tight">Ferrytime</span>
      </button>

    </div>
  </nav>
  <div class="flex flex-col flex-1 max-w-xl mx-auto px-3 py-8 md:p-8 w-full ">
    <!-- Content -->

    {#if selected}
      <Route route={selected} />
    {:else}
      <Index {data} {changeSelected} />
    {/if}

    <!-- end content -->
  </div>

  <footer class="bg-blue-500 antialiased">
    <div class="max-w-xl mx-auto p-4 md:p-8 text-sm">
      <p class="text-white text-center">
        Created by
        <a
          href="https://github.com/deansallinen/ferrytime"
          class="font-bold no-underline text-white">
          Dean Sallinen
        </a>
      </p>
    </div>
  </footer>
</div>
