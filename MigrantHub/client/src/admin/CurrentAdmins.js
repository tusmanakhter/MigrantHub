import React, { Component } from 'react';
import '../App.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import axios from 'axios';

class CurrentAdmins extends Component {
  constructor(props) {
    super(props);

    this.state = {users: []};
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers() {
    axios.get('/api/admins/').then((response) => {
      if (response.status === 200) {
        this.setState({
          users: response.data,
        });
      }
    });
  }

  handleDelete = (id) => {
    axios.delete('/api/admins/' + id)
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
                  <Button size="small" color="secondary" onClick={() => this.handleDelete(user._id)}>
                    Delete
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

export default CurrentAdmins;
