import React from 'react'
import classes from './Food.module.css';

const Food = (props) => {
    const style = {
        left: `${props.dot[0]}%`,
        top: `${props.dot[1]}%`,
    }
    return (
        <div className={classes.Snake_food} style={style}></div>
    )
}

export default Food;