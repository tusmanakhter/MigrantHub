import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import GridContainer from "components/Grid/GridContainer.jsx";
import axios from 'axios';
import ServiceItem from 'services/ServiceItem';
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

const styles = theme => ({
  ...dashboardStyle,
  card: {
    maxWidth: 100,
    padding: 20,
  },
  media: {
    paddingTop: '0%', // 16:9,
    maxWidth: 200,
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

class ServiceRecommendation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      editMode: '',
      editOwner: '',
    };

    this.getData = this.getData.bind(this);
  }

  componentDidMount(props) {
    this.getData(this, props);
  }

  componentWillReceiveProps(props) {
    this.getData(this, props);
  }

  getData(event, props = this.props) {
    const { location } = props;
    let editOwnerEmail = '';
    let searchQuery = '';
    let searchMode = false;
    let category = '';
    let subcategory = '';

    if (location.state) {
      if (location.state.editMode) {
        this.setState({
          editMode: location.state.editMode,
          editOwner: location.state.editOwner,
        });

        editOwnerEmail = location.state.editOwner;
      } else if (location.state.searchMode) {
        searchMode = location.state.searchMode;
        searchQuery = location.state.searchQuery;
      } else if (location.state.category) {
        category = location.state.category;
        subcategory = location.state.subcategory;
      }
    }
    axios.get('/api/services/', {
      params: {
        editOwner: editOwnerEmail,
        searchQuery: searchQuery,
        search: searchMode,
        category: category,
        subcategory: subcategory,
      },
    }).then((response) => {
      this.setState({
        items: response.data,
      });
    });
  }

  render() {
    const { classes, ...rest } = this.props;
    const { items, editMode, editOwner } = this.state;
    return (
      <Card style={{ padding: '20px' }}>
        <CardHeader>
          <h4 className={classes.cardTitle}>Suggested Services</h4>
        </CardHeader>
        <React.Fragment>
          <div className={classes.mainContainer}>
            <GridContainer>
              {' '}
              {
                  items.map(item => (
                    <ServiceItem
                      serviceId={item._id}
                      serviceTitle={item.serviceTitle}
                      serviceImagePath={item.serviceImagePath}
                      serviceDescription={item.serviceDescription}
                      serviceSummary={item.serviceSummary}
                      category={item.category}
                      subcategory={item.subcategory}
                      serviceLocation={item.location}
                      serviceDate={item.serviceDate}
                      serviceHours={item.serviceHours}
                      editMode={editMode}
                      editOwner={editOwner}
                      getData={this.getData}
                    />
                  ))
              }
            </GridContainer>
          </div>
        </React.Fragment>
      </Card>
    );
  }
}

ServiceRecommendation.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(ServiceRecommendation);