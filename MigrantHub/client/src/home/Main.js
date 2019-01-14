import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import HomeLayout from 'home/HomeLayout';
import MainLayout from './MainLayout';
import ServiceCategory from 'services/ServiceCategory';
import SearchBar from 'components/SearchBar';
import FriendPanel from 'components/FriendPanel/FriendPanel';
import Grid from '@material-ui/core/Grid';

class MainDashboard extends Component {

  render() {
    const { friendPanelVisibility, serviceCategoryVisibility, SearchBarVisibility } = this.props;

    return (
      <React.Fragment>
        <MainLayout>
          <SearchBar />
          <ServiceCategory location={this.props.location} />
        </MainLayout>
      </React.Fragment>
    );
  }
}

export default MainDashboard;
