import React from 'react';
import styles from './Loading.module.css';

const Loading = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loading}>
        <h1>LOADING</h1>
      </div>
    </div>
  );
};

export default Loading;
