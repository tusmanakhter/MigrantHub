import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { FormattedMessage } from 'react-intl';
import { AuthConsumer } from 'routes/AuthContext';
import GridContainer from 'components/Grid/GridContainer.jsx';
import Button from '@material-ui/core/Button';
import GridItem from 'components/Grid/GridItem.jsx';
import EventCard from 'events/EventCard';

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

class SearchEventContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      redirectToSearchResultList: false,
      noData: false,
    };

    this.fetchData = this.fetchData.bind(this);
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
          pathname: 'search/events',
          state: {
            searchMode,
            searchQuery
          },
        }}
        />
      );    }
  }

  fetchData = () => {
    const { searchMode, searchQuery } = this.props;

    this.setState({
      items: [],
    });

    axios.get('/api/events/', {
      params: {
        offset: 0,
        limit: 4,
        editOwner: '',
        searchQuery,
        search: searchMode,
      },
    }).then((response) => {
      if (response.data.length === 0) {
        this.setState({
          moreData: true,
        });
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
          <b><FormattedMessage id="search.events" /></b>
        </h5>
        <hr />
        <div className={classes.mainContainer}>
          <GridContainer alignItems="left" justify="left">
            {' '}
            {
                items.map((item, index) => (
                  <GridItem>
                    <EventCard
                      eventId={item._id}
                      eventName={item.eventName}
                      eventImagePath={item.eventImagePath}
                      eventDescription={item.description}
                      eventLocation={item.location}
                      dateStart={item.dateStart}
                      dateEnd={item.dateEnd}
                      timeStart={item.timeStart}
                      timeEnd={item.timeEnd}
                    />
                  </GridItem>
                ))
              }
          </GridContainer>
        </div>
        { noData == true
            && (
            <div style={{textAlign: "left"}}>
              <h4 style={{ 'text-indent': '40px' }}>No events available</h4>
            </div>
            )
          }
      </React.Fragment>
    );
  }
}

SearchEventContainer.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(SearchEventContainer);
