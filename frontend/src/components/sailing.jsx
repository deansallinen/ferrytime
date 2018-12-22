import React, { useState, useEffect, useContext } from 'react';
import { format, isBefore, isAfter, isValid } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import {
  Parent,
  Child,
  Ancestor,
  Tile,
} from './helpers';

const SailingItem = (props) => {
  const { title, value } = props;
  return (
    <div className="">
      <p className="heading">{title}</p>
      <p className="">{format(value, 'HH:mm')}</p>
    </div>
  );
});

const PercentageIndicator = (props) => {
  const { scheduledDeparture, actualDeparture, eta, completed, setCompleted, time, loading } = props;

  const [percentage, setPercentage] = useState(0)
  useEffect(() => {
    if (!completed) {
      if (isBefore(time, new Date(scheduledDeparture))) return;

      if (eta && isAfter(time, new Date(eta))) { setCompleted(true); }

      if (eta && actualDeparture) {
        const timeElapsed = time - new Date(actualDeparture)
        const totalTime = new Date(eta) - new Date(actualDeparture)
        const p = timeElapsed / totalTime

        // console.log(timeElapsed, totalTime, p)

        p > 1 ? setPercentage(1) : setPercentage(p.toFixed(2))
      }
    }
  }, [time])

  return <div>{percentage}</div>

}


const Sailing = React.memo((props) => {
  const { scheduledDeparture = null, actualDeparture = null, eta = null, sailingStatus, time, loading } = props;

  const [open, toggleOpen] = useState(false);
  const [completed, setCompleted] = useState(false);
  useEffect(() => {
    if (!completed && eta && isAfter(time, new Date(eta))) {
      setCompleted(true);
    }
  }, [time])

  const Cancelled = () => <div className="tag is-danger">Cancelled</div>;
  const Delayed = () => <FontAwesomeIcon icon="exclamation-triangle" className="has-text-warning" />;

  const headerClasses = classNames({
    'card-header': true,
    "has-text-grey-lighter": completed,
    level: true,
    // 'has-text-danger': sailingStatus === 'Cancelled',
  });
  const headerTitleClasses = classNames({
    'card-header-title': true,
    "has-text-grey-lighter": completed,
    // 'has-text-danger': sailingStatus === 'Cancelled',
  });
  // <PercentageIndicator {...props} completed={completed} setCompleted={setCompleted} loading={loading}/>

  return (
    <div className="card">
      <div className={headerClasses} onClick={() => toggleOpen(!open)}>
        <p className={headerTitleClasses}>
          {format(scheduledDeparture, 'HH:mm')}
        </p>
        {sailingStatus === 'Cancelled' && <Cancelled />}
        {!['On Time', 'Cancelled', '', null, undefined].includes(sailingStatus) && <Delayed />}
        <div className="card-header-icon" aria-label="more options">
          <span className="icon">
            {open ? <FontAwesomeIcon icon="angle-down" /> : <FontAwesomeIcon icon="angle-right" />}
          </span>
        </div>
      </div>
      {open &&
        (<div className="card-content" style={props}>
          <Ancestor>
            <Tile className="is-vertical">
              <Parent>
                <Child className="level is-mobile">
                  {actualDeparture && <SailingItem title="Departure" value={actualDeparture} />}
                  {eta && <SailingItem title="Arrival" value={eta} />}
                </Child>
              </Parent>

              <Parent>
                <Child>
                  {sailingStatus &&
                    <div>
                      <div className="heading">Status</div>
                      <p>{sailingStatus}</p>
                    </div>
                  }
                </Child>
              </Parent>
            </Tile>
          </Ancestor>
        </div>)
      }
    </div>
  );
})

export default Sailing;
