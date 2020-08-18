<script>
  import SailingStatus from "./SailingStatus.svelte";
  export let route;
  export let changeSelected;

  let [departureTerminal, arrivalTerminal] = route.route_name.split(" to ");

  let latestStatus = sailings => {
    const { sailing_status } = Object.values(sailings).reduce((acc, cur) =>
      cur.actual_departure ? cur : acc
    );
    if (
      !["On Time", "Cancelled", "", null, undefined].includes(sailing_status)
    ) {
      return "Delayed";
    } else {
      return sailing_status;
    }
  };
</script>

<button
  class="text-left w-full my-2 bg-white rounded-lg px-4 py-4 shadow border-b-4
  border-blue-200 flex justify-between focus:outline-none"
  on:click={() => changeSelected(route.route_name)}>
  <div class="">
    <div class="text-grey-darkest font-bold pb-1">{departureTerminal}</div>
    <div class="text-grey-darker font-bold text-sm">
      <span class="text-xs text-grey-200 pb-1">to</span>
      {arrivalTerminal}
    </div>
  </div>
  <div class=" text-right">
    <SailingStatus sailing_status={latestStatus(route.sailings)} />
  </div>
</button>
