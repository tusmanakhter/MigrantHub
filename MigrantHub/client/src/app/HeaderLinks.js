/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import validator from 'validator';
import { Redirect } from 'react-router-dom';

// import { Manager, Target, Popper } from "react-popper";

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Hidden from '@material-ui/core/Hidden';

// @material-ui/icons
import Person from '@material-ui/icons/Person';
import Dashboard from '@material-ui/icons/Dashboard';
import Search from '@material-ui/icons/Search';

// core components
import Button from 'components/CustomButtons/Button.jsx';
import CustomInput from 'components/CustomInput/CustomInput.jsx';
import { Link } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';

import headerLinksStyle from 'assets/jss/material-dashboard-pro-react/components/headerLinksStyle';
import { AuthConsumer } from 'routes/AuthContext';
import UserTypes from 'lib/UserTypes';

class BaseHeaderLinks extends React.Component {
  state = {
    open: false,
    search: '',
    searchError: '',
    redirectTo: false,
    redirectToURL: '',
    redirectState: {},
  };

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
      redirectToURL: '/search',
      redirectState: {
        editOwner: '',
        editMode: false,
        searchQuery: this.state.search,
        searchMode: true,
      },
    });
  }

  renderRedirectTo = () => {
    const { redirectTo, redirectToURL, redirectState } = this.state;

    if (redirectTo) {
      this.setState({
        redirectTo: false,
        redirectToURL: '',
      });
      return (
        <Redirect to={{
          pathname: redirectToURL,
          state: redirectState,
        }}
        />
      );
    }
  }

  render() {
    const {
      classes, rtlActive, intl, context,
    } = this.props;
    const { open } = this.state;
    const searchButton = `${classes.top
    } ${
      classes.searchButton
    } ${
      classNames({
        [classes.searchRTL]: rtlActive,
      })}`;
    const dropdownItem = classNames(
      classes.dropdownItem,
      classes.primaryHover,
      { [classes.dropdownItemRTL]: rtlActive },
    );
    const wrapper = classNames({
      [classes.wrapperRTL]: rtlActive,
    });
    const managerClasses = classNames({
      [classes.managerClasses]: true,
    });

    let path = '/';
    switch (context.user.type) {
      case UserTypes.MIGRANT:
        path = '/profile/personal';
        break;
      case UserTypes.BUSINESS:
        path = '/profile/business';
        break;
      default:
        break;
    }

    return (
      <div className={wrapper}>
        {this.renderRedirectTo()}
        <CustomInput
          formControlProps={{
            className: `${classes.top} ${classes.search}`,
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
            inputProps: {
              className: classes.searchInput,
            },
          }}
          helperText={this.state.searchError}
          error={this.state.searchError.length > 0}
        />
        <Button
          color="white"
          aria-label="edit"
          justIcon
          round
          onClick={this.handleSearch}
          className={searchButton}
        >
          <Search
            className={`${classes.headerLinksSvg} ${classes.searchIcon}`}
          />
        </Button>
        <Link to="/main">
          <Button
            color="primary"
            simple
            aria-label="Dashboard"
            justIcon
            className={classes.buttonLink}
            muiClasses={{
              label: '',
            }}
          >
            <Dashboard
              className={
                `${classes.headerLinksSvg
                } ${classes.links}`
              }
            />
            <Hidden mdUp implementation="css">
              <span className={classes.linkText}>
                {'Dashboard'}
              </span>
            </Hidden>
          </Button>
        </Link>
        <Link to={path}>
          <Button
            color="primary"
            simple
            aria-label="Person"
            justIcon
            className={classes.buttonLink}
          >
            <Person className={classes.headerLinksSvg} />
            <Hidden mdUp implementation="css">
              <span className={classes.linkText}>
                {'Profile'}
              </span>
            </Hidden>
          </Button>
        </Link>
      </div>
    );
  }
}

const HeaderLinks = props => (
  <AuthConsumer>
    {context => <BaseHeaderLinks context={context} {...props} />}
  </AuthConsumer>
);

HeaderLinks.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
};

export default withStyles(headerLinksStyle)(injectIntl(HeaderLinks));
