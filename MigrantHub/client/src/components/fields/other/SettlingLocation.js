import React from 'react';
import PropTypes from 'prop-types';
import {
  handleSuggestionsClearRequested, handleSuggestionsFetchRequested,
  renderSuggestion, getSuggestionValue,
} from 'helpers/AutoSuggestCity';
import AutosuggestTextbox from 'components/fields/generic/AutosuggestTextbox';
import { FormattedMessage } from 'react-intl';

const SettlingLocation = (props) => {
  const {
    settlingLocation, settlingLocationError, handleAutoSuggestChange,
    variant, margin, inputClass,
  } = props;

  return (
    <AutosuggestTextbox
      label={<FormattedMessage id="other.location" />}
      value={settlingLocation}
      error={settlingLocationError}
      handleAutoSuggestChange={handleAutoSuggestChange}
      handleSuggestionsClearRequested={handleSuggestionsClearRequested}
      handleSuggestionsFetchRequested={handleSuggestionsFetchRequested}
      renderSuggestion={renderSuggestion}
      getSuggestionValue={getSuggestionValue}
      variant={variant}
      inputClass={inputClass}
      margin={margin}
    />
  );
};

SettlingLocation.defaultProps = {
  variant: 'standard',
  inputClass: '',
  margin: '',
};

SettlingLocation.propTypes = {
  settlingLocation: PropTypes.string.isRequired,
  settlingLocationError: PropTypes.string.isRequired,
  handleAutoSuggestChange: PropTypes.func.isRequired,
  variant: PropTypes.string,
  inputClass: PropTypes.string,
  margin: PropTypes.string,
};

export default SettlingLocation;
