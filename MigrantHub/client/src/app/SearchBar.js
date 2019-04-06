import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import validator from 'validator';
import { Redirect } from 'react-router-dom';

// @material-ui/icons
import Search from '@material-ui/icons/Search';

// core components
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import { injectIntl, intlShape } from 'react-intl';
import { fade } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
});

class SearchBar extends React.Component {
  state = {
    open: false,
    search: '',
    searchError: '',
    redirectTo: false,
    redirectToURL: '',
    redirectState: {},
  };

  handleCheckForEnter = (event) => {
    if (event.key === 'Enter') {
      this.handleSearch();
    }
  }

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSearch = async () => {
    const error = await this.validate();
    if (!error) {
      this.sendSearch();
    }
  };

  validate = () => {
    let isError = false;
    const errors = {
      searchError: '',
    };

    if (validator.isEmpty(this.state.search)) {
      errors.searchError = 'Search is required';
      isError = true;
    }

    this.setState({
      ...this.state,
      ...errors,
    });

    return isError;
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  sendSearch() {
    this.setState({
      redirectTo: true,
      redirectToURL: `/search/${this.state.search}`,
    });
  }

  renderRedirectTo = () => {
    const { redirectTo, redirectToURL } = this.state;

    if (redirectTo) {
      this.setState({
        redirectTo: false,
        redirectToURL: '',
      });
      return (
        <Redirect to={redirectToURL} />
      );
    }
  }

  render() {
    const {
      classes, rtlActive, intl,
    } = this.props;
    const searchButton = `${classes.top
    } ${
      classes.searchButton
    } ${
      classNames({
        [classes.searchRTL]: rtlActive,
      })}`;

    return (
      <div className={classes.search}>
        {this.renderRedirectTo()}
        <div className={classes.searchIcon}>
          <Button
            type="submit"
            color="white"
            aria-label="edit"
            onClick={this.handleSearch}
            className={searchButton}
          >
            <Search />
          </Button>
        </div>
        <InputBase
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{
            id: 'search',
            name: 'search',
            placeholder: intl.formatMessage({ id: 'search' }),
            value: this.state.search,
            error: this.state.searchError.length > 0,
            onChange: event => this.handleChange(event),
            classes: {
              root: classes.inputRoot,
              input: classes.multilineColor,
            },
          }}
          onKeyPress={event => this.handleCheckForEnter(event)}
          helperText={this.state.searchError}
          error={this.state.searchError.length > 0}
        />
      </div>
    );
  }
}

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
};

export default withStyles(styles)(injectIntl(SearchBar));
