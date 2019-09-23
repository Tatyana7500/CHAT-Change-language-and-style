import SettingLanguage from '../common/languageDropdown/LanguageDropdown.jsx';
import util from '../../utils/requestHelper';
import React, { Component } from 'react';
import constants from '../../../constants';
import logic from './logic';
import '../../theme/index.css';

class Login extends Component {
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
        
        await logic.setToLocalStorage(await data.json());
        window.location.href = '/main';
    };

    render() {
        const { translate, defaultCountry, changeLanguage } = this.props;

        return (
            <div>
            <div className='header__settings'>
                <SettingLanguage
                    defaultCountry={defaultCountry}
                    changeLanguage={changeLanguage}
                />
            </div>
                <div className='login-wrapper'>
                    <div className='buttons'>
                        <a
                            id='loginBtn'
                            href='/login'
                            className='btn buttons__btn'>
                            {translate('login')}
                        </a>
                        <a
                            id='singInBtn'
                            href='/signIn'
                            className='btn buttons__btn buttons__btn_active'>
                            {translate('signIn')}
                        </a>
                    </div>
                    <div className='login-form'>
                        <label
                            name='Email'
                            htmlFor='loginPageEmailInput'
                            className='login-form__label'>
                            {translate('yourEmail')}
                        </label>
                        <input
                            required
                            type='text'
                            maxLength='16'
                            id='loginPageEmailInput'
                            ref={this.emailInputRef}
                            className='login-form__input'
                            placeholder={translate('eMail')}
                        />
                        <label
                            name='password'
                            htmlFor='loginPagePasswordInput'
                            className='login-form__label' >{translate('yourPassword')}
                        </label>
                        <input
                            required
                            maxLength='16'
                            type='password'
                            id='loginPagePasswordInput'
                            ref={this.passwordInputRef}
                            className='login-form__input'
                            placeholder={translate('password')}
                        />
                        <input
                            type='submit'
                            id='enterAccount'
                            value={translate('login')}
                            onClick={this.submitLoginForm}
                            className='btn login-form__btn'
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;