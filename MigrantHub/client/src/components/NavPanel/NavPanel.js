import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ViewList from '@material-ui/icons/ViewList';
import ThumbsUpDown from '@material-ui/icons/ThumbsUpDown';
import PersonPin from '@material-ui/icons/PersonPin';
import Event from '@material-ui/icons/Event';
import Home from '@material-ui/icons/Home';
import PermIdentity from '@material-ui/icons/PermIdentity';
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserTypes from 'lib/UserTypes';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
    color: 'red',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    background: '#ffffff',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    background: '#ffffff',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

class NavPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      type: '',
      email: '',
      firstName: '',
      lastName: '',
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

    handleDrawerOpen = () => {
      this.setState({ open: true });
    };

    handleDrawerClose = () => {
      this.setState({ open: false });
    };

    render() {
      const { classes, theme } = this.props;
      const { email, type } = this.state;

      return (
        <div className={classes.root} data-tut="reactour__sidebar">
          <CssBaseline />

          <Drawer
            variant="permanent"
            className={classNames(classes.drawer, {
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            })}
            classes={{
              paper: classNames({
                [classes.drawerOpen]: this.state.open,
                [classes.drawerClose]: !this.state.open,
              }),
            }}
            open={this.state.open}
          >
            <div className={classes.toolbar}>
              {email}
              {this.state.open ? (
                <IconButton onClick={this.handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              ) : (
                <IconButton onClick={this.handleDrawerOpen}>
                  <ChevronRightIcon />
                </IconButton>
              )}
            </div>
            <Divider />
            <Link to="/">
              <List>
                <ListItem button key="Home">
                  <ListItemIcon><Home className={classes.icons} color="" /></ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItem>
              </List>
            </Link>
            <Link to="/services">
              <List>
                <ListItem button key="Services">
                  <ListItemIcon><ViewList className={classes.icons} color="" /></ListItemIcon>
                  <ListItemText primary="Services" />
                </ListItem>
              </List>
            </Link>
            <Link to="/events">
              <List>
                <ListItem button key="Events">
                  <ListItemIcon><Event className={classes.icons} color="" /></ListItemIcon>
                  <ListItemText primary="Events" />
                </ListItem>
              </List>
            </Link>
            <Divider />
            <Link to={{
              pathname: '/services',
              state: {
                editOwner: email, editMode: true, searchQuery: '', searchMode: false,
              },
            }}
            >
              <List>
                <ListItem button key="My Services">
                  <ListItemIcon><ViewList className={classes.icons} color="" /></ListItemIcon>
                  <ListItemText primary="My Services" />
                </ListItem>
              </List>
            </Link>
            <Link to={{ pathname: '/events', state: { editOwner: email, editMode: true } }}>
              <List>
                <ListItem button key="My Events">
                  <ListItemIcon><Event className={classes.icons} color="" /></ListItemIcon>
                  <ListItemText primary="My Events" />
                </ListItem>
              </List>
            </Link>
            <Link to={type === UserTypes.MIGRANT ? '/editmigrant' : type === UserTypes.BUSINESS ? '/editbusiness' : '/'}>
              <List>
                <ListItem button key="Edit Profile">
                  <ListItemIcon><PermIdentity className={classes.icons} color="" /></ListItemIcon>
                  <ListItemText primary="Edit Profile" />
                </ListItem>
              </List>
            </Link>
            <Divider />
            <Link to="/friends">
              <List>
                <ListItem button key="Friends">
                  <ListItemIcon><PersonPin className={classes.icons} color="" /></ListItemIcon>
                  <ListItemText primary="Friends" />
                </ListItem>
              </List>
            </Link>
            <Link to="/">
              <List>
                <ListItem button key="Reviews">
                  <ListItemIcon><ThumbsUpDown className={classes.icons} color="" /></ListItemIcon>
                  <ListItemText primary="Reviews" />
                </ListItem>
              </List>
            </Link>
          </Drawer>
        </div>
      );
    }
}

NavPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(NavPanel);
