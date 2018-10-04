import { format } from 'date-fns';
const formatSailingTime = time =>
  time ? format(new Date(time).getTime(), 'HH:mm') : time;
export default props => (
  <div>
    <h2>
      {formatSailingTime(props.scheduledDeparture)} - {props.sailingStatus}
    </h2>
    <h3>{props.vessel}</h3>
    <h3>Actual Departure: {formatSailingTime(props.actualDeparture)}</h3>
    <h3>ETA: {formatSailingTime(props.eta)}</h3>
    <h3 />
  </div>
);
