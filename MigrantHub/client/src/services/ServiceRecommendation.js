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
    };

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData(this);
  }

  componentWillReceiveProps() {
    this.getData(this);
  }

  getData() {
    axios.get('/api/services/recommendations').then((response) => {
      this.setState({
        items: response.data,
      });
    });
  }

  render() {
    const { classes, ...rest } = this.props;
    const { items } = this.state;
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
                      percentageMatch={item.percentageMatch}
                      editMode={item.editMode}
                      editOwner={item.editOwner}
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
