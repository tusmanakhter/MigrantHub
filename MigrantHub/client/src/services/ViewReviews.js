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
    };
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
    axios.post('/services/review',
      qs.stringify({
        serviceId: this.props.serviceId,
        rating: this.state.rating,
        comment: this.state.comment
      }))
      .then((response) => {
        this.setState({
          addReviewMessage: response.data.addReviewMessage,
          addReviewError: response.data.addReviewError,
        });
      });
  }

  render() {
    const { serviceTitle, open, scroll, editMode, onClose } = this.props;
    const { redirectTo, redirectToURL, redirectState, rating, comment, addReviewMessage, addReviewError } = this.state;

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
          <Typography variant="h5" color="inherit" paragraph>
            <u>Your Review:</u>
            <Grid container alignItems="center" spacing={0}>
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
                <Button onClick={this.handlePostReview} color="primary">
                  Post Review
                </Button>
              </Grid>
            </Grid>
          </Typography>
          <hr></hr>
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
  editMode: PropTypes.bool.isRequired,
};

export default withStyles(styles)(ViewReviews);
