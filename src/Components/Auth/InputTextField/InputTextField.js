import React from 'react';
import styles from './InputTextField.module.css';

const InputTextField = (props) => {
    return (
        <input className={styles.InputTextField}  {...props} />
    );
};

export default InputTextField;