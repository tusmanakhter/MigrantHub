import React from 'react';
import PropTypes from 'prop-types';
import {
  handleSuggestionsClearRequested, handleSuggestionsFetchRequested,
  renderSuggestion, getSuggestionValue,
} from '../../../helpers/AutoSuggestCity';
import AutosuggestTextbox from '../generic/AutosuggestTextbox';

const SettlingLocation = (props) => {
  const {
    settlingLocation, settlingLocationError, handleAutoSuggestChange,
  } = props;

  return (
    <AutosuggestTextbox
      label="Settling Location"
      value={settlingLocation}
      error={settlingLocationError}
      handleAutoSuggestChange={handleAutoSuggestChange}
      handleSuggestionsClearRequested={handleSuggestionsClearRequested}
      handleSuggestionsFetchRequested={handleSuggestionsFetchRequested}
      renderSuggestion={renderSuggestion}
      getSuggestionValue={getSuggestionValue}
    />
  );
};

SettlingLocation.propTypes = {
  settlingLocation: PropTypes.string.isRequired,
  settlingLocationError: PropTypes.string.isRequired,
  handleAutoSuggestChange: PropTypes.func.isRequired,
};

export default SettlingLocation;
