import React from 'react';
import styles from './SvgIcon.module.scss';
import sprites from '_libs/_media/img/svg-defs.svg';
import { viewboxes } from '_libs/_media/img/images.json';


const SvgIcon: React.FC<{ id: string, width?: string; height?: string}> = ({ id, height, width}) => {
  const href = `${sprites}#${id}`
  const viewbox: number[] = (viewboxes as { [id: string]: number[] })[id] || [0, 0, 100, 100]
  return (
      <svg className={styles.SvgIcon} style={{height: height || '100%', width: width || '100%'}}
        viewBox={`${viewbox[0]} ${viewbox[1] } ${ viewbox[2] } ${ viewbox[3] }`}
      >
        <use xlinkHref={href} />
      </svg>
  )
}

export default SvgIcon;
