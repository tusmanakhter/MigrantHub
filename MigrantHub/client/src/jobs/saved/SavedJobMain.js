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
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import { toast } from 'react-toastify';
import update from 'immutability-helper';
import GridItem from 'components/Grid/GridItem.jsx';

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

class SavedJobMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      redirectToSavedList: false,
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

  setRedirectToSavedList = () => {
    this.setState({
      redirectToSavedList: true,
    });
  }

  renderRedirectToSavedList = () => {
    const { redirectToSavedList } = this.state;
    if (redirectToSavedList) {
      return <Redirect to="jobs/saved" />;
    }
  }

  addSavedJob = (jobId) => {
    axios.put(`/api/job/saved/${jobId}`)
      .then((response) => {
        if (response.status === 200) {
          toast.success('Job Post Saved!');
        }
      }).catch((error) => {
        toast.error('Error Saving Job Post!');
      });
  };

  deleteSavedJob = (jobId, index) => {
    axios.delete(`/api/job/saved/${jobId}`)
      .then((response) => {
        if (response.status === 200) {
          this.setState(prevState => ({
            items: update(prevState.items, { $splice: [[index, 1]] }),
          }));
          toast.success('Job Post Unsaved!');
          this.fetchData();
        }
      }).catch((error) => {
        toast.error('Error Unsaving Job Post!');
      });
  };

  fetchData = (props) => {
    axios.get('/api/job/saved', {
      params: {
        offset: 0,
        limit: 4,
      },
    }).then((response) => {
      if (response.data.length === 0) {
        this.setState({
          noData: true,
        });
      } else {
        this.setState({
          items: response.data,
        });
      }
    });
  }

  render() {
    const { classes, ...rest } = this.props;
    const { items, noData } = this.state;
    return (
      <React.Fragment>
        {this.renderRedirectToSavedList()}
        {noData == false
          && (
          <Button
            color="primary"
            className={classes.button}
            onClick={this.setRedirectToSavedList}
          >
            See all
          </Button>
          )
        }
        <h5 className={classes.cardTitle}>
          <b><FormattedMessage id="job.saved" /></b>
        </h5>
        <hr />
        <div className={classes.mainContainer}>
          <GridContainer alignItems="left" justify="left">
            {' '}
            {
                items.map((item, index) => (
                  <GridItem>
                    <JobCard
                      smallCard
                      jobId={item._id}
                      title={item.title}
                      description={JSON.parse(item.description).blocks[0].text}
                      companyName={item.companyName}
                      location={item.location}
                      dateCreated={item.dateCreated}
                      savedJob
                      itemIndex={index}
                      addSavedJob={() => {}}
                      deleteSavedJob={this.deleteSavedJob}
                    />
                  </GridItem>
                ))
              }
          </GridContainer>
        </div>
        { noData == true
            && (
            <div style={{textAlign: "left"}}>
              <h4 style={{ 'text-indent': '40px' }}><FormattedMessage id="job.saved.empty" /></h4>
            </div>
            )
          }
      </React.Fragment>
    );
  }
}

SavedJobMain.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(SavedJobMain);
