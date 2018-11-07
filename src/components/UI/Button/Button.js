import React from 'react';

import './Button.css';

const button = (props) => {
    let classes = [];
    classes.push("Button");

    classes.push(props.bntType);

    return <button
        className={classes.join(' ')}
        onClick={props.clicked}>{props.children}</button>
};

export default button;