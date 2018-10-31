import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ViewEvent from './ViewEvent';

const styles = {
    card: {
        width: '100%',
    },
    media: {
        objectFit: 'fill',
    },
};

class EventItem extends Component {
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
                        alt={this.props.eventName}
                        className={classes.media}
                        height="200"
                        src={this.props.eventImagePath}
                        title={this.props.eventName}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">
                            {this.props.eventName}
                        </Typography>
                        <Typography component="p">
                            {this.props.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" onClick={this.handleClickOpen}>
                        View Event
                    </Button>
                    <ViewEvent
                        open={this.state.open}
                        scroll={this.state.scroll}
                        onClose={this.handleClose}
                        eventName={this.props.eventName}
                        eventImagePath={this.props.eventImagePath}
                        description={this.props.description}
                        location={this.props.location}
                        startDate={this.props.startDate}
                        endDate={this.props.endDate}
                        startTime={this.props.startTime}
                        endTime={this.props.endTime}
                    />
                </CardActions>
            </Card>
        );
    };
}

export default withStyles(styles)(EventItem);