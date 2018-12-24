import React from 'react';

import './Toolbar.css';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import MenuButton from '../SideDrawer/MenuButton/MenuButton';

const toolbar = (props) => (
    <header className="Toolbar">
        <MenuButton clicked={props.clicked}/>
        <Logo className="Logo"/>
        <nav className="DesktopOnly">
            <NavigationItems isAuth={props.isAuth}/>
        </nav>
    </header>
);

export default toolbar;