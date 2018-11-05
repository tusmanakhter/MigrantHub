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

class ViewEvent extends Component {

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
                    <DialogTitle id="scroll-dialog-title">{this.props.eventName}</DialogTitle>
                    <DialogContent >
                        <Typography variant="h5" color="inherit" paragraph>
                            Description:<br/><br/>{this.props.description}
                        </Typography>

                        <Grid container spacing={12}>
                            <Typography variant="h5" color="inherit" paragraph>
                                Date:
                            </Typography>
                            <Grid container spacing={12}>
                                <Grid item xs={12}>
                                    Start date: {this.props.dateStart.substring(0,10)}
                                </Grid>
                                <Grid item xs={12}>
                                    End date: {this.props.dateEnd.substring(0,10)}
                                </Grid>
                            </Grid>
                        </Grid>
                    
                        <Typography variant="h5" color="inherit" paragraph>
                            <br/>Time:
                        </Typography>

                        <Grid justify="center" container item xs>
                            <Grid container spacing={12}>
                                <Grid item xs={6}>
                                    Start time: {this.props.timeStart}
                                </Grid>
                                <Grid item xs={6}>
                                    End time: {this.props.timeEnd}
                                </Grid>
                            </Grid>
                        </Grid>

                        {this.props.location !== undefined &&(
                            <Grid container spacing={12}>
                                <Typography variant="h5" color="inherit" paragraph>
                                    <br/>Location:
                                </Typography>
                                <Grid container spacing={12}>
                                    <Grid item xs={12}>
                                        Address: {this.props.location.address}
                                    </Grid>
                                    <Grid item xs={12}>
                                        Apartment: {this.props.location.apartment}
                                    </Grid>
                                    <Grid item xs={12}>
                                        City: {this.props.location.city}
                                    </Grid>
                                    <Grid item xs={12}>
                                        Province: {this.props.location.province}
                                    </Grid>
                                    <Grid item xs={12}>
                                        Postal Code: {this.props.location.postalCode}
                                    </Grid>
                                    <Grid item xs={12}>
                                        Phone Number: {this.props.location.phoneNumber}
                                    </Grid>
                                </Grid>
                            </Grid>
                        )}
                        {this.props.open && this.props.location !== undefined &&(
                            <GoogleMaps
                                location={this.props.location}
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

ViewEvent.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ViewEvent);