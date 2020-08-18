<script>
  import Sailing from "./Sailing.svelte";

  export let route;
  let toggleShowCompleted;
</script>

<svelte:head>
  <title>Ferrytime</title>
</svelte:head>

<div class="mb-4 md:mb-8 text-white antialiased">
  <div class="mb-2">
    <h1 class="leading-none text-2xl font-bold">{route.route_name}</h1>
  </div>
</div>

<div className="flex md:flex-row-reverse flex-wrap">
  <aside className="w-full md:w-1/4 md:pl-4">
    <div class="mt-4 md:mt-0 mb-8 flex flex-col">
      <div>
        <h2 class="mb-4 text-xl font-semibold text-white antialiased md:block ">
          Route Info
        </h2>
        <div
          class="bg-blue-700 p-4 rounded-lg mt-4 flex md:flex-col
          justify-between mb-4 text-white antialiased">
          {route.average_sailing}
        </div>
      </div>
    </div>
  </aside>
  <section className="w-full md:w-3/4 md:pr-4">
    <div class="">
      <div class="flex justify-between items-baseline">
        <h2 class="mb-4 text-xl font-semibold text-white antialiased ">
          Sailings
        </h2>
        <button
          class="hover:bg-blue-dark text-xs text-white antialiased rounded px-2
          py-2"
          onClick={toggleShowCompleted}>
          Hide completed
        </button>
        <button
          class="hover:bg-blue-dark text-xs text-white antialiased rounded px-2
          py-2"
          onClick={toggleShowCompleted}>
          Show completed
        </button>
      </div>
      <div class="">
        {#each Object.values(route.sailings) as sailing (sailing.scheduled_departure)}
          <Sailing {...sailing} />
        {/each}

      </div>
    </div>

  </section>
</div>
