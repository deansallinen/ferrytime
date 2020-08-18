<script>
  import { parseISO, format } from "date-fns";
  import SailingStatus from "./SailingStatus.svelte";
  export let scheduled_departure;
  export let actual_departure;
  export let eta = "";
  export let sailing_status = "";
  export let vessel = "";

  function formatTime(time) {
    try {
      return format(parseISO(time), "H:mm");
    } catch (error) {
      console.log(error);
    }
  }
</script>

<div class="flex mb-4 bg-white rounded-lg py-4 px-4 shadow">
  <div class="w-10 md:w-24">
    <div class="text-xl md:text-3xl font-bold bg-white rounded-lg md:pl-2">
      {formatTime(scheduled_departure)}
    </div>
  </div>

  <div class="flex-1 ml-4 pl-4 leading-normal">
    <div class="float-right" id="sailing-status">
      <SailingStatus {sailing_status} />

    </div>
    <div class="text-xs" id="percent-full" />
    <div class="text-xs" id="vessel">{vessel}</div>
    <div class="">
      <div class="text-xs">
        {formatTime(actual_departure)} to {formatTime(eta)}
      </div>
    </div>
  </div>
</div>
