import './Auth.css'
import SwitchLanguage from "../components/funcComponents/SwitchLanguage";
import React, { useEffect } from 'react'
import {  Outlet, useNavigate, useLocation, Navigate } from 'react-router-dom'


const Auth = () => {

    let { pathname } = useLocation()
    let navigate = useNavigate()

    useEffect(() => {
        let path = pathname.replace('/','') 

        if ( path === 'auth' || path === 'auth/' ) {
            navigate('/auth/login')
        }
    }, []);
    

    return (
        <div className='limiter'>
            <div className="auth-container">
                <div className='auth-wrapper'>
                   
                    <SwitchLanguage classNameContainer={'auth__select-language'}/>

                    <Outlet />

                    <div className="auth-bg-image"></div>

                </div>
            </div>
        </div>
    )
}

export default Auth