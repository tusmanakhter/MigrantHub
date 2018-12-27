import React from 'react';
import PropTypes from 'prop-types';
import {
  handleSuggestionsClearRequested, handleSuggestionsFetchRequested,
  renderSuggestion, getSuggestionValue,
} from '../../../helpers/AutoSuggestLang';
import AutosuggestTextbox from '../generic/AutosuggestTextbox';

const Language = (props) => {
  const {
    language, languageError, handleAutoSuggestChange,
  } = props;

  return (
    <AutosuggestTextbox
      label="Language"
      value={language}
      error={languageError}
      handleAutoSuggestChange={handleAutoSuggestChange}
      handleSuggestionsClearRequested={handleSuggestionsClearRequested}
      handleSuggestionsFetchRequested={handleSuggestionsFetchRequested}
      renderSuggestion={renderSuggestion}
      getSuggestionValue={getSuggestionValue}
    />
  );
};

Language.propTypes = {
  language: PropTypes.string.isRequired,
  languageError: PropTypes.string.isRequired,
  handleAutoSuggestChange: PropTypes.func.isRequired,
};

export default Language;
