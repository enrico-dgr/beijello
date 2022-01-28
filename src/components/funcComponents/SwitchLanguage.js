
import './SwitchLanguage.css';
import React from 'react';
import PropTypes from 'prop-types';
import i18n from '../../i18n';
import itFlag from '../../assets/images/italy.png';
import enFlag from '../../assets/images/united-kingdom (1).png';

const SwitchLanguage = (props) => {

    const [_lang,setLang] = React.useState('en');

    const onClickChangeLang = (language) => () => {
        setLang(language)
        i18n.changeLanguage(language)
    };

    return (
        <div className={'switch-language '+ props.classNameContainer} >
            {languagesPairs.find(findLang).button({ onClick: onClickChangeLang })}
            <div className={'switch-language__list'} >
                {languagesPairs.map(mapButtons({ onClick: onClickChangeLang }))}
            </div>
        </div>
    )
};

const languagesPairs = [
    {
        lang: 'it',
        button:({ onClick }) => <button
                    className={'switch-language__button'}
                    onClick={onClick('it')}>
                    <img src={itFlag} alt='facebook-icon' />
                </button>
    },
    {
        lang: 'en',
        button:({ onClick }) => <button
                className={'switch-language__button'}
                onClick={onClick('en')}>
                <img src={enFlag} alt='twitter-icon' />
            </button>
    },
]

const findLang = (languagePair) => languagePair.lang === i18n.language;

const mapButtons = ({ onClick }) => ( languagePair, i) => <div key={languagePair.lang + i} >
    {languagePair.button({ onClick })}
</div> ;

SwitchLanguage.defaultProps = {
    classNameContainer: '',
}

SwitchLanguage.propTypes = {
    classNameContainer: PropTypes.string,
}

export default SwitchLanguage;
