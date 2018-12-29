import React, { useState, useEffect, useContext } from 'react';
import {
  format, isBefore, isAfter, isValid, isWithinRange,
} from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import {
  Parent,
  Child,
  Ancestor,
  Tile,
} from './helpers';

const SailingItem = React.memo((props) => {
  const { title, value } = props;
  return (
    <div className="">
      <p className="heading">{title}</p>
      <p className="">{value}</p>
    </div>
  );
});


const CardContent = React.memo((props) => {
  const {
    percentFull, actualDeparture, eta, sailingStatus
  } = props;
  return (
    <div className="card-content">
      <Ancestor>
        <Tile className="is-vertical">
          <Parent>
            <Child className="level is-mobile">
              {percentFull && <SailingItem title="Full" value={`${percentFull}%`} />}
              {actualDeparture && <SailingItem title="Departure" value={format(actualDeparture, 'HH:mm')} />}
              {eta && <SailingItem title="Arrival" value={format(eta, 'HH:mm')} />}
            </Child>
          </Parent>

          <Parent>
            <Child>
              {sailingStatus && <SailingItem title="Status" value={sailingStatus} />}
            </Child>
          </Parent>
        </Tile>
      </Ancestor>
    </div>);
});
// const PercentageIndicator = (props) => {
//   const {
//     scheduledDeparture, actualDeparture, eta, completed, setCompleted, time, loading,
//   } = props;

//   const [percentage, setPercentage] = useState(0);
//   useEffect(() => {
//     if (!completed) {
//       if (isBefore(time, new Date(scheduledDeparture))) return;

//       if (eta && isAfter(time, new Date(eta))) { setCompleted(true); }

//       if (eta && actualDeparture) {
//         const timeElapsed = time - new Date(actualDeparture);
//         const totalTime = new Date(eta) - new Date(actualDeparture);
//         const p = timeElapsed / totalTime;

//         // console.log(timeElapsed, totalTime, p)

//         p > 1 ? setPercentage(1) : setPercentage(p.toFixed(2));
//       }
//     }
//   }, [time]);

//   return <div>{percentage}</div>;
// };

const Cancelled = () => <div className="tag is-danger">Cancelled</div>;
const Delayed = () => <FontAwesomeIcon icon="exclamation-triangle" className="has-text-warning" />;
const Current = () => <div className="tag is-primary">In Progress</div>;

const Sailing = React.memo((props) => {
  const {
    scheduledDeparture = null, actualDeparture = null, eta = null, sailingStatus, time, percentFull,
  } = props;
  console.log('sailing', props);

  const [open, toggleOpen] = useState(true);
  const [completed, setCompleted] = useState(false);
  useEffect(() => {
    if (!completed && eta && isAfter(time, new Date(eta))) {
      setCompleted(true);
      // console.log(eta);
    }
  }, [time]);

  const isDelayed = !['On Time', 'Cancelled', '', null, undefined].includes(sailingStatus);

  // TODO: Waiting on deploy of fix in backend
  // const isCurrent = !['Cancelled', '', null, undefined].includes(sailingStatus) && isWithinRange(new Date(), new Date(actualDeparture), new Date(eta));

  const headerClasses = classNames({
    'card-header': true,
    'has-text-grey-lighter': completed,
    level: true,
    // 'has-text-danger': sailingStatus === 'Cancelled',
  });
  const headerTitleClasses = classNames({
    'card-header-title': true,
    'has-text-grey-lighter': completed,
    // 'has-text-danger': sailingStatus === 'Cancelled',
  });
  // <PercentageIndicator {...props} completed={completed} setCompleted={setCompleted} loading={loading}/>

  return (
    <div className="card">
      <div className={headerClasses} onClick={() => toggleOpen(!open)}>
        <p className={headerTitleClasses}>
          {format(scheduledDeparture, 'HH:mm')}
          &nbsp;
          {/* TODO: Waiting on deploy of fix in backend */}
          {/* {isCurrent && <Current />} */}
        </p>
        {sailingStatus === 'Cancelled' && <Cancelled />}
        {isDelayed && <Delayed />}
        <div className="card-header-icon" aria-label="more options">
          <span className="icon">
            {open ? <FontAwesomeIcon icon="angle-down" /> : <FontAwesomeIcon icon="angle-right" />}
          </span>
        </div>
      </div>
      {open
        && <CardContent percentFull={percentFull} actualDeparture={actualDeparture} eta={eta} sailingStatus={sailingStatus} />}
    </div>
  );
});

export default Sailing;
