import React from 'react';
import styles from './BackDrop.module.css';

const BackDrop = (props) => (
    props.show ? <div onClick={props.clicked} className={styles.BackDrop}></div> : null
);

export default BackDrop;