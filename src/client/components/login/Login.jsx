import SettingLanguage from '../common/languageDropdown/LanguageDropdown.jsx';
import ErrorWindow from '../common/errorWindow/ErrorWindow';
import Modal from '../../libs/modal/Modal.jsx';
import util from '../../utils/requestHelper';
import React, { Component } from 'react';
import constants from '../../../constants';
import PropTypes from 'prop-types';
import logic from './logic';
import './Login.css';

class Login extends Component {
    static propTypes = {
        translate: PropTypes.func.isRequired,
        defaultCountry: PropTypes.string.isRequired,
        changeLanguage: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.emailInputRef = React.createRef();
        this.passwordInputRef = React.createRef();
        this.state = {
            errorText: '',
            emailInput: '',
            passwordInput: '',
            isOpenErrorWindow: false,
        };
    }

    handleHide = () => {
        this.setState({ isOpenErrorWindow: false });
    };

    submitLoginForm = async () => {
        const email = this.emailInputRef.current.value;
        const password = this.passwordInputRef.current.value;
        const body = {
            emailInput: email,
            passwordInput: password,
        };

        if (email && password) {
            await this.setState({
                emailInput: email,
                passwordInput: password,
            });

            const response = await util.sendPost(`${constants.LOCALHOST}/auth`, body);

            if (response.status !== 200) {
                const errorText = await response.text();

                this.setState(state => ({
                    ...state,
                    errorText,
                    isOpenErrorWindow: true,
                }));
            } else {
                await logic.setToLocalStorage(await response.json());
                window.location.href = '/main';
            }
        } else {
            const errorText = 'Fill in all the fields!';

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
                            onClick={ () => this.submitLoginForm()}
                            className='btn login-form__btn'
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

export default Login;