import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Input from '../../components/funcComponents/UI/input/Input';
import SubmitButton from '../../components/funcComponents/SubmitButton'

import { checkEmail } from '../../utils/utils';

const ForgotPassword = () => {
    const [state, setState] = useState({
        email: '',
        emailError: false,
        emailSent: false,
    })
    const { t } = useTranslation()

    const setEmail = (e) => {
        setState({...state,email: e.target.value})
    }

    const sendEmail = () => {
        let emailInput = state.email
        let emailError = false
        let emailSent = false
        if (!checkEmail(emailInput)) {
            emailError = true
        }

        if(!emailError){
            emailSent = true;
        }

        setState({
            ...state,
            emailError,
            emailSent
        })
    }

    return (
        <div className="auth-default-form">
            <h1 className='title'>{t('ForgotPassword.Title')}</h1>
            <Input
                errorFlag={state.emailError}
                errorText={t('Login.EmailError')}
                label='Email'
                onChangeCallback={setEmail}
                type='text'
                value={state.email}
            />
            <SubmitButton 
                label={t(`ForgotPassword.${state.emailSent?'EmailSent':'SendEmail'}`)}
                onClick={sendEmail} 
            />
        </div>
    )
}

export default (ForgotPassword)