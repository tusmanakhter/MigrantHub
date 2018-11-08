import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ViewService from './ViewService';

const styles = {
    card: {
        width: '100%',
    },
    media: {
        objectFit: 'fill',
    },
};

class ServiceItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            scroll: 'paper',
        };
    }

    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;

        return (
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt={this.props.serviceTitle}
                        className={classes.media}
                        height="200"
                        src={this.props.serviceImagePath}
                        title={this.props.serviceTitle}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">
                            {this.props.serviceTitle}
                        </Typography>
                        <Typography component="p">
                            {this.props.serviceSummary}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" onClick={this.handleClickOpen}>
                        View Service
                    </Button>
                    <ViewService
                        open={this.state.open}
                        scroll={this.state.scroll}
                        onClose={this.handleClose}
                        serviceId={this.props.serviceId}
                        serviceTitle={this.props.serviceTitle}
                        serviceImagePath={this.props.serviceImagePath}
                        serviceDescription={this.props.serviceDescription}
                        serviceSummary={this.props.serviceSummary}
                        serviceLocation={this.props.serviceLocation}
                        serviceDate={this.props.serviceDate}
                        serviceHours={this.props.serviceHours}
                        editMode={this.props.editMode}
                        editOwner={this.props.editOwner}
                    />
                </CardActions>
            </Card>
        );
    };
}

export default withStyles(styles)(ServiceItem);