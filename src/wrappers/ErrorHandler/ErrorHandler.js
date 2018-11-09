import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';

/**
 * This wrapper intercepts errors from an Axios instance and output
 * the error message on a Modal interface
 * 
 * @param {*} WrappedComponent The component to be wrapped 
 *  ex: export default ErrorHandler(MyComponent)
 * @param {*} axios The axios from which errors will be handled
 */
const errorHandler = ( WrappedComponent, axios ) => {
    return class extends Component {
        state = {
            error: null
        }

        componentDidMount() {
            axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            })
            axios.interceptors.response.use(res => res, err => {
                this.setState({error: err})
            });
        }

        onClickedHandler = () => {
            this.setState({error: null});
        }

        render() {
            return (
                <>
                    <Modal show={this.state.error}
                            modalClosed={this.onClickedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </>
            );
        }        
    }
};

export default errorHandler;