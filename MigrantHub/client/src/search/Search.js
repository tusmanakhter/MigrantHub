import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import SearchEventContainer from 'search/eventSearch/SearchEventContainer';
import SearchJobContainer from 'search/jobSearch/SearchJobContainer';
import SearchServiceContainer from 'search/serviceSearch/SearchServiceContainer';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  mainContainer: {
    paddingTop: 15,
  },
});

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: props.match.params.query,
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.match.params.query != this.props.match.params.query){
      nextProps.history.push(`/`);
      nextProps.history.goBack();
    }
  }

  render() {
    const { searchQuery } = this.state;

    return (
      <React.Fragment>
        <SearchServiceContainer editMode={false} searchQuery={searchQuery} searchMode />
        <SearchEventContainer editMode={false} searchQuery={searchQuery} searchMode />
        <SearchJobContainer editMode={false} searchQuery={searchQuery} searchMode />
      </React.Fragment>
    );
  }
}

Search.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(Search);
