import React from 'react';
import PropTypes from 'prop-types';
import {
  handleSuggestionsClearRequested, handleSuggestionsFetchRequested,
  renderSuggestion, getSuggestionValue,
} from 'helpers/AutoSuggestLang';
import AutosuggestTextbox from 'components/fields/generic/AutosuggestTextbox';
import { FormattedMessage } from 'react-intl';

const Language = (props) => {
  const {
    language, languageError, handleAutoSuggestChange, motherTongue,
  } = props;

  return (
    <AutosuggestTextbox
      label={
      motherTongue ? 'Mother Tongue'
        : <FormattedMessage id="lang.lang" />
      }
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

Language.defaultProps = {
  motherTongue: false,
};

Language.propTypes = {
  language: PropTypes.string.isRequired,
  languageError: PropTypes.string.isRequired,
  handleAutoSuggestChange: PropTypes.func.isRequired,
  motherTongue: PropTypes.bool,
};

export default Language;
