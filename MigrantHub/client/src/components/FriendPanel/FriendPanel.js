
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import yes from './yes.svg';
import no from './no.svg';
import axios from 'axios';

var qs = require('qs');
class FriendPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addFriendTextValue: '',
      friendRequests: [],
    };
    this.getFriendRequests= this.getFriendRequests.bind(this);
}
    acceptFriendRequest(event, _id, requestFromP, requestToP, index){
      event.handleDeleteRow(index)
      axios.post('/friend/acceptFriendRequest',
          qs.stringify({
              _id: _id,
              requestFrom: requestFromP,
              requestTo: requestToP,
          })).then(function (response) {
            event.getFriendRequests(event);
          });
    }

    rejectFriendRequest(event, _id, index){
      event.handleDeleteRow(index)
      axios.post('/friend/rejectFriendRequest',
          qs.stringify({
              _id: _id,
          })).then(function (response) {
            event.getFriendRequests(event);
          });
    }


  getFriendRequests(ev){
    axios.get('/friend/view')
        .then(function(response) {
            console.log(response.data)
            ev.setState({friendRequests: response.data});
        }).catch(error => {
            console.log("Error retrieving all friends.")
    })
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
  
    handleAddFriend() {
      axios.post('/friend/add',
        qs.stringify({ 
          requestTo: this.state.addFriendTextValue 
        })
      );
    }

    componentDidMount() {
      this.getFriendRequests(this);
    }

    render(props) {
      return (
        <div>
          <Card className="Card-friend-panel">
            <CardContent>
              <p>Your list of friends:</p>
              <ul>
                {this.props.friends.map( friend =>
                  <li key={friend.id}><img src={friend.pic} alt="profile pic" className="User-avatar"/>{friend.name}</li>
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
                    <img src={request.pic} alt="profile pic" className="User-avatar"/>
                    {request.requestFrom}
                    <Grid container spacing={24}>
                      <Grid item xs={12} sm={4}
                        id="friendRequest"
                        name="friendRequest"
                        value={request.requestFrom}
                        fullWidth
                      >
                      </Grid>
                    </Grid>
                    <Button onClick={() => {this.acceptFriendRequest(this, request._id, request.requestFrom, request.requestTo, index)}} variant="contained" color="primary"><img src={yes} alt="yes"/></Button>
                    <Button onClick={() => {this.rejectFriendRequest(this, request._id, index)}} variant="contained" color="primary"><img src={no} alt="no"/></Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="Card-friend-panel">
            <CardContent>
              <p>Add Friends:</p>
              <TextField
                id="outlined-name"
                label="User's Email"
                // value=""
                value={this.state.addFriendTextValue}
                onChange={ (event) => this.handleAddFriendTextChange(event) }
                margin="normal"
                variant="outlined"
              />
              <Button variant="contained" color="primary" onClick={(event) => this.handleAddFriend(event)}>Add Friend</Button>
            </CardContent>
          </Card>
        </div>
      );
    }
  }
  export default FriendPanel;