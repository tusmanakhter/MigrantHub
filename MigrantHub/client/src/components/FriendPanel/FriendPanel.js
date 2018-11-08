
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import PersonAddDisabled from '@material-ui/icons/PersonAddDisabled';
import yes from './yes.svg';
import no from './no.svg';
import axios from 'axios';

var qs = require('qs');
class FriendPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addFriendTextValue: '',
      addFriendError: false,
      addFriendMessage: '',
      friendRequests: [],
      friendsList: []
    };
    this.getFriendRequests = this.getFriendRequests.bind(this);
    this.getFriendsList = this.getFriendsList.bind(this);
  }

  getFriendsList(ev) {
    axios.get('/friend/getfriendslist')
      .then(function (response) {
        ev.setState({ friendsList: response.data });
      }).catch(error => { })
  }

  acceptFriendRequest(event, _id, requestFromP, requestToP, index) {
    event.handleDeleteRow(index)
    axios.post('/friend/acceptfriendrequest',
      qs.stringify({
        _id: _id,
        requestFrom: requestFromP,
        requestTo: requestToP,
      })).then(function (response) {
        //call getFriendRequests() to update list
        event.getFriendRequests(event);
      });
  }

  rejectFriendRequest(event, _id, index) {
    event.handleDeleteRow(index)
    axios.post('/friend/rejectfriendrequest',
      qs.stringify({
        _id: _id,
      })).then(function (response) {
      });
    //call getFriendRequests() to update list
    event.getFriendRequests(event);
  }


  getFriendRequests(ev) {
    axios.get('/friend/getrequests')
      .then(function (response) {
        ev.setState({ friendRequests: response.data });
      }).catch(error => { })
  }

  handleDeleteRow(index) {
    let rows = [...this.state.friendRequests]
    rows.splice(index, 1)
    this.setState({
      friendRequests: rows
    })
  }

  handleAddFriendTextChange(e) {
    this.setState({
      addFriendTextValue: e.target.value
    });
  }

  handleAddFriend = () => {
    axios.post('/friend/add',
      qs.stringify({
        requestTo: this.state.addFriendTextValue
      }))
      .then((response) => {
        this.setState({
          addFriendMessage: response.data.message,
          addFriendError: response.data.isError
        })
      }
      );
  }

  unfriend(event, _id, index) {
    event.handleUnfriendRow(index)
    axios.post('/friend/unfriend',
      qs.stringify({
        _id: _id,
      })).then(function (response) {
      });
  }

  handleUnfriendRow(index) {
    let rows = [...this.state.friendsList]
    rows.splice(index, 1)
    this.setState({
      friendsList: rows
    })
  }

  componentDidMount() {
    this.getFriendRequests(this);
    this.getFriendsList(this);
  }

  render(props) {
    return (
      <div>
        <Card className="Card-friend-panel">
          <CardContent>
            <p>Your list of friends:</p>
            <ul>
              {this.state.friendsList.map((list, index) =>
                <li key={list.friendName}>
                  <img src={list.pic} alt="profile pic" className="User-avatar" />
                  {list.friendName}
                  <IconButton onClick={() => { this.unfriend(this, list._id, index) }} aria-label="Delete">
                    <PersonAddDisabled fontSize="small" />
                  </IconButton>
                  <Grid container spacing={24}>
                    <Grid item xs={12} sm={4}
                      id="friendRequest"
                      name="friendRequest"
                      value={list.requestFrom}
                      fullWidth
                    >
                    </Grid>
                  </Grid>
                </li>
              )}
            </ul>
          </CardContent>
        </Card>
        <Card className="Card-friend-panel">
          <CardContent>
            <p>Your friend requests:</p>
            <ul>
              {this.state.friendRequests.map((request, index) => (
                <li key={request.id}>
                  <img src={request.pic} alt="profile pic" className="User-avatar" />
                  {request.requestFrom}
                  <Grid container spacing={24}>
                    <Grid item xs={12} sm={4}
                      id="friendRequest"
                      name="friendRequest"
                      value={request.requestFrom}
                      fullWidth
                    >
                    </Grid>
                    <Button onClick={() => { this.acceptFriendRequest(this, request._id, request.requestFrom, request.requestTo, index) }} variant="contained" color="primary"><img src={yes} alt="yes" /></Button>
                    <Button onClick={() => { this.rejectFriendRequest(this, request._id, index) }} variant="contained" color="primary"><img src={no} alt="no" /></Button>
                  </Grid>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="Card-friend-panel">
          <CardContent>
            <p>Add Friends:</p>
            <TextField
              id="addFriendTextbox"
              label="User Email"
              value={this.state.addFriendTextValue}
              onChange={(event) => this.handleAddFriendTextChange(event)}
              margin="normal"
              variant="outlined"
              helperText={this.state.addFriendMessage}
              error={this.state.addFriendError}
            />
            <Button variant="contained" color="primary" onClick={(event) => this.handleAddFriend()}>Add Friend</Button>
          </CardContent>
        </Card>
      </div>
    );
  }
}
export default FriendPanel;
