import React, { useState } from 'react';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
};

function Sailing(props) {
  const [open, toggleOpen] = useState(false);
  const {
    scheduledDeparture, actualDeparture, eta, sailingStatus,
  } = props;
  return (
    <div className="card">
      {sailingStatus === 'Cancelled' ? (
        <div className="card-header has-text-danger" onClick={() => toggleOpen(!open)}>
          <p className="card-header-title has-text-danger">
            {format(scheduledDeparture, 'HH:mm')}
          </p>
          <div className="card-header-icon" aria-label="more options">
            {sailingStatus}
          </div>
        </div>) : (
          <div className="card-header" onClick={() => toggleOpen(!open)}>
            <p className="card-header-title">
              {format(scheduledDeparture, 'HH:mm')}
            </p>
            <div className="card-header-icon" aria-label="more options">
              <span className="icon">
                {open ? <FontAwesomeIcon icon="angle-down" /> : <FontAwesomeIcon icon="angle-right" />}
              </span>
            </div>
          </div>
      )}
      {open
        ? (
          <div className="card-content">
            <Ancestor>
              <Tile className="is-vertical">
                <Parent>
                  <Child className="level is-mobile">

                    <div>
                      {actualDeparture ? (
                        <SailingItem title="Departure" value={actualDeparture} />
                      ) : null}

                    </div>

                    <div>
                      {eta ? <SailingItem title="Arrival" value={eta} /> : null}

                    </div>
                  </Child>
                </Parent>

                <Parent>
                  <Child>
                    <div>
                      <div className="heading">Status</div>
                      <p>{sailingStatus}</p>
                    </div>

                  </Child>
                </Parent>
              </Tile>
            </Ancestor>
          </div>
        )
        : null}
    </div>
  );
}

export default Sailing;
