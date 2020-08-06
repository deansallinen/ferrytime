import React from 'react';
import { format } from 'date-fns';
import SailingStatus from './sailingStatus';

const PercentFull = ({ percent_full }) =>
  percent_full && (
    <div className="text-xs">
      <span className="font-bold">{percent_full}</span>% full
    </div>
  );

const ETA = ({ eta, actual_departure }) => (
  <div className="">
    <div className="text-xs">
      {actual_departure && format(actual_departure, 'H:mm')}
      {(actual_departure || eta) && <>&nbsp;&rarr;&nbsp;</>}
      {eta && format(eta, 'H:mm')}
    </div>
  </div>
);

const ScheduledDeparture = ({ scheduled_departure }) => (
  <div className="text-xl md:text-3xl font-bold bg-white rounded-lg md:pl-2">
    {format(scheduled_departure, 'H:mm')}
  </div>
);

const Sailing = ({ sailing }) => {
  const {
    scheduled_departure,
    actual_departure,
    eta,
    percent_full,
    sailing_status,
    vessel,
  } = sailing;
  const isDelayed = !['On Time', 'Cancelled', '', null, undefined].includes(
    sailing_status
  );

  // const isCurrent = ({ sailing_status, eta, actual_departure }) =>
  //   eta &&
  //   actual_departure &&
  //   !['Cancelled', '', null, undefined].includes(sailing_status) &&
  //   isWithinRange(new Date(), new Date(actual_departure), new Date(eta));

  return (
    <div className="flex mb-4 bg-white rounded-lg py-4 px-4 shadow">
      <div className="w-10 md:w-24">
        <ScheduledDeparture scheduled_departure={scheduled_departure} />
      </div>

      <div className="flex-1 ml-4 pl-4 leading-normal">
        <div className="float-right">
          <SailingStatus sailing_status={sailing_status} />
        </div>
        <PercentFull percent_full={percent_full} />
        <div className="text-xs">
          {isDelayed && <div>{sailing_status}</div>}
          {vessel}
        </div>
        <ETA eta={eta} actual_departure={actual_departure} />
      </div>
    </div>
  );
};

export default Sailing;
