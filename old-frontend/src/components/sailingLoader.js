import React from 'react'
import styles from '../css/loader.module.css';

const SailingPlaceholder = () => (
    <div className="pb-8">
      <div className={styles.animatedbackground}>
        <div className={styles.etaleft} />
        <div className={styles.etaright} />
        <div className={styles.splitone} />
        <div className={styles.statusleft} />
        <div className={styles.statusright} />
      </div>
    </div>
  );
  
   const SailingsLoader = () => (
    <>
      <h2 className="mb-4 text-xl font-semibold text-white antialiased ">
        Sailings
      </h2>
      <div className="p-4 bg-white rounded-lg ">
        <SailingPlaceholder />
        <SailingPlaceholder />
        <SailingPlaceholder />
      </div>
    </>
  );
  
  export default SailingsLoader