import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';
import ServiceCard from 'services/ServiceCard';
import Button from 'components/CustomButtons/Button.jsx';
import GridContainer from "components/Grid/GridContainer.jsx";
import { FormattedMessage } from 'react-intl';
import { AuthConsumer } from 'routes/AuthContext';

// @material-ui/icons
import Close from "@material-ui/icons/Close";

// core components
import GridItem from 'components/Grid/GridItem.jsx';
import { toast } from 'react-toastify';
import { Tab } from '@material-ui/core';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  pageSubcategoriesTitle: {
    'text-align': 'left'
  },
  emptyDashboard: {
    'text-align': 'left'
  }
});

class PinnedService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      offset: 0,
      limit: 20,
      moreData: false,
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData(false, this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { location } = this.props;
    if (nextProps.location !== location) {
      this.fetchData(true, nextProps);
    }
  }

  fetchData = (redirect, props) => {
    const { limit } = this.state;
    let { offset } = this.state;

    if (redirect) {
      offset = 0;
    }

    axios.get('/api/services/pinned', {
      params: {
        offset,
        limit,
      },
    }).then((response) => {
      if (response.data.length === 0) {
        if (redirect) {
          this.setState({ items: [], moreData: false });
        } else {
          this.setState({ moreData: false });
        }
      } else if (redirect) {
        this.setState({
          items: response.data,
          moreData: true,
          offset: offset + response.data.length,
        });
      } else {
        this.setState(prevState => ({
          items: prevState.items.concat(response.data),
          offset: prevState.offset + response.data.length,
        }));
      }
    });
  }

  deletePinnedService(serviceId) {
    axios.delete('/api/services/pinned/' + serviceId)
    .then((response) => {
      toast.success(response.data)
    }).catch((error) => {
        toast.success(error.response.data)
      });
  };

  render() {
    const { classes } = this.props;
    const { items, moreData } = this.state;

    return (
      <AuthConsumer>
        {({ user }) => (
          <React.Fragment>
            <div className={classes.mainContainer}>
              <h5 className={classes.pageSubcategoriesTitle}>
                <b><FormattedMessage id="service.dashboard" /></b>
              </h5>
              <hr/>
              <GridContainer spacing={16} alignItems="center" justify="left">
                {' '}
                {
                  items.length > 0 ? (
                  items.map(item => (
                    <GridItem height='100px'>
                      <ServiceCard
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
                        rating={item.avgRating}
                        count={item.countRating}
                        pinIcon={<Close />}
                        pinIconHandle={this.deletePinnedService}
                        pinIconHelperText={"Remove from dashboard"}
                      />
                    </GridItem>
                  ))) : (
                    <div>
                      <h4 style={{'text-indent':'50px'}}>You have no pinned services yet</h4>
                    </div>)
                }
              </GridContainer>
              <GridContainer spacing={16} alignItems="center" justify="center">
                <GridItem>
                  {moreData && (
                    <Button
                      variant="contained"
                      color="info"
                      className={classes.button}
                      onClick={() => this.fetchData(false, this.props)}
                    >
                      Load More
                    </Button>
                  )}
                </GridItem>
              </GridContainer>
            </div>
          </React.Fragment>
        )}
      </AuthConsumer>
    );
  }
}

PinnedService.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(PinnedService);
