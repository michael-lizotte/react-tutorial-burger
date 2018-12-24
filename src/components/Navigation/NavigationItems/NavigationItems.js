import React from 'react';

import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className="NavigationItems">
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
        {props.isAuth ? 
            <NavigationItem link="/logout">Logout</NavigationItem> :
            <NavigationItem link="/auth">Authenticate</NavigationItem>}
    </ul>
);

export default navigationItems;