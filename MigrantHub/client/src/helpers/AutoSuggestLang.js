import React from 'react';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import deburr from 'lodash/deburr';
import MenuItem from '@material-ui/core/MenuItem';
import { languages as languagesData } from 'country-data';

const languagesList = languagesData.all.filter(word => !(/\d/.test(word.name)));

export const getSuggestionValue = suggestion => suggestion.name;

export const getSuggestions = (value) => {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0 ? [] : languagesList.filter((language) => {
    const keep = count < 5 && language.name.slice(0, inputLength).toLowerCase() === inputValue;

    if (keep) {
      count += 1;
    }

    return keep;
  });
};

export const renderSuggestion = (suggestion, { query, isHighlighted }) => {
  const matches = match(suggestion.name, query);
  const parts = parse(suggestion.name, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => (part.highlight ? (
          <span key={String(index)} style={{ fontWeight: 500 }}>
            {part.text}
          </span>
        ) : (
          <strong key={String(index)} style={{ fontWeight: 300 }}>
            {part.text}
          </strong>
        )))}
      </div>
    </MenuItem>
  );
};

export function handleSuggestionsFetchRequested({ value }) {
  this.setState({
    suggestions: getSuggestions(value),
  });
}

export function handleSuggestionsClearRequested() {
  this.setState({
    suggestions: [],
  });
}
