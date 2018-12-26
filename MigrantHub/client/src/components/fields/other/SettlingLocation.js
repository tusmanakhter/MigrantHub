import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { renderInputComponent } from '../../../helpers/Autosuggest';
import {
  handleSuggestionsClearRequested, handleSuggestionsFetchRequested,
  renderSuggestion, getSuggestionValue,
} from '../../../helpers/AutoSuggestCity';

const styles = theme => ({
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
});

class SettlingLocation extends Component {
  constructor(props) {
    super(props);
    this.handleSuggestionsClearRequested = handleSuggestionsClearRequested.bind(this);
    this.handleSuggestionsFetchRequested = handleSuggestionsFetchRequested.bind(this);
  }

  state = { citySuggestions: [] }

  render() {
    const {
      classes, settlingLocation, settlingLocationError, handleAutoSuggestChange,
    } = this.props;

    const { citySuggestions } = this.state;

    const autosuggestProps = {
      renderInputComponent,
      suggestions: citySuggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion,
    };

    return (
      <Autosuggest
        {...autosuggestProps}
        inputProps={{
          classes,
          label: 'Settling Location',
          value: settlingLocation,
          onChange: handleAutoSuggestChange,
          helperText: settlingLocationError,
          error: settlingLocationError.length > 0,
        }}
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderSuggestionsContainer={options => (
          <Paper {...options.containerProps} square>
            {options.children}
          </Paper>
        )}
      />
    );
  }
}

SettlingLocation.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  settlingLocation: PropTypes.string.isRequired,
  settlingLocationError: PropTypes.string.isRequired,
  handleAutoSuggestChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(SettlingLocation);
