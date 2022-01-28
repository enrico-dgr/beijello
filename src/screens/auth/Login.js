import React, { Component } from 'react'
import { withTranslation } from 'react-i18next';
import { checkEmail } from '../../utils/utils';
import { Navigate } from "react-router-dom";
import { signIn, tryLastSession, tryLocalSession, applyFixture } from '../../services/fakeApi';

// CSS
import './Login.css'

// IMAGES
import facebook from '../../assets/images/facebook-to-zindex.png'
import twitter from '../../assets/images/twitter-to-zindex.png'

// FUNC COMPONENTS
import Input from '../../components/funcComponents/UI/input/Input'
import Checkbox from '../../components/funcComponents/UI/checkbox/Checkbox'
import CircleButton from '../../components/funcComponents/CircleButton'
import SubmitButton from '../../components/funcComponents/SubmitButton'

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            password: '',
            email: '',
            emailError: false,
            passwordError: false,
            rememberSession: true,
            path: 'none',
        }
    }

    componentDidMount() {
        //
        applyFixture()

        let session = tryLocalSession()
        let lastSession = tryLastSession()

        if ( session ) {
            this.setState({ path:"/"})
        }

        if ( lastSession) {
            this.setState({email: lastSession.email})
        }
    }

    checkLogin = () => {
        let emailInput = this.state.email
        let passwordInput = this.state.password
        let passwordError = false
        let emailError = false
        if (!checkEmail(emailInput)) {
            emailError = true
        } 

        if (passwordInput.trim() === '') {
            passwordError = true

        }

        this.setState({
            emailError,
            passwordError
        })

        if ( !emailError && !passwordError){
            let session = signIn(this.state.email, this.state.password, this.state.rememberSession)
            
            if ( session.errorMsg === '' ) {
                this.setState({ path: '/' })
            } else {
                alert(session.errorMsg)
            }

        }
    }

    onClickForgotPassword = (e) => {
        e.preventDefault();
        this.setState({ path: '/auth/forgotpassword' })
    }

    onSignUpClick = () => {
        this.setState({ path: '/auth/registration' })
    }

    onClickCheckbox = () => {
        this.setState({ rememberSession: !this.state.rememberSession })
    }

    setEmail = (e) => {

        this.setState({ email: e.target.value })
    }

    setPassword = (e) => {
        this.setState({ password: e.target.value })
    }

    render() {
        const { t } = this.props

        return (
            <div className="auth-default-form">
                {
                    this.state.path !== 'none' &&
                    <Navigate to={this.state.path} />
                }
                <h1 className='title'>{t('Login.Title')}</h1>
                <Input label='Email' value={this.state.email}
                    type='text'
                    onChangeCallback={this.setEmail}
                    errorFlag={this.state.emailError}
                    errorText={t('Login.EmailError')} />

                <Input
                    type='password'
                    label='Password'
                    value={this.state.password}
                    onChangeCallback={this.setPassword}
                    errorFlag={this.state.passwordError}
                    errorText={t('Login.PasswordError')} />

                <div className='user-actions-container' >
                    <Checkbox
                        label={t('Login.RememberMe')}
                        checkboxStyleContainer='checkbox'
                        checkboxStyleInput='input-checkbox'
                        checkboxStyleLabel='label' 
                        callback={this.onClickCheckbox}
                        value={this.state.rememberSession}
                    />

                    <a href='//' className={'link'} onClick={this.onClickForgotPassword} >
                        {t('Login.ForgotPassword')}
                    </a>
                </div>
                <SubmitButton 
                    label={t('Login.SubmitButton')}
                    onClick={this.checkLogin}
                />
                <div className='goto-sign goto-sign--up'  >
                    <span style={{cursor:'pointer'}} onClick={this.onSignUpClick} >{t('Login.SignUp')}</span>
                </div>
                <div className='sign-up'>
                    <span style={{cursor:'pointer'}}>{t('Login.OrSignUpWith')}</span>
                </div>
                <div>
                    <CircleButton
                        className={'facebook'}
                    >
                        <img src={facebook} className='img-facebook' alt='facebook-icon' />
                    </CircleButton>
                    <CircleButton
                        className={'twitter'}
                    >
                        <img src={twitter} className='img-twitter' alt='twitter-icon' />
                    </CircleButton>
                </div>
            </div>
        )
    }
}

export default withTranslation()(Login)