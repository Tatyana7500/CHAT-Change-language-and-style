import SettingLanguage from '../common/languageDropdown/LanguageDropdown.jsx';
import util from '../../utils/requestHelper';
import constants from '../../../constants';
import React from 'react';

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
        const { translate, defaultCountry, changeLanguage } = this.props;

        return (
            <div>
                <div className='header__settings'>
                    <SettingLanguage
                        defaultCountry={defaultCountry}
                        changeLanguage={changeLanguage}
                    />
                </div>
                <div className='login-wrapper signin'>
                    <div className='buttons'>
                        <a
                            href='/login'
                            id='singin_loginBtn'
                            className='btn buttons__btn'>
                            {translate('login')}
                        </a>
                        <a
                            href='/signIn'
                            id='singin_singInBtn'
                            className='btn buttons__btn buttons__btn  buttons__btn_active'>
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
                            type='text'
                            maxLength='25'
                            ref={this.emailInputRef}
                            id='singinPageEmailInput'
                            className='login-form__input'
                            placeholder={translate('eMail')}
                        />
                        <label
                            name='name'
                            htmlFor='singinPageNameInput'
                            className='login-form__label' >{translate('name')}
                        </label>
                        <input
                            type='text'
                            maxLength='16'
                            ref={this.nameInputRef}
                            id='singinPageNameInput'
                            className='login-form__input'
                            placeholder={translate('name')}
                        />
                        <label
                            name='password'
                            htmlFor='loginPagePasswordInput'
                            className='login-form__label' >{translate('yourPassword')}
                        </label>
                        <input
                            maxLength='16'
                            type='password'
                            ref={this.passwordInputRef}
                            id='singinPagePasswordInput'
                            className='login-form__input'
                            placeholder={translate('password')}
                        />
                        <label
                            name='confirmPassword'
                            htmlFor='singinPageComfirmPasswordInput'
                            className='login-form__label' >{translate('confirmPassword')}
                        </label>
                        <input
                            maxLength='16'
                            type='password'
                            className='login-form__input'
                            id='singinPageComfirmPasswordInput'
                            placeholder={translate('confirmPassword')}
                        />
                        <input
                            type='submit'
                            id='regAccount'
                            value={translate('signIn')}
                            className='btn login-form__btn'
                            onClick={this.submitSignInForm}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default SignIn;