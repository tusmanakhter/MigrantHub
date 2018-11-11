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
import GoogleMaps from '../components/GoogleMaps/GoogleMaps';

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

  render() {
    const { serviceTitle, open, scroll, editMode, onClose } = this.props;
    const { redirectTo, redirectToURL, redirectState } = this.state;

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
                          Service Summary:
              <br />
              <br />
              {serviceTitle}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
                          Service Description:
              <br />
              <br />
              {serviceTitle}
            </Typography>

            {serviceTitle !== undefined && (
            <Grid container spacing={12}>
              <Typography variant="h5" color="inherit" paragraph>
                                  Service date:
              </Typography>
              <Grid container spacing={12}>
                <Grid item xs={12}>
                                      Start date:
                  {' '}
                  {serviceTitle}
                </Grid>
                <Grid item xs={12}>
                                      End date:
                  {' '}
                  {serviceTitle}
                </Grid>
              </Grid>
            </Grid>
            )}
            {serviceTitle}
            {serviceTitle}
            {serviceTitle}
            {open && serviceTitle}
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
