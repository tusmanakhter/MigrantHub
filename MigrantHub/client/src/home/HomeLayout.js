import React, { Component } from 'react';
import HomeHeader from './HomeHeader';

class HomeLayout extends Component {
  render() {
    return(
      <React.Fragment>
        <HomeHeader />
        { this.props.children }
      </React.Fragment>
    );
}
}

export default HomeLayout;