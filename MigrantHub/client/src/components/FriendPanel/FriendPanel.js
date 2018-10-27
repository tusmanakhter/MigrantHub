
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import yes from './yes.svg';
import no from './no.svg';
import axios from 'axios';

var qs = require('qs');

class FriendPanel extends Component {
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
              {this.props.friendRequests.map( request =>
                <li key={request.id}>
                  <img src={request.pic} alt="profile pic" className="User-avatar"/>
                  {request.name}
                  <Button variant="contained" color="primary"><img src={yes} alt="yes"/></Button>
                  <Button variant="contained" color="primary"><img src={no} alt="no"/></Button>
                </li>
              )}
            </ul>
          </CardContent>
        </Card>
        <Card className="Card-friend-panel">
          <CardContent>
            <p>Add Friends:</p>
            <TextField
              id="outlined-name"
              label="User's Email"
              value=""
              //value={this.state.addFriendTextValue}
              // onChange={this.handleAddFriendTextChange('name')}
              margin="normal"
              variant="outlined"
            />
            <Button variant="contained" color="primary" onClick={this.handleAddFriend}>Add Friend</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // handleAddFriendTextChange(e) {
  //   this.setState({
  //     // addFriendTextValue: e.target.value
  //   });
  // }

  handleAddFriend(event) {
    axios.post('/friend/add',
      qs.stringify({
          //TODO read requestTo from input box
          requestTo: "test1@test.com",
          // requestTo: {this:state.addFriendTextValue},
      })
    );
  }
}

  export default FriendPanel;