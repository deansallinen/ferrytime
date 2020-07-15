<script>
  import {parseISO, format} from 'date-fns';
  export let route_name = "";
  export let scheduled_departure = "";
  export let actual_departure = "";
  export let eta = "";
  export let sailing_status = "";
  export let vessel = "";
</script>

<p>{format(parseISO(scheduled_departure), 'H:mm')}</p>
<p>{format(parseISO(actual_departure), 'H:mm')}</p>
<p>{eta}</p>
<p>{sailing_status}</p>
<p>{vessel}</p>
<br>
