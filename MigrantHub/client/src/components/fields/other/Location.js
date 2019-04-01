import React from 'react';
import PropTypes from 'prop-types';
import {
  handleSuggestionsClearRequested, handleSuggestionsFetchRequested,
  renderSuggestion, getSuggestionValue,
} from 'helpers/AutoSuggestCity';
import AutosuggestTextbox from 'components/fields/generic/AutosuggestTextbox';
import { FormattedMessage } from 'react-intl';

const Location = (props) => {
  const {
    location, locationError, handleAutoSuggestChange,
  } = props;

  return (
    <AutosuggestTextbox
      label={<FormattedMessage id="other.location" />}
      value={location}
      error={locationError}
      handleAutoSuggestChange={handleAutoSuggestChange}
      handleSuggestionsClearRequested={handleSuggestionsClearRequested}
      handleSuggestionsFetchRequested={handleSuggestionsFetchRequested}
      renderSuggestion={renderSuggestion}
      getSuggestionValue={getSuggestionValue}
    />
  );
};

Location.propTypes = {
  location: PropTypes.string.isRequired,
  locationError: PropTypes.string.isRequired,
  handleAutoSuggestChange: PropTypes.func.isRequired,
};

export default Location;
