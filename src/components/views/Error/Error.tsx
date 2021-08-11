import React from 'react';
import styles from './Error.module.scss';

const Error = () => (
  <div className={styles.Error} data-testid="Error">
    <h1>Oh, no! The Requested ressource is not available</h1>
  </div>
);

export default Error;
