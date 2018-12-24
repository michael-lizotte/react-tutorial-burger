import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions';

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
                valid: false,
                touched: false,
                disabled: false
            }
        },
        valid: false,
        isSignup: true
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

        form[inputId].valid = this.isValid(event.target.value, form[inputId].validation, form[inputId].disabled);

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

    isValid = (value, rules, disabled) => {
        let isValid = true;

        if(!rules || disabled) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.email) {
            isValid = (/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(String(value).toLowerCase())) && isValid
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.numeric) {
            isValid = (/^\d+$/).test(value) && isValid;
        }

        if (rules.sameAs) {
            isValid = (value === rules.sameAs) && isValid;
        }

        return isValid;
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
                        valid : true,
                        disabled : !prevState.controls.passwordRetype.disabled
                    }
                },
                isSignup: !prevState.isSignup
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
                    clicked={this.switchAuthModeHandler}>SWITCH TO {!this.state.isSignup ? 'SIGNUP' : 'SIGNIN'}</Button>
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

        return (
            <div className="Auth">
                {errorMessage}
                {display}
            </div>
        );
    }
}

const mapState = state => {
    return {
        loading : state.auth.loading,
        error : state.auth.error
    }
}

const mapDispatch = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
    }
}

export default connect(mapState, mapDispatch)(Auth);