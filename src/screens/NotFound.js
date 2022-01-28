import "./NotFound.css"
import React from 'react';
import SubmitButton from '../components/funcComponents/SubmitButton'

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SwitchLanguage from "../components/funcComponents/SwitchLanguage";


const NotFound = () => {

    let navigate = useNavigate()
    let { t } = useTranslation()

    const handleRoute = (dest) => () => {
        navigate(dest)
    }

    return (
        <div className='nf-container'>
             <div className='lang-container'>
                    <SwitchLanguage />
            </div>
            
            <div className='text-container'>
                <h1>{t('NotFound.Title')}</h1>
                <p>{t('NotFound.Subtitle')}</p>
                
                <div style={{margin: '20px 15px'}}>
                    <SubmitButton 
                        label={t('NotFound.GoHomepage')}
                        onClick={handleRoute('/')}
                    />
                </div>

            </div>  
            
        </div>
    )
};

export default NotFound;
