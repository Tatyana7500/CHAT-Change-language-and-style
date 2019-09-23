import 'react-flags-select/css/react-flags-select.css';
import ReactFlagsSelect from 'react-flags-select';
import PropTypes from 'prop-types';
import React from 'react';

const SettingHeader = (props) => {
    const { defaultCountry, changeTheme, changeLanguage } = props;

    return (
        <div className='settings__item'>
            <input className='radio' type='checkbox' onChange={changeTheme} />
            <ReactFlagsSelect
                onSelect={changeLanguage}
                className = 'ReactFlagsSelect'
                defaultCountry = {defaultCountry}
                countries = {['US', 'DE', 'AR', 'UA']}
                customLabels = {{ 'US': 'EN', 'DE': 'DE', 'AR': 'AR', 'UA': 'UA' }}
            />
        </div>
    );
};

SettingHeader.propTypes = {
    changeTheme: PropTypes.func.isRequired,
    changeLanguage: PropTypes.func.isRequired,
    defaultCountry: PropTypes.string.isRequired,
};

export default SettingHeader;