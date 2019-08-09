import React, { useState } from 'react';
import Sailing from '../components/Sailing/sailing';

const SailingsList = ({ sailings }) => {
  const [showCompleted, setShowCompleted] = useState(true);
  const toggleShowCompleted = () => setShowCompleted(!showCompleted);

  return (
    <div className="">
      <div className="flex justify-between items-baseline">
        <h2 className="mb-4 text-xl font-semibold text-white antialiased ">
          Sailings
        </h2>
        {showCompleted ? (
          <button
            className="hover:bg-blue-dark text-xs text-white antialiased rounded px-2 py-2"
            onClick={toggleShowCompleted}
          >
            Hide completed
          </button>
        ) : (
          <button
            className="hover:bg-blue-dark text-xs text-white antialiased rounded px-2 py-2"
            onClick={toggleShowCompleted}
          >
            Show completed
          </button>
        )}
      </div>
      <div className="">
        {showCompleted
          ? sailings.map(sailing => (
              <Sailing sailing={sailing} key={sailing.id} />
            ))
          : sailings
              .filter(sailing => {
                return !(new Date(sailing.eta) < new Date()) || !sailing.eta;
              })
              .map(sailing => <Sailing sailing={sailing} key={sailing.id} />)}
      </div>
    </div>
  );
};

export default SailingsList;
