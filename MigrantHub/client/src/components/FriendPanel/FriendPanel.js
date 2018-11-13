
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import PersonAddDisabled from '@material-ui/icons/PersonAddDisabled';
import axios from 'axios';
import yes from './yes.svg';
import no from './no.svg';

const qs = require('qs');

class FriendPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addFriendTextValue: '',
      addFriendError: false,
      addFriendMessage: '',
      friendRequests: [],
      friendsList: [],
    };
    this.getFriendRequests = this.getFriendRequests.bind(this);
    this.getFriendsList = this.getFriendsList.bind(this);
  }

  componentDidMount() {
    this.getFriendRequests(this);
    this.getFriendsList(this);
  }

  getFriendsList(event) {
    axios.get('/api/friend/getfriendslist')
      .then((response) => {
        if (response.data) {
          event.setState({ friendsList: response.data[0].friendsList });
        }
      }).catch((error) => { });
  }

  rejectFriendRequest(event, _id, index) {
    event.handleDeleteRow(index);
    axios.post('/api/friend/rejectfriendrequest',
      qs.stringify({
        _id,
      })).then((response) => {
      });
    event.getFriendRequests(event); //to update friend request list
  }

  getFriendRequests(event) {
    axios.get('/api/friend/getrequests')
      .then((response) => {
        event.setState({ friendRequests: response.data });
      }).catch((error) => { });
  }

  handleDeleteRow(index) {
    const rows = [...this.state.friendRequests];
    rows.splice(index, 1);
    this.setState({
      friendRequests: rows,
    });
  }

  handleAddFriendTextChange(event) {
    this.setState({
      addFriendTextValue: event.target.value,
    });
  }

  acceptFriendRequest(event, _id, requestFromP, requestToP, index) {
    event.handleDeleteRow(index);
    axios.post('/api/friend/acceptfriendrequest',
      qs.stringify({
        _id,
        requestFrom: requestFromP,
        requestTo: requestToP,
      })).then((response) => {
        event.getFriendsList(event); // to update friends list list
        event.getFriendRequests(event); // to update friend request list
      });
  }

  handleAddFriend = () => {
    axios.post('/api/friend/add',
      qs.stringify({
        requestTo: this.state.addFriendTextValue,
      }))
      .then((response) => {
        this.setState({
          addFriendMessage: response.data.message,
          addFriendError: response.data.isError,
        });
      });
  }

  unfriend(event, friendid, index) {
    event.handleUnfriendRow(index);
    axios.post('/api/friend/unfriend',
      qs.stringify({
        friendId: friendid,
      })).then((response) => {
      });
  }

  handleUnfriendRow(index) {
    const rows = [...this.state.friendsList];
    rows.splice(index, 1);
    this.setState({
      friendsList: rows,
    });
  }


  render() {
    return (
      <div>
        <Card className="Card-friend-panel">
          <CardContent>
            <p>Your list of friends:</p>
            <ul>
              {this.state.friendsList.map((list, index) => (
                <li key={list.friend_id}>
                  <img src={list.pic} alt="profile pic" className="User-avatar" />
                  {list.friend_id}
                  <IconButton onClick={() => { this.unfriend(this, list.friend_id, index); }} aria-label="Delete">
                    <PersonAddDisabled fontSize="small" />
                  </IconButton>
                  <Grid container spacing={24}>
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      id="friendRequest"
                      name="friendRequest"
                      value={list.requestFrom}
                      fullWidth
                    />
                  </Grid>
                </li>
              ))}
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
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      id="friendRequest"
                      name="friendRequest"
                      value={request.requestFrom}
                      fullWidth
                    />
                    <Button onClick={() => { this.acceptFriendRequest(this, request._id, request.requestFrom, request.requestTo, index); }} variant="contained" color="primary"><img src={yes} alt="yes" /></Button>
                    <Button onClick={() => { this.rejectFriendRequest(this, request._id, index); }} variant="contained" color="primary"><img src={no} alt="no" /></Button>
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
              onChange={event => this.handleAddFriendTextChange(event)}
              margin="normal"
              variant="outlined"
              helperText={this.state.addFriendMessage}
              error={this.state.addFriendError}
            />
            <Button variant="contained" color="primary" onClick={event => this.handleAddFriend()}>Add Friend</Button>
          </CardContent>
        </Card>
      </div>
    );
  }
}
export default FriendPanel;
