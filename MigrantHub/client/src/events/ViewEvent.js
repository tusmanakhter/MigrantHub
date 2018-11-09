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
import GoogleMaps from '../components/GoogleMaps/GoogleMaps';

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
    };
  }

  render() {
    const {
      eventName, description, dateStart, dateEnd, timeStart, timeEnd,
      location, open, scroll, onClose,
    } = this.props;

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
          <DialogTitle id="scroll-dialog-title">{eventName}</DialogTitle>
          <DialogContent>
            <Typography variant="h5" color="inherit" paragraph>
                        Description:
              <br />
              <br />
              {description}
            </Typography>

            <Grid container spacing={12}>
              <Typography variant="h5" color="inherit" paragraph>
                            Date:
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
Time:
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
};
export default withStyles(styles)(ViewEvent);
