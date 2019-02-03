import React from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'perfect-scrollbar';
import withStyles from '@material-ui/core/styles/withStyles';
import sidebarStyle from 'assets/jss/material-dashboard-pro-react/components/sidebarStyle';

let ps;

// We've created this component so we can have a ref to the wrapper of the links that appears in our sidebar.
// This was necessary so that we could initialize PerfectScrollbar on the links.
// There might be something with the Hidden component from material-ui, and we didn't have access to
// the links, and couldn't initialize the plugin.
class SidebarWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.sidebarWrapper = null;
    this.setSidebarRef = (element) => {
      this.sidebarWrapper = element;
    };
  }

  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(this.sidebarWrapper, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
  }

  componentWillUnmount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps.destroy();
    }
  }

  render() {
    const {
      className, user, headerLinks, links,
    } = this.props;

    return (
      <div className={className} ref={this.setSidebarRef}>
        {user}
        {headerLinks}
        {links}
      </div>
    );
  }
}

SidebarWrapper.propTypes = {
  className: PropTypes.object.isRequired,
  user: PropTypes.string.isRequired,
  headerLinks: PropTypes.string.isRequired,
  links: PropTypes.string.isRequired,
};

export default withStyles(sidebarStyle)(SidebarWrapper);
