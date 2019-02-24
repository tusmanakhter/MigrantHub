import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import sidebarStyle from 'assets/jss/material-dashboard-pro-react/components/sidebarStyle';
import Chatbot from 'components/Sidebar/Chatbot/Chatbot.jsx';


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

  render() {
    const {
      className, user, headerLinks, links,
    } = this.props;

    return (
      <div className={className} ref={this.setSidebarRef}>
        {user}
        {headerLinks}
        {links}
        <Chatbot />
      </div>
    );
  }
}

SidebarWrapper.propTypes = {
  className: PropTypes.string.isRequired,
  user: PropTypes.shape({}).isRequired,
  headerLinks: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
  links: PropTypes.shape({}).isRequired,
};

export default withStyles(sidebarStyle)(SidebarWrapper);
