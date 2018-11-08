import React, { Component } from 'react';

import './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    onSideDrawerClosed = () => {
        this.setState({showSideDrawer: false});
    }               

    onSideDrawerOpened = () => {
        this.setState({showSideDrawer: true});
    }

    render() {
        return (
            <>
                <Toolbar clicked={this.onSideDrawerOpened}/>
                <SideDrawer show={this.state.showSideDrawer} clicked={this.onSideDrawerClosed}/>
                <main className="Content">
                    {this.props.children}
                </main>
            </>
        );
    }
}

export default Layout;