import React, { useState, useEffect } from 'react';
import "./ChangePsw.css"

import Input from '../../components/funcComponents/UI/input/Input';
import SubmitButton from '../../components/funcComponents/SubmitButton';
import { getUserPassword, tryLocalSession } from '../../services/fakeApi';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';


const ChangePsw = () => {

    const [ session, setSession ] = useState()
    const { t } = useTranslation();
    let navigate = useNavigate()

    const [ state, setState ] = useState({ 
        password: '',
        newPassword: '',
        confirmNewPassword: '',
        msg: '',
        oldPwError: false,
        newPwError: false
    })
    
    useEffect(() => {
        let localSession = tryLocalSession()

        if ( localSession ) {
            setSession(localSession)
        }
    }, []);
    

    const setPassword = (e) => setState({ ...state, password: e.target.value})
    const setNewPassword = (e) => setState({ ...state, newPassword: e.target.value})
    const setConfirmNewPassword = (e) => setState({ ...state, confirmNewPassword: e.target.value})

    const handleButtonClick= () =>{
        let userPsw = getUserPassword( session.email )
        console.log(userPsw)

        if ( state.password !== userPsw ){
            setState({...state, 
                msg: 'CurrentPasswordWrong',
                oldPwError: true,
                newPwError: false
            })
            
        } else if (state.password === state.newPassword ) {
            setState({...state, 
                msg: 'PasswordSameAsOld',
                oldPwError: false,
                newPwError: true
            })
            return
        } else if (state.newPassword !== state.confirmNewPassword ) {
            setState({...state, oldPwError: false, msg: 'NewPasswordsDontMatch', newPwError: true})
        } else if (state.newPassword.length <= 8 ) {
            setState({...state, oldPwError: false, msg: 'PasswordsTooShort', newPwError: true})
            return 
        } 
        else {
            setState({...state, msg: ''})
        }

        if ( ( state.password === userPsw )
        && (state.newPassword === state.confirmNewPassword ) ) {
            setState({...state, 
                oldPwError:false, 
                newPwError:false, 
                msg:'',
                successMsg:"PassChangeSuccess" + state.newPassword
            })
            setTimeout(() => navigate('/') , 2000)
        }
    }

    return (
        <div style={{margin: 10}}>
            <div className="psw-container">
                <h2 className='title' style={{marginTop: 30}}>{t('ChangePassword.Title')}</h2>
                { state.msg ? <p className='error-alert'>{t("ChangePassword.Errors." + state.msg)}</p> : null }
                { state.successMsg ? <p className='success-alert'>{t(state.successMsg)}</p> : null}
                <Input 
                    errorFlag={state.oldPwError}
                    value={state.password}
                    label={t('ChangePassword.CurrentPsw')}
                    type="password"
                    height={60}
                    onChangeCallback={setPassword}
                />
                <div style={{marginTop: '3rem'}} />
                <Input 
                    errorFlag={state.newPwError}
                    value={state.newPassword}
                    label={t('ChangePassword.NewPsw')}
                    type="password"
                    height={60}
                    onChangeCallback={setNewPassword}
                />
                <Input 
                    errorFlag={state.newPwError}
                    value={state.confirmNewPassword}
                    label={t('ChangePassword.ConfirmNewPsw')}
                    type="password"
                    height={60}
                    onChangeCallback={setConfirmNewPassword}
                />
                <SubmitButton 
                    label={t('ChangePassword.BtnConfirm')}
                    onClick={handleButtonClick}
                />
            </div>
        </div>
    )
};

export default ChangePsw;
