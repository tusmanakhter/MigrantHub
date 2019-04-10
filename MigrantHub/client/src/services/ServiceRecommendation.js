import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import GridContainer from 'components/Grid/GridContainer.jsx';
import axios from 'axios';
import ServiceCard from 'services/ServiceCard';
import dashboardStyle from 'assets/jss/material-dashboard-pro-react/views/dashboardStyle.jsx';
import { FormattedMessage } from 'react-intl';
import GridItem from 'components/Grid/GridItem.jsx';

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
  cardTitle: {
    'text-align': 'left',
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
      <React.Fragment>
        <div className={classes.mainContainer} data-tut="reactour__recommendedServices">
          <h5 className={classes.cardTitle}>
            <b><FormattedMessage id="service.suggested" /></b>
          </h5>
          <hr />
          <GridContainer alignItems="left" justify="left">
            {' '}
            {
                items.length > 0 ? (
                  items.map(item => (
                    <GridItem>
                      <ServiceCard
                        serviceId={item._id}
                        serviceTitle={item.serviceTitle}
                        category={item.category}
                        subcategory={item.subcategory}
                        serviceLocation={item.location}
                        percentageMatch={item.percentageMatch}
                        editMode={item.editMode}
                        editOwner={item.editOwner}
                        rating={item.avgRating}
                        count={item.countRating}
                      />
                    </GridItem>
                  ))) : (
                    <div>
                      <h4 style={{ 'text-indent': '50px' }}>You have no suggested services yet</h4>
                    </div>
                )
              }
          </GridContainer>
        </div>
      </React.Fragment>
    );
  }
}

ServiceRecommendation.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(ServiceRecommendation);
