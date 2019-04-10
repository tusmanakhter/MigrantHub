import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import validator from 'validator';
import { Redirect } from 'react-router-dom';
import {pinServiceTour, viewServiceTour, createServiceTour, mainTour} from 'lib/GuidedTour'
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import Popper from "@material-ui/core/Popper";
import Help from "@material-ui/icons/Help";

import qs from 'qs';
import { toast } from 'react-toastify';
import axios from 'axios';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Tour from "reactour";

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Hidden from '@material-ui/core/Hidden';

// @material-ui/icons
import Person from '@material-ui/icons/Person';
import Dashboard from '@material-ui/icons/Dashboard';

// core components
import Button from 'components/CustomButtons/Button.jsx';
import { Link } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';

import headerLinksStyle from 'assets/jss/material-dashboard-pro-react/components/headerLinksStyle';
import { AuthConsumer } from 'routes/AuthContext';
import UserTypes from 'lib/UserTypes';

class BaseHeaderLinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    open: false,
    search: '',
    searchError: '',
    redirectTo: false,
    redirectToURL: '',
    redirectState: {},
    isTourOpen: false,
    isShowingMore: false,
    dataRetrieved: false,
    };
    this.getUser = this.getUser.bind(this);
  }

  componentDidMount() {
    this.getUser(this);
  }

  componentWillReceiveProps() {
    this.getUser(this);
  }

  getUser() {
    const { dataRetrieved } = this.state;
    const { user } = this.context;

    if (!dataRetrieved) {
      axios.get(`/api/migrants/onboarding/${user.username}`).then((response) => {
        if (response.status === 200) {
          let performOnBoarding = response.data == true ? true: false ;
          this.setState({
            dataRetrieved: true,
          });
          if(performOnBoarding){
            axios.put(`/api/migrants/onboarding/${user.username}`);
            this.openTour(mainTour);
          }
        }
      });
    }
  }

  closeTour = () => {
    this.setState({ isTourOpen: false });
  };

  openTour = (tourSteps) => {
    if(tourSteps == mainTour){
      this.setState({ 
        tourSteps: tourSteps,
        closeWithMask: false,
        isTourOpen: true
      });
    } else {
      this.setState({ 
        tourSteps: tourSteps,
        closeWithMask: true,
        isTourOpen: true
      });
    } 
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
      classes, rtlActive, context,
    } = this.props;
    const { open,  isTourOpen, tourSteps, closeWithMask } = this.state;
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
        <div className={managerClasses} data-tut="reactour__onboarding">
          <Tour
            onRequestClose={this.closeTour}
            steps={tourSteps}
            closeWithMask={closeWithMask}
            isOpen={isTourOpen}
            maskClassName="mask"
            className="helper"
            rounded={10}
            startAt={0}
          />
          <Button
            color="primary"
            justIcon
            simple
            aria-label="Guided Tour"
            aria-owns={open ? "menu-list" : null}
            aria-haspopup="true"
            onClick={this.handleClick}
            className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
            muiClasses={{
              label: rtlActive ? classes.labelRTL : ""
            }}
            buttonRef={node => {
              this.anchorEl = node;
            }}
          >
            <Help
              className={
                classes.headerLinksSvg +
                " " +
                (rtlActive
                  ? classes.links + " " + classes.linksRTL
                  : classes.links)
              }
            />
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
              [classes.pooperNav]: true
            })}
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list"
                style={{ transformOrigin: "0 0 0" }}
              >
                <Paper className={classes.dropdown}>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList role="menu">
                      <MenuItem
                          onClick={() => this.openTour(mainTour)}
                          className={dropdownItem}
                      >
                        {"Onboarding"}
                      </MenuItem>
                      <MenuItem
                        onClick={() => this.openTour(pinServiceTour)}
                        className={dropdownItem}
                      >
                        {"How to pin a service?"}
                      </MenuItem>
                      <MenuItem
                        onClick={() => this.openTour(viewServiceTour)}
                        className={dropdownItem}
                      >
                        {"How to view all services?"}
                      </MenuItem>
                      <MenuItem
                        onClick={() => this.openTour(createServiceTour)}
                        className={dropdownItem}
                      >
                        {"How to create a service?"}
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
        <Link to="/main" data-tut="reactour__returnToDashboard">
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
        <Link to={path} data-tut="reactour__myProfile">
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

BaseHeaderLinks.contextType = AuthConsumer;

export default withStyles(headerLinksStyle)(injectIntl(HeaderLinks));
