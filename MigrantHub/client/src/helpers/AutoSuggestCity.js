import React from 'react';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import deburr from 'lodash/deburr';
import MenuItem from '@material-ui/core/MenuItem';
import { cities } from 'canada';

export const getSuggestionValue = suggestion => (`${suggestion[0]}, ${suggestion[1]}`);

export const getSuggestions = (value) => {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0 ? [] : cities.filter((city) => {
    const keep = count < 5 && (`${city[0]}, ${city[1]}`).slice(0, inputLength).toLowerCase() === inputValue;

    if (keep) {
      count += 1;
    }

    return keep;
  });
};

export const renderSuggestion = (suggestion, { query, isHighlighted }) => {
  const matches = match((`${suggestion[0]}, ${suggestion[1]}`), query);
  const parts = parse((`${suggestion[0]}, ${suggestion[1]}`), matches);

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
