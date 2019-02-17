import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import blue from '@material-ui/core/colors/blue';
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';
import axios from 'axios';
import qs from 'qs';
import UserTypes from 'lib/UserTypes';
import { AuthConsumer } from 'routes/AuthContext';

// @material-ui/icons
import Review from "@material-ui/icons/RateReview";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";

const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectTo: false,
      redirectToURL: '',
      redirectState: {},
      rating: 0,
      comment: '',
      addReviewMessage: '',
      addReviewError: false,
      currentReviewSet: [],
    };
  }

  componentDidMount() {
    this.getReviews();
  }

  getReviews = () => {
    var reviews
    //get all reviews for the service
    axios.get('/api/services/' + this.props.serviceId + '/reviews/', {
      params: {
        serviceId: this.props.serviceId,
      },
    })
    .then((response) => {
      reviews = response.data
      if (reviews) {
        this.setState({
          currentReviewSet: reviews
        })
      }
    });
  }

  handleEdit = () => {
    const { serviceId } = this.props;
    this.setState({
      redirectTo: true,
      redirectToURL: '/services/create',
      redirectState: {
        editMode: true,
        serviceId,
      },
    });
  }

  handleStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handlePostReview = () => {
    axios.post('/api/services/' + this.props.serviceId + '/reviews/', qs.stringify({
      serviceId: this.props.serviceId,
      rating: this.state.rating,
      comment: this.state.comment
    }))
    .then((response) => {
        if (response.status === 200) {
            this.setState({
                addReviewMessage: response.data,
                addReviewError: false,
            });
            this.getReviews();
        }
    }).catch((error) => {
        this.setState({
            addReviewMessage: error.response.data,
            addReviewError: true,
        });
    });
  }

  handleDeleteReview = (id) => {
    axios.delete('/api/services/' + this.props.serviceId + '/reviews/' + id)
      .then((response) => {
        if (response.status === 200) {
          this.getReviews();
        }
      });
  };

  render() {
    const { serviceTitle, open, scroll, editMode, onClose, classes } = this.props;
    const { redirectTo, redirectToURL, redirectState, rating, comment, addReviewMessage, addReviewError, currentReviewSet } = this.state;

    if (redirectTo) {
      return (
        <Redirect to={{
          pathname: redirectToURL,
          state: redirectState,
        }}
        />
      );
    }

    return (
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="rose" icon>
            <CardIcon color="rose">
              <Review />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>Reviews</h4>
          </CardHeader>
          <CardBody>
            <AuthConsumer>
              {({ user }) => (
                <GridContainer>
                    { user.type !== UserTypes.ADMIN 
                      && (
                        <React.Fragment>
                          <br></br>
                            <Grid container alignItems="center" spacing={8}>
                              <GridItem xs={12} sm={2} md={2} lg={2}>
                                <div>
                                  <br></br>
                                  <StarRatingComponent 
                                    name="rate" 
                                    starCount={5}
                                    value={rating}
                                    onStarClick={this.handleStarClick.bind(this)}
                                  />
                                </div>
                              </GridItem>
                              <GridItem xs={12} sm={8} md={8} lg={8}>
                                <TextField
                                  id="comment"
                                  name="comment"
                                  label="Comment"
                                  multiline
                                  rows="3"
                                  value={comment}
                                  onChange={event => this.handleChange(event)}
                                  fullWidth
                                  helperText={addReviewMessage}
                                  error={addReviewError}
                                />
                              </GridItem>
                              <GridItem xs={12} sm={2} md={2} lg={2}>
                                <br></br>
                                <Button onClick={this.handlePostReview} color="primary">
                                  Post Review
                                </Button>
                              </GridItem>
                            </Grid>
                          <br></br>
                        </React.Fragment>
                      )
                    }
                  <hr></hr>
                  <div style={{margin: "20px"}}>
                    {
                      currentReviewSet.map((review) => {
                        return (
                          <div>
                            <Grid container alignItems="center" spacing={8}>
                            <GridItem xs={12} sm={2} md={2} lg={2}>
                                  <div>
                                    <StarRatingComponent 
                                      name="rate" 
                                      editing={false}
                                      starCount={5}
                                      value={review.rating}
                                    />
                                  </div>
                              </GridItem>
                              <GridItem xs={12} sm={8} md={8} lg={8}>
                                <Typography variant="h5" color="inherit" paragraph>
                                  {review.comment}
                                </Typography>
                              </GridItem>
                              <GridItem xs={12} sm={2} md={2} lg={2}>
                                <Typography variant="h5" color="inherit" paragraph>
                                  <p>{review.time}</p>
                                </Typography>
                              </GridItem>
                              <Grid item xs={1}>
                              { ((user.type === UserTypes.ADMIN) || user.username === (review.user))
                              &&
                                <Button size="small" color="secondary" onClick={() => {this.handleDeleteReview(review._id)}}>
                                  Delete
                                </Button>
                              }
                              </Grid>
                            </Grid>
                            <hr></hr>
                          </div>
                        )
                      })
                    }
                  </div>
                  {editMode && (
                    <Button onClick={this.handleEdit} color="primary">
                      Edit
                    </Button>
                  )}
                </GridContainer>
              )}
            </AuthConsumer>
          </CardBody>
        </Card>
      </GridItem>
    );
  }
}

Reviews.propTypes = {
  serviceId: PropTypes.string.isRequired,
  serviceTitle: PropTypes.string.isRequired,
  scroll: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
};

export default withStyles(styles)(Reviews);
