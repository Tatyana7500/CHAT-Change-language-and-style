import React from 'react';
import constants from '../../server/Constants';
import util from '../util';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.nameInputRef = React.createRef();
        this.emailInputRef = React.createRef();
        this.passwordInputRef = React.createRef();
        this.state = {
            name: '',
            email: '',
            password: '',
        };
    }

    submitSignInForm = async () => {
        await this.setState({
            name: this.nameInputRef.current.value,
            email: this.emailInputRef.current.value,
            password: this.passwordInputRef.current.value,
        });
        await util.sendPostRequest(`${constants.LOCALHOST}/signin`, this.state);
        util.goToLogin();
    };

    render() {
        return (
            <div className='login-wrapper signin'>
                <div className='buttons'>
                    <a
                        id='singin_loginBtn'
                        href='/login'
                        className='btn buttons__btn'>
                        Log in
                    </a>
                    <a
                        id='singin_singInBtn'
                        href='/signIn'
                        className='btn buttons__btn buttons__btn  buttons__btn_active'>
                        Sign in
                    </a>
                </div>
                <div className='login-form'>
                    <input
                        id='singinPageEmailInput'
                        ref={this.emailInputRef}
                        type='text'
                        className='login-form__input'
                        maxLength='25'
                        placeholder='E-mail'
                    />
                    <input
                        id='singinPageNameInput'
                        ref={this.nameInputRef}
                        type='text'
                        className='login-form__input'
                        maxLength='16'
                        placeholder='Name'
                    />
                    <input
                        id='singinPagePasswordInput'
                        ref={this.passwordInputRef}
                        type='password'
                        className='login-form__input'
                        maxLength='16'
                        placeholder='Password'
                    />
                    <input
                        id='singinPageComfirmPasswordInput'
                        type='password'
                        className='login-form__input'
                        maxLength='16'
                        placeholder='ComfirmPassword'
                    />
                    <input
                        id='regAccount'
                        onClick={this.submitSignInForm}
                        type='submit'
                        value='sing in'
                        className='btn login-form__btn'
                    />
                </div>
            </div>
        );
    }
}

export default SignIn;