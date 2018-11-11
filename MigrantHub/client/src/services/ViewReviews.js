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

  handlePostReview = () => {
    const error = this.validate();
    if (!error) {
      this.createServiceReview();
    }
  };

  handleStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  validate = () => {
    //TODO validation
    let isError = false;
    return isError;
  }

  createServiceReview = () => {
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
            <h2>Your Review:</h2>
            <Typography variant="h5" color="inherit" paragraph>
              Rating:
              <div>
                <StarRatingComponent 
                  name="rate" 
                  starCount={5}
                  value={rating}
                  onStarClick={this.handleStarClick.bind(this)}
                />
              </div>
            </Typography>
            <TextField
                id="comment"
                name="comment"
                label="Your Comment:"
                value={comment}
                onChange={event => this.handleChange(event)}
                fullWidth
                helperText={addReviewMessage}
                error={addReviewError}
              />
            <Button onClick={this.handlePostReview} color="primary">
              Post Review
            </Button>
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
