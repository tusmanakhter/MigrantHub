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
import GoogleMaps from "./GoogleMaps";

const styles = {
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
};

class ViewService extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isMarkerShown: true,
        };
    }

    handleClose = () => {
        this.props.onClose();
    };

    render() {
        const { classes, onClose, ...other } = this.props;
        return(
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.handleClose}
                    scroll={this.props.scroll}
                    aria-labelledby="scroll-dialog-title"
                    fullWidth={true}
                    maxWidth = {'150'}
                >
                    <DialogTitle id="scroll-dialog-title">{this.props.serviceTitle}</DialogTitle>
                    <DialogContent >
                        <Typography variant="h5" color="inherit" paragraph>
                            Service Summary:<br/><br/>{this.props.serviceSummary}
                        </Typography>
                        <Typography variant="h5" color="inherit" paragraph>
                            Service Description:<br/><br/>{this.props.serviceDescription}
                        </Typography>

                        {this.props.serviceDate !== undefined &&(
                            <Grid container spacing={12}>
                                <Typography variant="h5" color="inherit" paragraph>
                                    Service date:
                                </Typography>
                                <Grid container spacing={12}>
                                    <Grid item xs={12}>
                                        Start date: {this.props.serviceDate.startDate.substring(0,10)}
                                    </Grid>
                                    <Grid item xs={12}>
                                        End date: {this.props.serviceDate.endDate.substring(0,10)}
                                    </Grid>
                                </Grid>
                            </Grid>
                        )}
                        {this.props.serviceHours.length>0 ? (
                            <Typography variant="h5" color="inherit" paragraph>
                                <br/>Service Hours:
                            </Typography>
                        ) : ''}
                        {this.props.serviceHours.map((item, index) => (
                            <Grid justify="center" container item xs>
                                <Grid container spacing={6}>
                                    <Grid item xs={2}>
                                        {item.serviceDay}
                                    </Grid>
                                    <Grid item xs={2}>
                                        Start time: {item.startTime}
                                    </Grid>
                                    <Grid item xs={2}>
                                        End time: {item.endTime}
                                    </Grid>
                                </Grid>
                            </Grid>
                        ))}
                        {this.props.serviceLocation !== undefined &&(
                            <Grid container spacing={12}>
                                <Typography variant="h5" color="inherit" paragraph>
                                    <br/>Location:
                                </Typography>
                                <Grid container spacing={12}>
                                    <Grid item xs={12}>
                                        Address: {this.props.serviceLocation.address}
                                    </Grid>
                                    <Grid item xs={12}>
                                        Apartment: {this.props.serviceLocation.apartment}
                                    </Grid>
                                    <Grid item xs={12}>
                                        City: {this.props.serviceLocation.city}
                                    </Grid>
                                    <Grid item xs={12}>
                                        Province: {this.props.serviceLocation.province}
                                    </Grid>
                                    <Grid item xs={12}>
                                        Postal Code: {this.props.serviceLocation.postalCode}
                                    </Grid>
                                    <Grid item xs={12}>
                                        Phone Number: {this.props.serviceLocation.phoneNumber}
                                    </Grid>
                                </Grid>
                            </Grid>
                        )}
                        {this.props.open && this.props.serviceLocation !== undefined &&(
                            <GoogleMaps
                                serviceLocation={this.props.serviceLocation}
                            />
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

ViewService.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ViewService);