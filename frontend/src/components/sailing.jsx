import React, { useState } from 'react';
import { format } from 'date-fns';
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
};

const Cancelled = () => (
  <div className="tag is-danger">
  Cancelled
  </div>
);

function Sailing(props) {
  const [open, toggleOpen] = useState(false);
  const {
    scheduledDeparture, actualDeparture, eta, sailingStatus,
  } = props;
  const headerClasses = classNames({
    'card-header': true,
    level: true,
    // 'has-text-danger': sailingStatus === 'Cancelled',
  });
  const headerTitleClasses = classNames({
    'card-header-title': true,
    // 'has-text-danger': sailingStatus === 'Cancelled',
  });
  return (
    <div className="card">
      <div className={headerClasses} onClick={() => toggleOpen(!open)}>
        <p className={headerTitleClasses}>
          {format(scheduledDeparture, 'HH:mm')}
        </p>
        {sailingStatus === 'Cancelled' && <Cancelled />}
        <div className="card-header-icon" aria-label="more options">
          <span className="icon">
            {open ? <FontAwesomeIcon icon="angle-down" /> : <FontAwesomeIcon icon="angle-right" />}
          </span>
        </div>
      </div>
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
