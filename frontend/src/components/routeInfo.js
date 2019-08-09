import React from 'react';
import Favourite from '../components/addFavourite';

export const RouteHeader = ({ route_name }) => (
  <div className="mb-4 md:mb-8 text-white antialiased">
    <div className="mb-2">
      <h1 className="leading-none">{route_name}</h1>
    </div>
  </div>
);

const RouteInfoItem = ({ children, hidden }) => (
  <dl className={`md:mb-4 ${hidden && 'hidden'}`}>{children}</dl>
);
const RouteInfoItemTitle = ({ children }) => (
  <dt className="text-xs text-blue-lighter">{children}</dt>
);

export const RouteInfoCard = ({
  route_name,
  average_sailing,
  car_waits,
  oversize_waits,
  current_status,
  parking,
}) => {
  return (
    <div className="bg-blue-dark p-4 rounded-lg mt-4 flex md:flex-col justify-between mb-4 text-white antialiased">
      <RouteInfoItem>
        <RouteInfoItemTitle>Duration</RouteInfoItemTitle>
        <p>{average_sailing.replace(/ou|utes/g, '')}</p>
      </RouteInfoItem>
      <RouteInfoItem>
        <RouteInfoItemTitle>Car waits</RouteInfoItemTitle>
        <p className="text-right md:text-left">{car_waits || 0}</p>
      </RouteInfoItem>
      <RouteInfoItem>
        <RouteInfoItemTitle>Oversize waits</RouteInfoItemTitle>
        <p className="text-right md:text-left">{oversize_waits || 0}</p>
      </RouteInfoItem>
      <RouteInfoItem hidden>
        <RouteInfoItemTitle>Current Status</RouteInfoItemTitle>
        {current_status || null}
      </RouteInfoItem>
      <RouteInfoItem hidden>
        <RouteInfoItemTitle>Parking</RouteInfoItemTitle>
        {parking || null}
      </RouteInfoItem>
    </div>
  );
};

export const RouteInfo = props => (
  <div className="mt-4 md:mt-0 mb-8 flex flex-col">
    <div>
      <h2 className="mb-4 text-xl font-semibold text-white antialiased  md:block ">
        Route Info
      </h2>
      <RouteInfoCard {...props} />
    </div>
    <Favourite routeName={props.route_name} />
  </div>
);
