import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import blue from '@material-ui/core/colors/blue';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';
import axios from 'axios';
import UserTypes from 'lib/UserTypes';
import { AuthConsumer } from 'routes/AuthContext';
import Review from "@material-ui/icons/RateReview";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import { toast } from 'react-toastify';
import SweetAlert from "react-bootstrap-sweetalert";
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import moment from 'moment';

const styles = {
    ...sweetAlertStyle,
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
      currentReviewSet: [],
      alert: null,
      };

      this.hideAlert = this.hideAlert.bind(this);
      this.cancelDelete = this.cancelDelete.bind(this);
      this.warningWithConfirmAndCancelMessage = this.warningWithConfirmAndCancelMessage.bind(this);
  }

  componentDidMount() {
    this.getReviews();
  }

    getReviews = () => {
        var reviews;
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
    };

    handleDeleteReview = async (id) => {
        this.hideAlert();
        try {
            const result = await axios.delete('/api/services/' + this.props.serviceId + '/reviews/' + id);
            if (result.status === 200) {
                toast.success('Review Deleted');
                this.getReviews();
                this.props.handleUpdate();
            }
            return false;
        } catch (e) {
            toast.error('Error deleting review.');
            return true;
        }
    };

    warningWithConfirmAndCancelMessage(id) {
        this.setState({
            alert: (
                <SweetAlert
                    warning
                    style={{ display: "block", marginTop: "-100px" }}
                    title="Are you sure?"
                    onConfirm={() => this.handleDeleteReview(id)}
                    onCancel={() => this.cancelDelete()}
                    confirmBtnCssClass={
                        this.props.classes.button + " " + this.props.classes.success
                    }
                    cancelBtnCssClass={
                        this.props.classes.button + " " + this.props.classes.danger
                    }
                    confirmBtnText="Yes, delete it!"
                    cancelBtnText="Cancel"
                    showCancel
                >
                    You will not be able to recover this service!
                </SweetAlert>
            ),
        });
    }

    cancelDelete() {
        this.setState({
            alert: (
                <SweetAlert
                    danger
                    style={{ display: "block", marginTop: "-100px" }}
                    title="Cancelled"
                    onConfirm={() => this.hideAlert()}
                    onCancel={() => this.hideAlert()}
                    confirmBtnCssClass={
                        this.props.classes.button + " " + this.props.classes.success
                    }
                >
                    Review Cancelled
                </SweetAlert>
            ),
        });
    }

    hideAlert() {
        this.setState({
            alert: null
        });
    }

  render() {
      const { classes, serviceId, avgRating, countRating } = this.props;
      const { currentReviewSet, alert } = this.state;

    return (
      <GridItem xs={12} sm={12} md={12}>
          {alert}

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
                                {(currentReviewSet.find(reviewObject => reviewObject.user===user.username))==undefined ?
                                    <GridItem lg={12} md={12} sm={12} xs={12}>
                                        <br></br>
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            component={props => <Link to={`/services/review/create/${serviceId}`} {...props} />}
                                        >
                                            Add Review
                                        </Button>
                                    </GridItem>
                                    : ''
                                }
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
                            <Grid container alignContent="center" spacing={8}>
                                <GridItem lg={6} md={6} sm={12} xs={12}>
                                    <Grid container alignContent="flex-start" spacing={8}>
                                        <GridItem lg={12} md={12} sm={12} xs={12} align='left'>
                                            <b>{review.user}</b>
                                        </GridItem>
                                        <GridItem lg={12} md={12} sm={12} xs={12} align='left'>
                                          <div>
                                            <StarRatingComponent
                                              name="userRate"
                                              editing={false}
                                              starCount={5}
                                              value={review.rating}
                                            />
                                          </div>
                                        </GridItem>
                                        <GridItem lg={12} md={12} sm={12} xs={12} align='left'>
                                            <p>{moment(review.time).format('MMM DD, YYYY')}</p>
                                        </GridItem>
                                    </Grid>
                                </GridItem>
                                <GridItem lg={6} md={6} sm={12} xs={12}>
                                    <Grid container alignContent="center" spacing={8}>
                                        <GridItem lg={12} md={12} sm={12} xs={12} align='left'>
                                            <b>{review.title}</b>
                                        </GridItem>
                                        <GridItem lg={12} md={12} sm={12} xs={12} align='left'>
                                            <p>{review.comment}</p>
                                        </GridItem>
                                        { ((user.type === UserTypes.ADMIN) || user.username === (review.user))
                                        &&
                                        <GridItem lg={12} md={12} sm={12} xs={12} align='left'>
                                            <Button
                                                onClick={()=>this.warningWithConfirmAndCancelMessage(review._id)}
                                                color="primary"
                                                variant="contained"
                                            >
                                                Delete
                                            </Button>
                                            <br />
                                        </GridItem>
                                        }
                                    </Grid>
                                </GridItem>
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
    avgRating: PropTypes.string.isRequired,
    countRating: PropTypes.string.isRequired,
    handleUpdate: PropTypes.func.isRequired,
};

export default withStyles(styles)(Reviews);
