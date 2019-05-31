import React from 'react';
import styles from './Button.module.css';

const Button = (props) => {
    const { onClick, ...rest } = props;
    return (
        <div>
            <button className={styles.Button} onClick={onClick} {...rest}>
                {props.children}
            </button>
        </div>
    );
};

export default Button;