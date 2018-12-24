import React from 'react';

import './SideDrawer.css';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    let classes = ["SideDrawer", "Close"];
    if(props.show) {
        classes.pop();
        classes.push("Open");
    }
    return (
        <>
            <Backdrop show={props.show} clicked={props.clicked}/>
            <div className={classes.join(' ')} onClick={props.clicked}>
                <Logo className="Logo"/>
                <nav>
                    <NavigationItems isAuth={props.isAuth}/>
                </nav>
            </div>
        </>
    );
};

export default sideDrawer;