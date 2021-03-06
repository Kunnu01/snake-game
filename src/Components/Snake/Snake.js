import React from 'react';
import classes from './Snake.module.css';

const Snake = (props) => {
    const { snakeBlocks } = props;
    return (
        <div>
            {snakeBlocks.map((dot, index) => {
                const style = {
                    left: `${dot[0]}%`,
                    top: `${dot[1]}%`,
                }
                
                return (
                    <div className={classes.Snake_dot} key={index} style={style}></div>
                )
            })}
        </div>
    )
}

export default Snake;