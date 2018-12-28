import React, { Component } from 'react';
import '../App.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import axios from 'axios';

class UnapprovedAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {users: []};
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers() {
    axios.get('/api/admins/unapproved').then((response) => {
      if (response.status === 200) {
        this.setState({
          users: response.data,
        });
      }
    });
  }

  handleAccept = (id) => {
    axios.put('/api/admins/' + id + '/approve')
      .then((response) => {
        if (response.status === 200) {
          this.getUsers();
        }
      });
  };

  handleReject = (id) => {
    axios.put('/api/admins/' + id + '/reject')
      .then((response) => {
        if (response.status === 200) {
          this.getUsers();
        }
      });
  };

  render() {
    const { users } = this.state;

    return (
      <React.Fragment>
        <Grid container spacing={8}>
          {users.map((user, index) => (
            <React.Fragment key={index}>
              <Grid item xs={3}>
                <Paper>
                  {user.email}
                  <Button size="small" color="primary" onClick={() => this.handleAccept(user._id)}>
                    Approve
                  </Button>
                  <Button size="small" color="secondary" onClick={() => this.handleReject(user._id)}>
                    Reject
                  </Button>
                </Paper>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </React.Fragment>
    );
  }
}

export default UnapprovedAdmin;
