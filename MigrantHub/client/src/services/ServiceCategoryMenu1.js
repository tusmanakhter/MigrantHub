import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { serviceCategories } from 'lib/ServiceCategories';
import { Redirect } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import Menu, { SubMenu, MenuItem } from 'rc-menu';
import 'rc-menu/assets/index.css';

const styles = theme => ({
  menu: {
    maxWidth: 500,
    zIndex: 1000,
    background: 'white',
  },
  submenu: {
    zIndex: 1501,
    background: 'white',
  },
});

class ServiceCategoryMenu1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectTo: false,
      redirectToURL: '',
      redirectState: {},
    };
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

  handleCategoryClick(category, subcategory) {
    const selectedCategory = category;
    this.setState({
      redirectTo: true,
      redirectToURL: '/services',
      redirectState: {
        category: selectedCategory,
        subcategory,
      },
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <div className={classes.menu}>
          {this.renderRedirectTo()}
          <Menu>
            <MenuItem
              onClick={() => this.handleCategoryClick('', '')}
            >
              All Services
            </MenuItem>
            {serviceCategories.map(category => (
              category.SubCategories ? (
                <SubMenu
                  title={category.label}
                  popupClassName={classes.submenu}
                  onTitleClick={() => this.handleCategoryClick(category.value, '')}
                  key={category._id}
                >
                  {category.SubCategories.map(subcategory => (
                    <MenuItem
                      onClick={() => this.handleCategoryClick(category.value, subcategory.value)}
                    >
                      {subcategory.label}
                    </MenuItem>
                  ))}
                </SubMenu>
              ) : (
                <MenuItem
                    onClick={() => this.handleCategoryClick(category.value, '')}
                  >
                    {category.label}
                  </MenuItem>
              )))}
          </Menu>
        </div>
      </React.Fragment>
    );
  }
}

ServiceCategoryMenu1.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(ServiceCategoryMenu1);
