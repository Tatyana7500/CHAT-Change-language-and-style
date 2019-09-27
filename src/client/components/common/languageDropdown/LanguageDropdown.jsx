import 'react-flags-select/css/react-flags-select.css';
import ReactFlagsSelect from 'react-flags-select';
import PropTypes from 'prop-types';
import './LanguageDropdown.css';
import React from 'react';

const SettingLanguage = (props) => {
    const { defaultCountry, changeLanguage } = props;

    return (
            <ReactFlagsSelect
                className = 'ReactFlagsSelect'
                onSelect = {changeLanguage}
                defaultCountry = {defaultCountry}
                countries = {['US', 'DE', 'AE', 'UA']}
                customLabels = {{ 'US': 'EN', 'DE': 'DE', 'AE': 'AE', 'UA': 'UA' }}
            />
    );
};

SettingLanguage.propTypes = {
    defaultCountry: PropTypes.string.isRequired,
    changeLanguage: PropTypes.func.isRequired,
};

export default SettingLanguage;