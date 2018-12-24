import React, { Component } from 'react';
import { connect } from 'react-redux';

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
                <Toolbar 
                    clicked={this.onSideDrawerOpened}
                    isAuth={this.props.isAuthenticated}/>
                <SideDrawer 
                    show={this.state.showSideDrawer} 
                    clicked={this.onSideDrawerClosed}
                    isAuth={this.props.isAuthenticated}/>
                <main className="Content">
                    {this.props.children}
                </main>
            </>
        );
    }
}

const mapState = state => {
    return {
        isAuthenticated: state.auth.userId !== null
    }
}

export default connect(mapState)(Layout);