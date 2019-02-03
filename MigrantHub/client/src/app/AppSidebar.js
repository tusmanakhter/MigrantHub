import React from 'react';
import PropTypes from 'prop-types';
import UserTypes from 'lib/UserTypes';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import cx from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';
import Collapse from '@material-ui/core/Collapse';
import Icon from '@material-ui/core/Icon';
import PermIdentity from '@material-ui/icons/PermIdentity';
import ViewList from '@material-ui/icons/ViewList';
import Event from '@material-ui/icons/Event';
import Logout from 'components/Logout';
import { FormattedMessage } from 'react-intl';
import HeaderLinks from 'components/Header/HeaderLinks.jsx';
import sidebarStyle from 'assets/jss/material-dashboard-pro-react/components/sidebarStyle.jsx';
import avatar from 'assets/img/faces/avatar.jpg';
import AppSidebarWrapper from 'app/AppSidebarWrapper';
import { AuthConsumer } from 'routes/AuthContext';

class AppSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openAvatar: false,
      miniActive: true,
      type: '',
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

  openCollapse(collapse) {
    const st = {};
    st[collapse] = !this.state[collapse];
    this.setState(st);
  }

  render() {
    const {
      classes, logo, image, logoText, routes, bgColor,
    } = this.props;

    const {
      email, firstName, lastName,
    } = this.state;

    const { caret, collapseItemMini, photo } = classes;

    const { user } = this.context;

    const itemText =
      classes.itemText +
      " " +
      cx({
        [classes.itemTextMini]: this.props.miniActive && this.state.miniActive
      });
    const collapseItemText =
      classes.collapseItemText +
      " " +
      cx({
        [classes.collapseItemTextMini]:
          this.props.miniActive && this.state.miniActive,
      });
    const userWrapperClass =
      classes.user +
      " " +
      cx({
        [classes.whiteAfter]: bgColor === "white"
      });
    
    const userComponent = (
      <div className={userWrapperClass}>
        <div className={photo}>
          <img src={avatar} className={classes.avatarImg} alt="..." />
        </div>
        <List className={classes.list}>
          <ListItem className={classes.item + " " + classes.userItem}>
            <NavLink
              to={"#"}
              className={classes.itemLink + " " + classes.userCollapseButton}
              onClick={() => this.openCollapse("openAvatar")}
            >
              <ListItemText
                primary={firstName + " " + lastName}
                secondary={(
                  <b
                    className={caret + " " + classes.userCaret + " " + (this.state.openAvatar ? classes.caretActive : "")}
                  />
                )}
                disableTypography
                className={itemText + " " + classes.userItemText}
              />
            </NavLink>
            <Collapse in={this.state.openAvatar} unmountOnExit>
              <List className={classes.list + " " + classes.collapseList}>
                <ListItem className={classes.collapseItem}>
                  <NavLink
                    to={"#"}
                    className={
                      classes.itemLink + " " + classes.userCollapseLinks
                    }
                  >
                    <span className={collapseItemMini}>
                      <PermIdentity />
                    </span>
                    <ListItemText
                      primary={<FormattedMessage id="nav.myprofile" />}
                      disableTypography
                      className={collapseItemText}
                    />
                  </NavLink>
                </ListItem>
                <ListItem className={classes.collapseItem}>
                  <NavLink
                    to={user.type === UserTypes.MIGRANT ? '/editmigrant' : user.type === UserTypes.BUSINESS ? '/editbusiness' : '/'}
                    className={
                      classes.itemLink + " " + classes.userCollapseLinks
                    }
                  >
                    <span className={collapseItemMini}>
                      <PermIdentity />
                    </span>
                    <ListItemText
                      primary={<FormattedMessage id="nav.editprofile" />}
                      disableTypography
                      className={collapseItemText}
                    />
                  </NavLink>
                </ListItem>
                <ListItem className={classes.collapseItem}>
                  <NavLink
                    to={{ pathname: '/services', state: { editOwner: email, editMode: true, searchQuery: '', searchMode: false } }}
                    className={
                      classes.itemLink + " " + classes.userCollapseLinks
                    }
                  >
                    <span className={collapseItemMini}>
                      <ViewList />
                    </span>
                    <ListItemText
                      primary={<FormattedMessage id="nav.myservices" />}
                      disableTypography
                      className={collapseItemText}
                    />
                  </NavLink>
                </ListItem>
                <ListItem className={classes.collapseItem}>
                  <NavLink
                    to={{ pathname: '/events', state: { editOwner: email, editMode: true } }}
                    className={
                      classes.itemLink + " " + classes.userCollapseLinks
                    }
                  >
                    <span className={collapseItemMini}>
                      <Event />
                    </span>
                    <ListItemText
                      primary={<FormattedMessage id="nav.myevents" />}
                      disableTypography
                      className={collapseItemText}
                    />
                  </NavLink>
                </ListItem>
              </List>
            </Collapse>
          </ListItem>
        </List>
      </div>
    );

    const links = (
      <List className={classes.list}>
        {routes.map((prop, key) => {
          if (prop.redirect) {
            return null;
          }

          if (!prop.type.includes(user.type)) {
            return null;
          }

          if (prop.collapse) {
            const navLinkClasses =
              classes.itemLink //+
            // " " +
            // cx({
            //   [" " + classes.collapseActive]: this.activeRoute(prop.path)
            // });
            const itemText =
              classes.itemText +
              " " +
              cx({
                [classes.itemTextMini]:
                  this.props.miniActive && this.state.miniActive
              });
            const collapseItemText =
              classes.collapseItemText +
              " " +
              cx({
                [classes.collapseItemTextMini]:
                  this.props.miniActive && this.state.miniActive
              });
            const { itemIcon } = classes;

            return (
              <ListItem key={key} className={classes.item}>
                <NavLink
                  to={"#"}
                  className={navLinkClasses}
                  onClick={() => this.openCollapse(prop.state)}
                >
                  <ListItemIcon className={itemIcon}>
                    {typeof prop.icon === 'string' ? (
                      <Icon>{prop.icon}</Icon>
                    ) : (
                      <prop.icon />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={prop.name}
                    secondary={
                      <b
                        className={
                          caret +
                          " " +
                          (this.state[prop.state] ? classes.caretActive : "")
                        }
                      />
                    }
                    disableTypography
                    className={itemText}
                  />
                </NavLink>
                <Collapse in={this.state[prop.state]} unmountOnExit>
                  <List className={classes.list + " " + classes.collapseList}>
                    {prop.views.map((prop, key) => {
                      if (prop.redirect) {
                        return null;
                      }
                      const navLinkClasses =
                        classes.collapseItemLink //+
                      // " " +
                      // cx({
                      //   [" " + classes[color]]: this.activeRoute(prop.path)
                      // });
                      const { collapseItemMini } = classes;

                      return (
                        <ListItem key={key} className={classes.collapseItem}>
                          <NavLink to={prop.path} className={navLinkClasses}>
                            <span className={collapseItemMini}>
                              {prop.mini}
                            </span>
                            <ListItemText
                              primary={prop.name}
                              disableTypography
                              className={collapseItemText}
                            />
                          </NavLink>
                        </ListItem>
                      );
                    })}
                  </List>
                </Collapse>
              </ListItem>
            );
          }
          const navLinkClasses = classes.itemLink;
          const itemText =
            classes.itemText +
            " " +
            cx({
              [classes.itemTextMini]:
                this.props.miniActive && this.state.miniActive,
            });
          const { itemIcon } = classes;
          return (
            <ListItem key={key} className={classes.item}>
              <NavLink to={prop.path} className={navLinkClasses}>
                <ListItemIcon className={itemIcon}>
                  {typeof prop.icon === 'string' ? (
                    <Icon>{prop.icon}</Icon>
                  ) : (
                    <prop.icon />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={prop.name}
                  disableTypography
                  className={itemText}
                />
              </NavLink>
            </ListItem>
          );
        })}
      </List>
    );

    const logoNormal =
      classes.logoNormal +
      " " +
      cx({
        [classes.logoNormalSidebarMini]:
          this.props.miniActive && this.state.miniActive
      });
    const { logoMini } = classes;
    const logoClasses =
      classes.logo +
      " " +
      cx({
        [classes.whiteAfter]: bgColor === "white"
      });

    const brand = (
      <div className={logoClasses}>
        <NavLink to="/" className={logoMini}>
          <img src={logo} alt="logo" className={classes.img} />
        </NavLink>
        <NavLink to="/" className={logoNormal}>
          {logoText}
        </NavLink>
      </div>
    );

    const drawerPaper =
      classes.drawerPaper +
      " " +
      cx({
        [classes.drawerPaperMini]:
          this.props.miniActive && this.state.miniActive
      });
    const sidebarWrapper =
      classes.sidebarWrapper +
      " " +
      cx({
        [classes.drawerPaperMini]:
          this.props.miniActive && this.state.miniActive,
        [classes.sidebarWrapperWithPerfectScrollbar]:
          navigator.platform.indexOf("Win") > -1
      });
    return (
      <div ref="mainPanel">
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="right"
            open={this.props.open}
            classes={{
              paper: drawerPaper + " " + classes[bgColor + "Background"]
            }}
            onClose={this.props.handleDrawerToggle}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {brand}
            <AppSidebarWrapper
              className={sidebarWrapper}
              user={userComponent}
              headerLinks={<HeaderLinks />}
              links={links}
            />
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: "url(" + image + ")" }}
              />
            ) : null}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            onMouseOver={() => this.setState({ miniActive: false })}
            onMouseOut={() => this.setState({ miniActive: true })}
            anchor="left"
            variant="permanent"
            open
            classes={{
              paper: drawerPaper + " " + classes[bgColor + "Background"]
            }}
          >
            {brand}
            <AppSidebarWrapper
              className={sidebarWrapper}
              user={userComponent}
              links={links}
            />
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: "url(" + image + ")" }}
              />
            ) : null}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

AppSidebar.defaultProps = {
  bgColor: "blue"
};

AppSidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  bgColor: PropTypes.oneOf(["white", "black", "blue"]),
  rtlActive: PropTypes.bool,
  color: PropTypes.oneOf([
    "white",
    "red",
    "orange",
    "green",
    "blue",
    "purple",
    "rose"
  ]),
  logo: PropTypes.string,
  logoText: PropTypes.string,
  image: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object)
};

AppSidebar.contextType = AuthConsumer;

export default withStyles(sidebarStyle)(AppSidebar);