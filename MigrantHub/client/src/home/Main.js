import React, { Component } from 'react';
import PropTypes from "prop-types";
import MainLayout from 'home/MainLayout';
import Grid from '@material-ui/core/Grid';
import ServiceCategory from 'services/ServiceCategory';
import SearchBar from 'components/SearchBar';
import FriendPanel from 'components/FriendPanel/FriendPanel';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceCategoryVisibility: true,
      friendPanelVisibility: false,
    };
  }

  render() {
    const { friendPanelVisibility, serviceCategoryVisibility } = this.state;
    const { location, history } = this.props;
    return (
      <MainLayout location={location} history={history}>
        <Grid item lg={12}>
          <div className="Main-feed">
            <SearchBar />
            <div className="">{serviceCategoryVisibility && <ServiceCategory location={location} />}</div>
          </div>
        </Grid>
      </MainLayout>
    );
  }
}

Main.propTypes = {
  location: PropTypes.string.isRequired,
  history: PropTypes.string.isRequired,
};

export default Main;
