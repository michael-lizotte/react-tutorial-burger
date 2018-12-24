import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions';
import { validate } from '../../utils/utils';

import './Auth.css';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email address',
                },
                value: '',
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                disasbled: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8,
                    sameAs: ''
                },
                valid: false,
                touched: false,
                disabled: false
            },
            passwordRetype: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password confirmation',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8,
                    sameAs: ''
                },
                valid: true,
                touched: false,
                disabled: true
            }
        },
        valid: false,
        isSignup: false
    }

    onInputChange = (event, inputId) => {
        let form = {
            ...this.state.controls,
            [inputId]: {
                ...this.state.controls[inputId],
                value: event.target.value,
                touched: true
            }
        }
        if (inputId === 'password' && this.state.controls.passwordRetype.value !== '')
            form.password.validation.sameAs = this.state.controls.passwordRetype.value
        if (inputId === 'passwordRetype')
            form.passwordRetype.validation.sameAs = this.state.controls.password.value

        form[inputId].valid = validate(event.target.value, form[inputId].validation, form[inputId].disabled);

        let isValid = true;
        for(let obj in form) {
            isValid = form[obj].valid && isValid
        }

        this.setState({
            ...this.state,
            controls: form, 
            valid: isValid
        })
    }

    

    onSubmitHandler = event => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                ...this.state,
                controls: {
                    ...this.state.controls,
                    passwordRetype : {
                        ...this.state.controls.passwordRetype,
                        disabled : !prevState.controls.passwordRetype.disabled
                    }
                },
                isSignup: !prevState.isSignup,
                valid: validate(
                    this.state.controls.passwordRetype.value, 
                    this.state.controls.passwordRetype.validation,
                    !this.state.controls.passwordRetype.disabled)
            }
        })
    }

    render() {
        const formElArray = [];
        for (let key in this.state.controls) {
            formElArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        const form = formElArray.map(formEl => {
            return !formEl.config.disabled? <Input
                key={formEl.id}
                elementType={formEl.config.elementType} 
                elementConfig={formEl.config.elementConfig}
                value={formEl.config.value}
                invalid={!formEl.config.valid}
                touched={formEl.config.touched}
                changed={(event) => this.onInputChange(event, formEl.id)}/> : null
        })

        let display = (
            <>
                <form onSubmit={this.onSubmitHandler}>
                    {form}
                    <Button 
                        btnType='Success'
                        disabled={!this.state.valid}>SUBMIT</Button>
                </form>
                <Button
                    btnType='Danger'
                    clicked={this.switchAuthModeHandler}>{this.state.isSignup ? 'Login' : 'Signup'}</Button>
            </>
        );

        if (this.props.loading) {
            display = <Spinner />
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }

        let redirect = null;
        if (this.props.isAuth) {
            /**
             * Could also store the path in the store's state
             * (more dynamic)
             */
            redirect = this.props.buildingBurger ? <Redirect to="/checkout" /> : <Redirect to="/" />
        }

        return (
            <div className="Auth">
                {redirect}
                {errorMessage}
                {display}
            </div>
        );
    }
}

const mapState = state => {
    return {
        loading : state.auth.loading,
        error : state.auth.error,
        isAuth: state.auth.token != null,
        buildingBurger: state.burgerBuilder.buildingBurger
    }
}

const mapDispatch = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
    }
}

export default connect(mapState, mapDispatch)(Auth);