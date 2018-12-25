import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import validator from 'validator';
import Logout from '../Logout';
import UserTypes from '../../lib/UserTypes';

var qs = require('qs');

const searchType = [
  { value: 'PEOPLE', label: 'People' },
  { value: 'SERVICE', label: 'Services' },
  { value: 'EVENT', label: 'Events' },
];

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
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
    pointerEvents: 'none',
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
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      mobileMoreAnchorEl: null,
      redirectTo: false,
      redirectToURL: '',
      type: '',
      search: '',
      searchType: '',
      searchError: '',
      searchTypeError: '',
      redirectState: {},
      email: '',
      dataRetrieved: false,
      firstName: '',
      lastName: '',
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
    if (!dataRetrieved) {
      axios.get('/api/accounts/get/user').then((response) => {
        if (response.status === 200) {
          this.setState({
              type: response.data.type,
              email: response.data.email,
              firstName: response.data.firstName,
              lastName: response.data.lastName,
              dataRetrieved: true,
          });
        }
      });
    }
  }

  handleProfileMenuOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = (event) => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  handleMenuClick = (event) => {
    const { type, email } = this.state;
    if (event.target.id === 'editProfile') {
      if (type === UserTypes.MIGRANT) {
        this.setState({
          redirectTo: true,
          redirectToURL: '/editmigrant',
        });
      } else if (type === UserTypes.BUSINESS) {
        this.setState({
          redirectTo: true,
          redirectToURL: '/editbusiness',
        });
      }
    } else if (event.target.id === 'viewProfile') {
          if (type === UserTypes.MIGRANT) {
              this.setState({
                  redirectTo: true,
                  redirectToURL: '/migrant/profile',
              });
          } else if (type === UserTypes.BUSINESS) {
              this.setState({
                  redirectTo: true,
                  redirectToURL: '/business/profile',
              });
          }
      } else if (event.target.id === 'myServices') {
      this.setState({
        redirectTo: true,
        redirectToURL: '/myservices',
        redirectState: {
          editOwner: email,
          editMode: true,
          searchQuery: '',
          searchMode: false,
        },
      });
    } else if (event.target.id === 'myEvents') {
      this.setState({
        redirectTo: true,
        redirectToURL: '/myevents',
        redirectState: {
          editOwner: email,
          editMode: true,
        },
      });
    } else if (event.target.id === 'main') {
      if (type === UserTypes.MIGRANT) {
        this.setState({
            redirectTo: true,
            redirectToURL: '/main',
        });
      } else if (type === UserTypes.BUSINESS) {
        this.setState({
            redirectTo: true,
            redirectToURL: '/businessmain',
        });
      }
    }
    this.handleMenuClose();
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSearch = async () => {
    const error = await this.validate();
    if (!error) {
      if (this.state.searchType === 'SERVICE') {
        this.sendSearchServices();
      }

      if (this.state.searchType === 'PEOPLE') {
        this.sendSearchPeople();
      }
    }
  };

  validate = () => {
    let isError = false;
    const errors = {
      searchError: '',
      searchTypeError: '',
    };

    if (validator.isEmpty(this.state.search)) {
      errors.searchError = 'Search is required';
      isError = true;
    }

    if (validator.isEmpty(this.state.searchType)) {
      errors.searchTypeError = 'Search Type is required';
      isError = true;
    }

    this.setState({
      ...this.state,
      ...errors,
    });

    return isError;
  }

  sendSearchServices() {
    this.setState({
      redirectTo: true,
      redirectToURL: '/services',
      redirectState: {
        editOwner: '',
        editMode: false,
        searchQuery: this.state.search,
        searchMode: true,
      },
    });
  }

  sendSearchPeople() {
    this.setState({
      redirectTo: true,
      redirectToURL: '/users',
      redirectState: {
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
      const { anchorEl, mobileMoreAnchorEl, firstName, lastName } = this.state;
      const { classes } = this.props;
      const isMenuOpen = Boolean(anchorEl);
      const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

      const renderMenu = (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={this.handleMenuClose}
        >
          <MenuItem onClick={this.handleClose}>Profile</MenuItem>
          <MenuItem onClick={this.handleClose}>My account</MenuItem>
          <MenuItem id="editProfile" onClick={this.handleMenuClick}>Edit Profile</MenuItem>
          <MenuItem id="viewProfile" onClick={this.handleMenuClick}>View Profile</MenuItem>
          <MenuItem id="myServices" onClick={this.handleMenuClick}>My Services</MenuItem>
          <MenuItem id="myEvents" onClick={this.handleMenuClick}>My Events</MenuItem>
        </Menu>
      );

      const renderMobileMenu = (
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMobileMenuOpen}
          onClose={this.handleMobileMenuClose}
        >
          <MenuItem>
            <IconButton color="inherit">
              <Badge className={classes.margin} badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <p>Messages</p>
          </MenuItem>
          <MenuItem>
            <IconButton color="inherit">
              <Badge className={classes.margin} badgeContent={11} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <p>Notifications</p>
          </MenuItem>
          <MenuItem onClick={this.handleProfileMenuOpen}>
            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
            <p>Profile</p>
          </MenuItem>
        </Menu>
      );

      return (
        <div className={classes.root}>
          {this.renderRedirectTo()}
          <AppBar position="static">
            <Toolbar>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
                <MenuIcon />
              </IconButton>
              <IconButton color="inherit">
                <Typography id="main" onClick={this.handleMenuClick} className={classes.title} variant="title" color="inherit" noWrap>
                MigrantHub
                </Typography>
              </IconButton>
              <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                id="search" 
                name="search"
                placeholder="Search…"
                value={this.state.search}
                onChange={event => this.handleChange(event)}
                helperText={this.state.searchError}
                error={this.state.searchError.length > 0}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
            <TextField
            id="searchType"
            name="searchType"
            style = {{width: 200}}
            defaultValue = {searchType[0]}
            select
            value={this.state.searchType}
            className={classes.select}
            onChange={event => this.handleChange(event)}
            helperText={this.state.searchTypeError}
            error={this.state.searchTypeError.length > 0}
          >
            {searchType.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
            <Button 
              variant="contained"
              color="primary"
              onClick={this.handleSearch} 
              className={classes.button}>
              Search
            </Button>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <IconButton color="inherit">
                  <Badge className={classes.margin} badgeContent={4} color="secondary">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton color="inherit">
                  <Badge className={classes.margin} badgeContent={17} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  aria-owns={isMenuOpen ? 'material-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                  <div>
                    <Typography id="main" className={classes.title} variant="subheading"  color="inherit" noWrap>
                        {firstName + ' ' + lastName}
                    </Typography>
                  </div>
                </IconButton>
                <Logout />
              </div>
              <div className={classes.sectionMobile}>
                <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                  <MoreIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          {renderMenu}
          {renderMobileMenu}
        </div>
      );
    }
}

Header.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(Header);
