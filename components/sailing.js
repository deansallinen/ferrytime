import { format } from 'date-fns';
const formatSailingTime = time =>
  time ? format(new Date(time).getTime(), 'HH:mm') : time;
export default props => (
  <div>
    <h2>
      {formatSailingTime(props.scheduledDeparture)} - {props.sailingStatus}
    </h2>
    <p>{props.vessel}</p>
    <p>Actual Departure: {formatSailingTime(props.actualDeparture)}</p>
    <p>ETA: {formatSailingTime(props.eta)}</p>
    <style jsx>{`
      div {
        // display: flex;
      }
    `}</style>
  </div>
);
