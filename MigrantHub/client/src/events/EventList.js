import React, { Component } from 'react';
import EventItem from "./EventItem";
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import Header from '../components/Header/Header';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
});

class EventList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            redirectToCreateEvent: false,
        };

        this.getData = this.getData.bind(this);
    }


    componentDidMount() {
        this.getData(this);
    }

    componentWillReceiveProps(nextProps) {
        this.getData(this);
    }

    getData(event){
        axios.get('/events/view/all')
            .then(function(response) {
                event.setState({items: response.data});
            }).catch(error => {
        })
    }

    setRedirectToCreateEvent = () => {
        this.setState({
            redirectToCreateEvent: true
        })
    }
    renderRedirectToCreateEvent = () => {
        if (this.state.redirectToCreateEvent) {
            return <Redirect to='/events/create' />
        }
    }

    render(){
        const { classes } = this.props;
        return(
            <div>
                {this.renderRedirectToCreateEvent()}
                <Header appName='Migrant Hub' />
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={this.setRedirectToCreateEvent}
                >
                    Create Event
                </Button>
                <Paper className={classes.root} elevation={2}>
                    {
                        this.state.items.map(function(item){
                            return <EventItem
                                eventName={item.eventName}
                                eventImagePath={item.eventImagePath}
                                description={item.description}
                                location={item.location}
                                startDate={item.startDate}
                                endDate={item.endDate}
                                startTime={item.startTime}
                                endTime={item.endTime}
                            ></EventItem>
                        })
                    }
                </Paper>
            </div>
        );
    };
}

export default withStyles(styles)(EventList);