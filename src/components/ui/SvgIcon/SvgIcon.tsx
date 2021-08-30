import React from 'react';
import styles from './SvgIcon.module.scss';
import sprites from '_media/img/svg-defs.svg';
import { viewboxes } from '_media/img/images.json';


const SvgIcon: React.FC<{ id: string, width?: string; height?: string}> = ({ id }) => {
  const href = `${sprites}#${id}`
  const viewbox: number[] = (viewboxes as { [id: string]: number[] })[id] || [100, 100]
  return (
      <svg className={styles.svg}
        viewBox={`0 0 ${viewbox[0]} ${viewbox[1]}` }
      >
        <use xlinkHref={href} />
      </svg>
  )
}

export default SvgIcon;
