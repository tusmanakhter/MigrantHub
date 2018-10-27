import React, { Component } from 'react';
import '../App.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

class AdminDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {users: []};
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers() {
    axios.get('/admin/accounts/unapproved').then(response => {
      if (response.status === 200) {
        this.setState({
          users: response.data
        })
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        <Grid container spacing={8}>
          {this.state.users.map((user, index) => ( 
            <React.Fragment key={index}>
              <Grid item xs={3}>
                <Paper>
                  {user.email}
                </Paper>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </React.Fragment>
    );
  }
}

export default AdminDashboard;
