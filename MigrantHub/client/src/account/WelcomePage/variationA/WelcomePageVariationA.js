import React, { Component } from 'react';
import axios from 'axios';

class WelcomePageVariationA extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            dataRetrieved: false,
            firstName: '',
            lastName: '',
        };

        this.getUser = this.getUser.bind(this);
    }

    componentDidMount() {
        this.getUser(this);
    }

    componentWillReceiveProps() {
        this.getUser(this);
    }

    getUser() {
        const { dataRetrieved } = this.state;
        if (!dataRetrieved) {
            axios.get('/api/account/get/user').then((response) => {
                if (response.status === 200) {
                    this.setState({
                        email: response.data.email,
                        firstName: response.data.firstName,
                        lastName: response.data.lastName,
                        dataRetrieved: true,
                    });
                }
            });
        }
    }

    render() {
        const {firstName, lastName} = this.state;
        return (
            <React.Fragment>
                <h1>Welcome back</h1>
                <h1>{firstName + ' ' + lastName}</h1>
            </React.Fragment>
        )
    }
}

export default WelcomePageVariationA;
