import React, { useState, useEffect, useContext } from 'react';
import { format, isBefore, isAfter, isValid } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import styles from './sailing.module.css'
import {Parent,Child,Ancestor,Tile} from './helpers';
import {useTime, TimeContext} from './time-context'
import { Spring, config } from 'react-spring'


const SailingItem = React.memo((props) => {
  const { title, value } = props;
  return (
    <div className="">
      <p className="heading">{title}</p>
      <p className="">{format(value, 'HH:mm')}</p>
    </div>
  );
});

const PercentageIndicator = (props) => {
  const {scheduledDeparture, actualDeparture, eta, completed, setCompleted, time, loading} = props;
  
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
  const { scheduledDeparture = null, actualDeparture = null, eta = null, sailingStatus, time, loading} = props;
  
  const [open, toggleOpen] = useState(false);
  
  const [completed, setCompleted] = useState(false);
  useEffect(() => {
    if (!completed && eta && isAfter(time, new Date(eta))) {
      setCompleted(true);
    }
  }, [time])
          // <PercentageIndicator {...props} completed={completed} setCompleted={setCompleted} loading={loading}/>
  return (
    <div className="card">
      <div
        className={`card-header ${completed ? "has-text-grey-lighter" : null}`}
        onClick={() => toggleOpen(!open)}>
        
        <p className={`card-header-title ${completed ? "has-text-grey-lighter" : null}`}>
          {format(scheduledDeparture, 'HH:mm')}
        </p>
        

        <div className="card-header-icon" aria-label="more options">
          <span className="icon">
            {open ? <FontAwesomeIcon icon="angle-down" /> : <FontAwesomeIcon icon="angle-right" />}
          </span>
        </div>
      </div>
      {  open &&
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
                  { sailingStatus &&
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
