import SettingLanguage from '../common/languageDropdown/LanguageDropdown.jsx';
import ErrorWindow from '../common/errorWindow/ErrorWindow';
import Modal from '../../libs/modal/Modal.jsx';
import util from '../../utils/requestHelper';
import constants from '../../../constants';
import React from 'react';
import './SignIn.css';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.nameInputRef = React.createRef();
        this.emailInputRef = React.createRef();
        this.passwordInputRef = React.createRef();
        this.confirmPasswordInputRef = React.createRef();
        this.state = {
            name: '',
            email: '',
            password: '',
            errorText: '',
            isOpenErrorWindow: false,
        };
    }

    handleHide = () => {
        this.setState({ isOpenErrorWindow: false });
    };

    submitSignInForm = async () => {
        const password = this.passwordInputRef.current.value;
        const confirmPassword = this.confirmPasswordInputRef.current.value;

        if (password === confirmPassword) {
            await this.setState({
                name: this.nameInputRef.current.value,
                email: this.emailInputRef.current.value,
                password: this.passwordInputRef.current.value,
            });

            const data = {
                name: this.nameInputRef.current.value,
                email: this.emailInputRef.current.value,
                password: this.passwordInputRef.current.value,
            };

            const response = await util.sendPost(`${constants.LOCALHOST}/signin`, data);

            if (response.status !== 200) {
                const errorText = await response.text();

                this.setState(state => ({
                    ...state,
                    errorText,
                    isOpenErrorWindow: true,
                }));
            } else {
                window.location.href = '/login';
            }
        } else {
            const errorText = 'Passwords do not match!';

            this.setState(state => ({
                ...state,
                errorText,
                isOpenErrorWindow: true,
            }));
        }
    };

    render() {
        const { translate, defaultCountry, changeLanguage } = this.props;
        const { isOpenErrorWindow, errorText } = this.state;

        return (
            <div>
                <div className='header__settings'>
                    <SettingLanguage
                        defaultCountry={defaultCountry}
                        changeLanguage={changeLanguage}
                    />
                </div>
                <div className='signin'>
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
                    <div className='signin-form'>
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
                            className='login-form__label'>{translate('name')}
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
                            className='login-form__label'>{translate('yourPassword')}
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
                            className='login-form__label'>{translate('confirmPassword')}
                        </label>
                        <input
                            maxLength='16'
                            type='password'
                            className='login-form__input'
                            ref={this.confirmPasswordInputRef}
                            id='singinPageComfirmPasswordInput'
                            placeholder={translate('confirmPassword')}
                        />
                        <input
                            type='submit'
                            id='regAccount'
                            value={translate('signIn')}
                            className='btn signin-form__btn'
                            onClick={this.submitSignInForm}
                        />
                    </div>
                </div>
                {isOpenErrorWindow ?
                    <Modal>
                        <div className='modal'>
                            <ErrorWindow
                                error={errorText}
                                handleHide={this.handleHide}
                            >
                            </ErrorWindow>
                        </div>
                    </Modal> : null
                }
            </div>
        );
    }
}

export default SignIn;