import React from 'react';
import styles from './Error.module.scss';

const Error = () => (
  <div className={styles.Error} data-testid="Error">
    <div className={`container`}>
      <div className={`content`}>
    <h1>Oh, no! The Requested ressource is not available</h1>
    </div>
    </div>

  </div>
);

export default Error;
