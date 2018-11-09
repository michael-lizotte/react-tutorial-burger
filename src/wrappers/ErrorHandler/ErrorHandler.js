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

        /**
         * Since the child components use internet requests in their componentDidMount,
         * the componentDidMount of ErrorHandler will be called AFTER his child's.
         * 
         * (reminder -> lifecycle hook:
         *  1.constructor
         *  2.componentWillMount
         *  3.render
         *  4.render child component <---
         *  5.componentDidMount)
         * 
         *  Because of that, we are using componentWillMount instead
         */
        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            })
            this.resInterceptor = axios.interceptors.response.use(res => res, err => {
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

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);            
        }
    }
};

export default errorHandler;