import LeafletComp from 'components/ui/LeafletComp/LeafletComp';
import React from 'react';
import styles from './Map.module.scss';

const Map = () => (
  <div className={styles.Map} data-testid="Map">
    <LeafletComp />
  </div>
);

export default Map;
