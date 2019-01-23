import React, { Component } from "react";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { TextField, withStyles } from '@material-ui/core';
import ChatBubble from "./ChatBubble";
import axios from "axios";

class Chatbot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userMessage: '',
      userRequest: '',
      conversation: [],
    };
  }

  componentDidMount() {

  }

  handleChange = event => {
    this.setState({
      userMessage: event.target.value,
      userRequest: event.target.value,
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    if(!this.state.userMessage.trim()) return;

    const msg = {
      type: 0,
      image: '',
      text: this.state.userMessage,
    };

    this.setState({
      userMessage: '',
      conversation: [...this.state.conversation, msg],
    });

    axios.get('api/chatbot/', {
      params: {
        userRequest: this.state.userRequest,
      },
    }).then((response) => {
      const msg = {
        type: 1,
        image: '',
        text: response.data,
      };

      this.setState({
        conversation: [...this.state.conversation, msg],
      });
    })
  }

  keyPress = event => {
    if(event.keyCode == 13) {
      this.handleSubmit(event);
    }
  }

  render() {
    return (
      < div >
        <GridItem>
          <Card>
            <CardHeader>
              <h6>Chatbot</h6>
              <hr />
            </CardHeader>
            <CardBody>
              <ChatBubble messages={this.state.conversation}/>
              <TextField
                id="username"
                name="username"
                label="Try me!"
                placeholder="Type 'Help' for help"
                value={this.state.userMessage}
                onChange={event => this.handleChange(event)}
                onKeyDown={event => this.keyPress(event)}
                fullWidth
              />
            </CardBody>
          </Card>
        </GridItem>
      </div >
    )
  }

}

export default (Chatbot);
