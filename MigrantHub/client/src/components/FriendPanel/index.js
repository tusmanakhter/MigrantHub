
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class FriendPanel extends Component {
    render(props) {
      return (
        <div>
          <div>
            <p>Your list of friends:</p>
            <ul>
              {this.props.friends.map( friend =>
                <li key={friend.id}><img src={friend.pic} alt="profile pic" className="User-avatar"/>{friend.name}</li>
              )}
            </ul>
          </div>
          <div>
            <p>Your friend requests:</p>
          </div>
          <div>
            <p>Add Friends:</p>
            <TextField
              id="outlined-name"
              label="User's Email"
              value=""
              //TODO add handler
              // onChange={this.handleChange('name')}
              margin="normal"
              variant="outlined"
            />
            <Button variant="contained" color="primary">Add Friend</Button>
          </div>
        </div>
      );
    }
  }

  export default FriendPanel;