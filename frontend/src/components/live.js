import React from 'react';
import styles from '../css/live.module.css';

export default () => {
  const Dot = () => (
    <div className={`w-1 h-1 bg-white rounded-full ${styles.slide}`} />
  );
  return (
    <div className="relative">
      <div className="text-white uppercase font-bold text-xs tracking-wide pb-px">
        Live
      </div>
      <Dot />
      {/* {JSON.stringify(left)} */}
    </div>
  );
};
