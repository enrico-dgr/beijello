import React, { useEffect, useState } from 'react';
import SubmitButton from '../../components/funcComponents/SubmitButton';

// HOOKS
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// SERVICES
import { tryLocalSession } from '../../services/fakeApi'
import { Spinner } from '../../components/funcComponents/Spinner';


const Welcome = (  ) => {

    const { t } = useTranslation();
    let navigate = useNavigate()

    let [session, setSession] = useState()

    useEffect(() => {
        let localSession = tryLocalSession()


        if ( !localSession ) {
            navigate('/auth/login')
        } else if ( localSession && !session ) {
            setSession(localSession)
        }  
    }, [ session ]);




    const handleNavigate = ( dest ) => () =>  {
        navigate(dest)
    }

    if (!session ) {
        return <Spinner />
    }

    return (
        <div style={{width: 600, margin: '0 auto'}}>
            <h1>{t('Home.Welcome')} {session?.name} {session?.surname} </h1>
            <h2>email: {session?.email} tel: {session?.phone}</h2>
            <h3>bday {session?.date}</h3>
            <br />
            <SubmitButton 
                label={t('Home.ChangePswBtn')}
                onClick={handleNavigate('/profile/changepsw')}
            />
        </div>
    )
};

export default Welcome;
