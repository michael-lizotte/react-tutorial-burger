import React from 'react';

import './MenuButton.css';
import Icon from '../../../../assets/images/menu-icon.png';

const menu = (props) => (
    <div className="MenuButton">
        <img src={Icon} onClick={props.clicked} alt="Burger Builder"/>
    </div>
);

export default menu;