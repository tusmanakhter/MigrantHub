import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import blue from '@material-ui/core/colors/blue';
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';
import axios from 'axios';
import qs from 'qs';
import UserTypes from '../lib/UserTypes';

const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
};

class ViewReviews extends Component {
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
      userType: '',
      userId: '',
    };
  }

  componentDidMount() {
    this.getReviews();
    this.getUser();
  };

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

  getUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.setState({
      userType: user.type,
      userId: user.username
    });
  }

  render() {
    const { serviceTitle, open, scroll, editMode, onClose } = this.props;
    const { redirectTo, redirectToURL, redirectState, rating, comment, addReviewMessage, addReviewError, currentReviewSet, userType, userId} = this.state;

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
      <div>
        <Dialog
          open={open}
          onClose={onClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          fullWidth
          maxWidth="150"
        >
          <DialogTitle id="scroll-dialog-title">{serviceTitle}</DialogTitle>
          <DialogContent>
              { userType !== UserTypes.ADMIN 
                && (
                  <React.Fragment>
                    <div style={{backgroundColor: "#F0F0F0"}}><div style={{margin: "20px"}}>
                     <br></br>
                    <Typography variant="h5" color="inherit" paragraph>
                      <u>Your Review:</u>
                      <Grid container alignItems="center" spacing={8}>
                        <Grid item xs={1}>
                          <div>
                            <br></br>
                            <StarRatingComponent 
                              name="rate" 
                              starCount={5}
                              value={rating}
                              onStarClick={this.handleStarClick.bind(this)}
                            />
                          </div>
                        </Grid>
                        <Grid item xs={8}>
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
                        </Grid>
                        <Grid item xs={2}>
                          <br></br>
                          <Button onClick={this.handlePostReview} color="primary">
                            Post Review
                          </Button>
                        </Grid>
                      </Grid>
                    </Typography>
                    <br></br>
                    </div></div>
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
                        <Grid item xs={1}>
                            <div>
                              <StarRatingComponent 
                                name="rate" 
                                editing={false}
                                starCount={5}
                                value={review.rating}
                              />
                            </div>
                        </Grid>
                        <Grid item xs={7}>
                          <Typography variant="h5" color="inherit" paragraph>
                            {review.comment}
                          </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography variant="h5" color="inherit" paragraph>
                            <p>{review.time}</p>
                          </Typography>
                        </Grid>
                        <Grid item xs={1}>
                        { ((userType === UserTypes.ADMIN) || userId === (review.user))
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
          </DialogContent>
          <DialogActions>
            {editMode && (
              <Button onClick={this.handleEdit} color="primary">
                    Edit
              </Button>
            )}
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ViewReviews.propTypes = {
  serviceId: PropTypes.string.isRequired,
  serviceTitle: PropTypes.string.isRequired,
  scroll: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired
};

export default withStyles(styles)(ViewReviews);
