import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class Header extends Component {
    render(props) {
      return (
        <div className="Header">
            <img src={this.props.appLogo} alt="MigrantHub Logo" className="App-logo" />
            <h1>{this.props.appName}</h1>
            <TextField
                id="outlined-search"
                label="Search field"
                type="search"
                margin="normal"
                variant="outlined"
            />
            <Button variant="contained" color="primary">
                <img src={this.props.userPic} alt="User Avatar" className="User-avatar" />
                {this.props.userName}
            </Button>
        </div>
      );
    }
  }

export default Header;