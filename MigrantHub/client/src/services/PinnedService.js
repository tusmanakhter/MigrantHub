import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';
import ServiceCard from 'services/ServiceCard';
import GridContainer from 'components/Grid/GridContainer.jsx';
import { FormattedMessage } from 'react-intl';
import { AuthConsumer } from 'routes/AuthContext';
import Grid from '@material-ui/core/Grid';
import InfiniteScroll from 'react-infinite-scroller';
import CircularProgress from '@material-ui/core/CircularProgress';

// @material-ui/icons
import Close from '@material-ui/icons/Close';

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
    'text-align': 'left',
  },
  emptyDashboard: {
    'text-align': 'left',
  },
});

class PinnedService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      offset: 0,
      limit: 20,
      moreData: true,
    };
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

  deletePinnedService = (serviceId) => {
    const { items, offset } = this.state;
    axios.delete(`/api/services/pinned/${serviceId}`)
      .then((response) => {
        toast.success(response.data);
        items.splice(items.findIndex(i => i._id === serviceId), 1);
        this.setState({
          items,
          offset: offset - 1,
        });
      }).catch((error) => {
        toast.success(error.response.data);
      });
  };

  render() {
    const { classes } = this.props;
    const { items, moreData } = this.state;
    return (
      <AuthConsumer>
        {({ user }) => (
          <React.Fragment>
            <div className={classes.mainContainer}  data-tut="reactour__pinnedService">
              <h5 className={classes.pageSubcategoriesTitle}>
                <b><FormattedMessage id="service.pinned.service" /></b>
              </h5>
              <hr />
              <InfiniteScroll
                pageStart={0}
                loadMore={() => this.fetchData(this.props.redirect, this.props)}
                hasMore={moreData}
                loader={(
                  <Grid item style={{ paddingBottom: 15 }}>
                    <CircularProgress className={classes.loader} disableShrink />
                  </Grid>
                )}
                threshold={-300}
                useWindow={false}
                getScrollParent={() => document.getElementById('mainPanel')}
              >
                <GridContainer spacing={16} alignItems="left" justify="left">
                  {' '}
                  {
                    items.length > 0 ? (
                      items.map(item => (
                        <GridItem height="100px">
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
                            pinIconHelperText="Remove from dashboard"
                          />
                        </GridItem>
                      ))) : (
                        <div>
                          <h4 style={{ 'text-indent': '50px' }}>You have no pinned services yet</h4>
                        </div>)
                  }
                </GridContainer>
              </InfiniteScroll>
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
