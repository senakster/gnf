import React from 'react';
import styles from './Button.module.scss';

const Button: React.FC<any> = (props) => {
  let classNames = props.className?.join ? props.className.join(' ') : props.className;
  classNames = props.className?.map ? `${classNames} ${props.className.map((c: string) => styles[c]).join(' ')}` : classNames
  return (
    <button
    {...props}
    className={`${styles.Button} ${styles[props.variant]} ${classNames}`}
    aria-pressed="false"
    data-testid="Buttontest">
    {props.label}
  </button>
);
} 

export default Button;
