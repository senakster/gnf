import React from 'react';
import styles from './Loading.module.scss';

const Loading: React.FC<{message?: string, variant?: string}> = ({message, variant}) => (
  <div className={`${styles.Loading} ${variant ? styles[variant] : styles.theme}`}>
    <div className={styles.textContainer}>
    <span className={styles.text}>{message || 'Indhold Hentes...'}</span>
    </div>
  </div>
);

export default Loading;
