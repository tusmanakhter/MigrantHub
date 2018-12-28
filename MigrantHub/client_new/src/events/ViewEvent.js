import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import blue from '@material-ui/core/colors/blue';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import GoogleMaps from '../components/GoogleMaps/GoogleMaps';
import UserTypes from '../lib/UserTypes';

const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
};

class ViewEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectTo: false,
      redirectToURL: '',
      redirectState: {},
      type: '',
    };
  }

  componentDidMount() {
    this.getUser();
  }

  handleEdit = () => {
    const { eventId } = this.props;
    this.setState({
      redirectTo: true,
      redirectToURL: '/events/create',
      redirectState: {
        editMode: true,
        eventId,
      },
    });
  }

  handleDelete = () => {
    const { eventId, onClose, getData } = this.props;
    axios.delete('/api/events/' + eventId)
    .then(response => {
      if (response.status === 200) {
        onClose();
        getData();
      }
    });
  };

  getUser(){
    const user = JSON.parse(localStorage.getItem('user'));
    this.setState({
      type: user.type,
    })
  }

  render() {
    const {
      eventName, description, dateStart, dateEnd, timeStart, timeEnd,
      location, open, scroll, onClose,
    } = this.props;
    const { redirectTo, redirectToURL, redirectState, type } = this.state;

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
          <DialogTitle variant="title" id="scroll-dialog-title" align="center">{eventName}</DialogTitle>
          <DialogContent>
            <Typography color="inherit" paragraph align="center" variant="body1">
              {description}
            </Typography>

            <Grid container spacing={12}>
              <Typography variant="h5" color="inherit" paragraph>
                            Event Date:
              </Typography>
              <Grid container spacing={12}>
                <Grid item xs={12}>
                                Start date:
                  {' '}
                  {dateStart.substring(0, 10)}
                </Grid>
                <Grid item xs={12}>
                                End date:
                  {' '}
                  {dateEnd.substring(0, 10)}
                </Grid>
              </Grid>
            </Grid>

            <Typography variant="h5" color="inherit" paragraph>
              <br />
Event Time:
            </Typography>

            <Grid justify="center" container item xs>
              <Grid container spacing={12}>
                <Grid item xs={6}>
                                Start time:
                  {' '}
                  {timeStart}
                </Grid>
                <Grid item xs={6}>
                                End time:
                  {' '}
                  {timeEnd}
                </Grid>
              </Grid>
            </Grid>

            {location !== undefined && (
            <Grid container spacing={12}>
              <Typography variant="h5" color="inherit" paragraph>
                <br />
Location:
              </Typography>
              <Grid container spacing={12}>
                <Grid item xs={12}>
                                    Address:
                  {' '}
                  {location.address}
                </Grid>
                <Grid item xs={12}>
                                    Apartment:
                  {' '}
                  {location.apartment}
                </Grid>
                <Grid item xs={12}>
                                    City:
                  {' '}
                  {location.city}
                </Grid>
                <Grid item xs={12}>
                                    Province:
                  {' '}
                  {location.province}
                </Grid>
                <Grid item xs={12}>
                                    Postal Code:
                  {' '}
                  {location.postalCode}
                </Grid>
                <Grid item xs={12}>
                                    Phone Number:
                  {' '}
                  {location.phoneNumber}
                </Grid>
              </Grid>
            </Grid>
            )}
            {open && location !== undefined && (
            <GoogleMaps
              location={location}
            />
            )}
          </DialogContent>
          <DialogActions> 
            { type === UserTypes.ADMIN
               && (
                 <Button onClick={this.handleDelete} color="secondary">
                   Delete
                 </Button>
               )
            }}
            {this.props.editMode &&
              <React.Fragment>
                  <Button onClick={this.handleDelete} color="secondary">
                      Delete
                  </Button>
                  <Button onClick={this.handleEdit} color="primary">
                      Edit
                  </Button>
              </React.Fragment>
              }
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ViewEvent.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  eventId: PropTypes.string.isRequired,
  eventName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  dateStart: PropTypes.string.isRequired,
  dateEnd: PropTypes.string.isRequired,
  timeStart: PropTypes.string.isRequired,
  timeEnd: PropTypes.string.isRequired,
  location: PropTypes.shape({
    address: PropTypes.string.isRequired,
    apartment: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    province: PropTypes.string.isRequired,
    postalCode: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
  }).isRequired,
  scroll: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
  getData: PropTypes.func.isRequired,
};
export default withStyles(styles)(ViewEvent);
