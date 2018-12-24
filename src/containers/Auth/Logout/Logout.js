import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions';

class Logout extends Component {
    render() {
        return <Redirect to="/" />
    }

    componentDidMount() {
        this.props.onLogout();
    }
}

const mapDispatch = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
}

export default connect(null, mapDispatch)(Logout);
