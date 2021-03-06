import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Input from '../../component/UI/Input/Input';
import Spinner from '../../component/UI/Spinner/Spinner';
import * as actions from '../../Store/action/index';
import classes from './Auth.module.css';

class Auth extends Component{

    state = {
        controls:{
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 4,
                    maxLength: 20
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true
    }

    componentDidMount(){
        if(!this.props.building && this.props.authRedirectPath !== '/')
        {
            this.props.onSetAuthRedirectPath();
        }
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true

            }
        };
       
        this.setState({controls: updatedControls});
    }

    submitHandler  = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return{
                isSignup: !prevState.isSignup
            }
        })
    }

    render(){

        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementsArray.map(formElement => (
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />               
        ));

        if(this.props.loading){
            form = <Spinner />
        }

        let errorMessage = null;

        if(this.props.error){
            errorMessage = (
                <div className="alert alert-danger alert-dismissible">
                    <a href="/#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                    <strong>{this.props.error.message} </strong>
                </div>
            );
        }

        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to= {this.props.authRedirectPath} />
        }

        return(
            <div className = {classes.Auth}>
                {authRedirect}
                <h4 className = "text-center "> Authentication </h4>
                {errorMessage}
                <form onSubmit = {this.submitHandler}>
                    {form}
                    <button className = "btn btn-success"> SUBMIT </button>
                </form>
                <button
                onClick  = {this.switchAuthModeHandler}
                className = "btn btn-danger mt-2">SWITCH TO {this.state.isSignup ? 'SIGN-IN' : 'SIGN-UP'}</button>
            </div>
        )
    }
}

const mapStateToprops = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        building: state.foodItems.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToprops, mapDispatchToProps)(Auth);