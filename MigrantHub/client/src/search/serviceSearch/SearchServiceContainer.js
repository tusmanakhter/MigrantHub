import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import JobCard from 'jobs/postings/JobCard';
import { FormattedMessage } from 'react-intl';
import { AuthConsumer } from 'routes/AuthContext';
import GridContainer from 'components/Grid/GridContainer.jsx';
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';
import update from 'immutability-helper';
import GridItem from 'components/Grid/GridItem.jsx';
import ServiceCard from 'services/ServiceCard';

const styles = theme => ({
  root: {
    paddingBottom: 40,

  },
  button: {
    margin: theme.spacing.unit,
    position: 'absolute',
    right: 0,
    textTransform: 'none',
  },
  cardTitle: {
    'text-align': 'left',
  },
  emptyContainer: {
    minHeight: 200,
    maxHeight: 200,
    textAlign: 'center',
  },
});

class SearchServiceContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      redirectToSavedList: false,
      noData: false,
    };

    this.fetchData = this.fetchData.bind(this);
    this.addPinnedService = this.addPinnedService.bind(this);
  }

  componentDidMount() {
    this.fetchData(this);
  }

  componentWillReceiveProps() {
    this.fetchData(this);
  }

  setRedirectToSearchResultList = () => {
    this.setState({
      redirectToSearchResultList: true,
    });
  }

  renderRedirectToSearchResultList = () => {
    const { redirectToSearchResultList } = this.state;
    const { searchMode, searchQuery } = this.props;

    if (redirectToSearchResultList) {
      return (
        <Redirect to={{
          pathname: '/search/services',
          state: {
            searchMode,
            searchQuery,
          },
        }}
        />
      );
    }
  }

  addPinnedService(serviceId) {
    axios.put(`/api/services/pinned/${serviceId}`)
      .then((response) => {
        toast.success(response.data);
      }).catch((error) => {
        toast.success(error.response.data);
      });
  }

  fetchData = () => {
    const { searchMode, searchQuery } = this.props;

    this.setState({
      items: [],
    });

    axios.get('/api/services/', {
      params: {
        searchQuery,
        search: searchMode,
        editOwner: '',
        offset: 0,
        limit: 4,
      },
    }).then((response) => {
      if (response.data.length === 0) {
        this.setState({ moreData: false });
      } else {
        this.setState(prevState => ({
          moreData: true,
          items: response.data,
        }));
      }
    });
  }


  render() {
    const { classes, ...rest } = this.props;
    const { items, noData } = this.state;
    return (
      <React.Fragment>
        {this.renderRedirectToSearchResultList()}
        {noData == false
          && (
          <Button
            color="primary"
            className={classes.button}
            onClick={this.setRedirectToSearchResultList}
          >
            See all
          </Button>
          )
        }
        <h5 className={classes.cardTitle}>
          <b><FormattedMessage id="search.services" /></b>
        </h5>
        <hr />
        <div className={classes.mainContainer}>
          <GridContainer alignItems="left" justify="left">
            {' '}
            {
                items.map((item, index) => (
                  <GridItem>
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
                      pinIcon={<i className="fas fa-thumbtack" />}
                      pinIconHandle={this.addPinnedService}
                      pinIconHelperText="Pin to Dashboard"
                    />
                  </GridItem>
                ))
              }
          </GridContainer>
        </div>
        { noData == true
            && (
            <div style={{ textAlign: 'left' }}>
              <h4 style={{ 'text-indent': '40px' }}>No services available</h4>
            </div>
            )
          }
      </React.Fragment>
    );
  }
}

SearchServiceContainer.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(SearchServiceContainer);
