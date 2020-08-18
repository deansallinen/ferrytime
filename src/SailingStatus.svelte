<script>
  export let sailing_status;
</script>

<div>
  {#if sailing_status === 'cancelled'}
    <div class="bg-red-200 text-red-700 rounded font-bold text-xs px-2 py-1 ">
      <span>Cancelled</span>
    </div>
  {:else if !['On Time', 'Cancelled', '', null, undefined].includes(sailing_status)}
    <div
      class="flex items-center bg-yellow-200 text-yellow-700 font-bold text-xs
      rounded px-2 py-1 ">
      <span class="">Delayed</span>
      <!-- <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        width="1em"
        height="1em"
        class="fill-current ml-1">
        <path
          d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93
          17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9
          11V9h2v6H9v-4zm0-6h2v2H9V5z" />
      </svg> -->
    </div>
  {:else}
    <div
      class="bg-green-200 text-green-700 rounded font-bold text-xs px-2 py-1 ">
      <span>On Time</span>
    </div>
  {/if}
</div>
