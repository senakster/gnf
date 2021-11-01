import LeafletComp from 'components/ui/LeafletComp/LeafletComp.lazy';
import LeafletCompMiyawaki from 'components/ui/LeafletCompMiyawaki/LeafletCompMiyawaki';
import React from 'react';
import styles from './Map.module.scss';

const Map: React.FC<any> = ({variant}) => {
return (
  <div className={`${styles.Map} ${styles[variant]}`} data-testid="Map">
    <LeafletCompMiyawaki variant={variant}/>
  </div>
);
}
export default Map;
