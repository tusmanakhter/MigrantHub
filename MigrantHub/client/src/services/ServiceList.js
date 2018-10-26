import React, { Component } from 'react';
import ServiceItem from "./ServiceItem";
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

class ServiceList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            redirectToServiceForm: false,
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
        axios.get('/services/view/all')
            .then(function(response) {
                event.setState({items: response.data});
            }).catch(error => {
        })
    }

    setRedirectToServiceForm = () => {
        this.setState({
            redirectToServiceForm: true
        })
    }
    renderRedirectToServiceForm = () => {
        if (this.state.redirectToServiceForm) {
            return <Redirect to='/services/create' />
        }
    }

    render(){
        const { classes } = this.props;
        return(
            <div>
                {this.renderRedirectToServiceForm()}
                <Header appName='Migrant Hub' />
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={this.setRedirectToServiceForm}
                >
                    Create Service
                </Button>
                <Paper className={classes.root} elevation={2}>
                    {
                        this.state.items.map(function(item){
                            return <ServiceItem
                                serviceTitle={item.serviceTitle}
                                serviceImagePath={item.serviceImagePath}
                                serviceDescription={item.serviceDescription}
                                serviceSummary={item.serviceSummary}
                                serviceLocation={item.location}
                                serviceDate={item.serviceDate}
                                serviceHours={item.serviceHours}
                            ></ServiceItem>
                        })
                    }
                </Paper>
            </div>
        );
    };
}

export default withStyles(styles)(ServiceList);