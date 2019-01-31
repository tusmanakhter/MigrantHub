import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import validator from 'validator';
import { Redirect } from 'react-router-dom';

// import { Manager, Target, Popper } from "react-popper";

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import Hidden from '@material-ui/core/Hidden';
import Popper from '@material-ui/core/Popper';

// @material-ui/icons
import Person from '@material-ui/icons/Person';
import Notifications from '@material-ui/icons/Notifications';
import Dashboard from '@material-ui/icons/Dashboard';
import Search from '@material-ui/icons/Search';

// core components
import Button from 'components/CustomButtons/Button.jsx';
import { Link } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';

// core components
import CustomInput from 'components/CustomInput/CustomInput.jsx';

import headerLinksStyle from 'assets/jss/material-dashboard-pro-react/components/headerLinksStyle';
import Logout from '../Logout';

class HeaderLinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      search: '',
      searchError: '',
      redirectTo: false,
      redirectToURL: '',
      redirectState: {},
    };
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
      classes, rtlActive, intl,
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
            onChange: event => this.handleChange(event),
            helperText: this.state.searchError,
            error: this.state.searchError.length > 0,
            classes: {
              root: classes.inputRoot,
              input: classes.multilineColor,
            },
            inputProps: {
              className: classes.searchInput,
            },
          }}
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
            color="white"
            simple
            aria-label="Dashboard"
            justIcon
            className={classes.buttonLink}
          >
            <Dashboard
              className={
                `${classes.headerLinksSvg}
                 ${classes.links}`
              }
            />
            <Hidden mdUp implementation="css">
              <span className={classes.linkText}>
                {'Dashboard'}
              </span>
            </Hidden>
          </Button>
        </Link>
        <div className={managerClasses}>
          <Button
            color="default"
            simple
            justIcon
            aria-label="Notifications"
            aria-owns={open ? 'menu-list' : null}
            aria-haspopup="true"
            onClick={this.handleClick}
            className={classes.buttonLink}
            buttonRef={(node) => {
              this.anchorEl = node;
            }}
          >
            <Notifications
              className={
                `${classes.headerLinksSvg} 
                ${classes.links}`
              }
            />
            <span className={classes.notifications}>5</span>
            <Hidden mdUp implementation="css">
              <span onClick={this.handleClick} className={classes.linkText}>
                {'Notification'}
              </span>
            </Hidden>
          </Button>
          <Popper
            open={open}
            anchorEl={this.anchorEl}
            transition
            disablePortal
            placement="bottom"
            className={classNames({
              [classes.popperClose]: !open,
              [classes.pooperResponsive]: true,
              [classes.pooperNav]: true,
            })}
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list"
                style={{ transformOrigin: '0 0 0' }}
              >
                <Paper className={classes.dropdown}>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList role="menu">
                      <MenuItem
                        onClick={this.handleClose}
                        className={dropdownItem}
                      >
                        PLACEHOLDER
                      </MenuItem>
                      <MenuItem
                        onClick={this.handleClose}
                        className={dropdownItem}
                      >
                        PLACEHOLDER
                      </MenuItem>
                      <MenuItem
                        onClick={this.handleClose}
                        className={dropdownItem}
                      >
                        PLACEHOLDER
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
        <Link to="/migrant/profile">
          <Button
            color="secondary"
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
        <Logout />
      </div>
    );
  }
}

HeaderLinks.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
};

export default withStyles(headerLinksStyle)(injectIntl(HeaderLinks));
