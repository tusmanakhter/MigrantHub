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
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import { toast } from 'react-toastify';
import FormValidator from 'forms/FormValidator';
import Validations from 'forms/Validations';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  },
    ratingStar: {
        width: "24px",
        height: "24px",
    }
};

class Reviews extends Component {
  constructor(props) {
    super(props);

      this.validator = new FormValidator(Validations.reviewPost);

      this.state = {
      redirectTo: false,
      redirectToURL: '',
      redirectState: {},
      rating: 1,
      comment: '',
      addReviewMessage: '',
      addReviewError: false,
      currentReviewSet: [],
      validation: this.validator.valid(),
      postLoading: false,
      deleteLoading: false,
    };
  }

  componentDidMount() {
    this.getReviews();
  }

    componentWillReceiveProps(props) {

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

  handleStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

    handlePostReview = async () => {
        try {
            const result = await axios.post('/api/services/' + this.props.serviceId + '/reviews/', qs.stringify({
                serviceId: this.props.serviceId,
                rating: this.state.rating,
                comment: this.state.comment
            }))
            if (result.status === 200) {
                toast.success('Review Posted.');
                this.getReviews();
            }
            return false;
        } catch (e) {
            toast.error('Error posting review.');
            return true;
        }
    }

    handleDeleteReview = async (id) => {
        try {
            const result = await axios.delete('/api/services/' + this.props.serviceId + '/reviews/' + id)
            if (result.status === 200) {
                toast.success('Review Deleted');
                this.getReviews();          }
            return false;
        } catch (e) {
            toast.error('Error deleting review.');
            return true;
        }
    };

    validate = () => {
        const validation = this.validator.validate(this.state);
        this.setState(prevState => ({
            validation: {
                ...prevState.validation,
                ...validation,
            },
        }));

        return validation.isValid;
    };

    handlePost = async () => {
        const isValid = await this.validate();

        if (isValid) {
            this.setState({
               postLoading: true,
            });
            await this.handlePostReview();
            this.props.handleUpdate();

            this.setState({
                postLoading: false,
            });
        }
    };

    handleDelete = async (id) => {
        this.setState({
            deleteLoading: true,
        });
        await this.handleDeleteReview(id);
        this.props.handleUpdate();

        this.setState({
            deleteLoading: false,
        });
    };

  render() {
      const { classes, avgRating, countRating } = this.props;
      const { rating, comment, validation, currentReviewSet, postLoading, deleteLoading } = this.state;

      let postReviewButtonMessage;
      if (postLoading) {
          postReviewButtonMessage = (
              <>
              <CircularProgress size={30} color="inherit" />
              </>
          );
      } else {
          postReviewButtonMessage = (
              <>
              Post Review
              </>
          );
      }

      let deleteReviewButtonMessage;
      if (deleteLoading) {
          deleteReviewButtonMessage = (
              <>
              <CircularProgress size={30} color="inherit" />
              </>
          );
      } else {
          deleteReviewButtonMessage = (
              <>
              <DeleteIcon style={{ marginLeft: 5 }} />
              Delete Review
              </>
          );
      }

    return (
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="rose" icon>
            <CardIcon color="rose">
              <Review />
            </CardIcon>
              <br />
              <br />
            <h4 className={classes.cardIconTitle}>
                    Reviews
                    <br/>
                  {`${avgRating}`}
                  <StarRatingComponent
                      name="averageRating"
                      editing={false}
                      starCount={5}
                      value={avgRating}
                  />
                  {`(${countRating} ratings)`}
              </h4>

          </CardHeader>
          <CardBody>
            <AuthConsumer>
              {({ user }) => (
                <div>
                    { user.type !== UserTypes.ADMIN
                      && (
                        <div>
                          <br></br>
                            <Grid container alignItems="center" spacing={8}>
                                <GridItem lg={2} md={2} sm={12} xs={12}>
                                    <br></br>
                                    <StarRatingComponent
                                        name="rate"
                                        starCount={5}
                                        value={rating}
                                        onStarClick={this.handleStarClick.bind(this)}
                                    />
                                </GridItem>
                                <GridItem lg={8} md={8} sm={12} xs={12}>
                                <TextField
                                  id="comment"
                                  name="comment"
                                  label="Comment"
                                  value={comment}
                                  onChange={event => this.handleChange(event)}
                                  fullWidth
                                  helperText={validation.comment.message}
                                  error={validation.comment.message.length > 0}
                                  multiline
                                  rows="2"
                                />
                              </GridItem>
                                {(currentReviewSet.find(reviewObject => reviewObject.user===user.username))==undefined ?
                                    <GridItem lg={2} md={2} sm={12} xs={12}>
                                <br></br>
                                  <Button
                                      type="submit"
                                      color="primary"
                                      variant="contained"
                                      onClick={this.handlePost}
                                      className={classes.btn}
                                  >
                                      {postReviewButtonMessage}
                                  </Button>
                              </GridItem>
                                    : ''}
                            </Grid>
                          <br></br>
                        </div>
                      )
                    }
                  <hr></hr>
                  <div style={{margin: "20px"}}>
                    {
                      currentReviewSet.map( review => (
                          <div>
                            <Grid container alignItems="center" spacing={8}>
                                <GridItem lg={2} md={2} sm={12} xs={12}>
                                  <div>
                                    <StarRatingComponent
                                      name="userRate"
                                      editing={false}
                                      starCount={5}
                                      value={review.rating}
                                    />
                                  </div>
                              </GridItem>
                                <GridItem lg={6} md={6} sm={12} xs={12}>
                                <Typography variant="h5" color="inherit" paragraph>
                                  {review.comment}
                                </Typography>
                              </GridItem>
                                <GridItem lg={2} md={2} sm={12} xs={12}>
                                    <Typography variant="h6" color="inherit" paragraph>
                                        <p>{review.time}</p>
                                    </Typography>
                                </GridItem>
                                { ((user.type === UserTypes.ADMIN) || user.username === (review.user))
                                &&
                                <GridItem lg={2} md={2} sm={12} xs={12}>
                                    <br></br>
                                    <Button
                                        type="submit"
                                        color="secondary"
                                        variant="contained"
                                        onClick={()=>this.handleDelete(review._id)}
                                        className={classes.btn}
                                    >
                                        {deleteReviewButtonMessage}
                                    </Button>
                                </GridItem>
                                }
                            </Grid>
                            <hr></hr>
                          </div>
                      ))
                    }
                  </div>
                </div>
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
