import React, { Component } from 'react';
import constants from '../../server/constants';
import util from '../util';
import './style.css';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.emailInputRef = React.createRef();
        this.passwordInputRef = React.createRef();
        this.state = {
            emailInput: '',
            passwordInput: '',
        };
    }

    submitLoginForm = async () => {
        await this.setState({
            emailInput: this.emailInputRef.current.value,
            passwordInput: this.passwordInputRef.current.value,
        });
        const data = await util.sendPostRequest(`${constants.LOCALHOST}/auth`, this.state);
        
        await util.setToLocalStorage(await data.json());
    };

    render() {
        return (
            <div className='login-wrapper'>
                <div className='buttons'>
                    <a 
                        id='loginBtn'
                        href='/login'
                        className='btn buttons__btn buttons__btn_active'>login
                    </a>
                    <a 
                        id='singInBtn'
                        href='/signIn'
                        className='btn buttons__btn buttons__btn'>sing in
                    </a>
                </div>
                <div className='login-form'>
                    <label 
                        name='Email'
                        htmlFor='loginPageEmailInput'
                        className='login-form__label'>Your e-mail
                    </label>
                    <input 
                        id='loginPageEmailInput'
                        ref={this.emailInputRef}
                        type='text'
                        required
                        maxLength='16'
                        className='login-form__input'
                        placeholder='E-mail'
                    />
                    <label 
                        name='password'
                        htmlFor='loginPagePasswordInput'
                        className='login-form__label' >Your Password
                    </label>
                    <input 
                        id='loginPagePasswordInput'
                        ref={this.passwordInputRef}
                        type='password'
                        required
                        className='login-form__input'
                        maxLength='16'
                        placeholder='Password'
                    />
                    <input 
                        id='enterAccount'
                        type='submit'
                        value='login'
                        onClick={this.submitLoginForm}
                        className='btn login-form__btn'
                    />
                </div>
            </div>
        );
    }
}