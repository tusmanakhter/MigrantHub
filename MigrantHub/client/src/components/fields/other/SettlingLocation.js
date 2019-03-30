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
    />
  );
};

SettlingLocation.propTypes = {
  settlingLocation: PropTypes.string.isRequired,
  settlingLocationError: PropTypes.string.isRequired,
  handleAutoSuggestChange: PropTypes.func.isRequired,
};

export default SettlingLocation;
