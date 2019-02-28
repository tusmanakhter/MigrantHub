import React, { Component } from "react";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { TextField, withStyles } from '@material-ui/core';
import ChatBubble from "components/Sidebar/Chatbot/ChatBubble.jsx";
import { Redirect } from 'react-router-dom';
import axios from "axios";
import { watchFile } from "fs";

class Chatbot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userMessage: '',
      userRequest: '',
      conversation: [],
      redirectToRecommendation: false,
      recommendationItems: [],
      items: [],
    };
  }

  componentDidMount() {
    this.getRecommendationServiceData();
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
      response.data.fulfillmentMessages.forEach(element => {
        const msg = {
          type: 1,
          image: '',
          text: element.text.text
        };
        this.setState({
          redirectToRecommendation: false,
          conversation: [...this.state.conversation, msg],
        });
      });

      let intent = response.data.intent.displayName;
      if(intent === 'Recommendation Service'){
        this.setState({
          redirectToRecommendation: true,
        });
        // return this.renderRedirectToRecommendationService();
      }
    })
  }

  keyPress = event => {
    if(event.keyCode == 13) {
      this.handleSubmit(event);
    }
  }

  getRecommendationServiceData() {
    axios.get('/api/services/recommendation').then((response) => {
      this.setState({
        items: response.data,
      });
    });
  }

  renderRedirectToRecommendationService = () => {
    const redirectToRecommendation = this.state.redirectToRecommendation;
    if (redirectToRecommendation) {
      let serviceId = this.state.items._id;
      this.setState({
        redirectToRecommendation: false,
      });
      if(serviceId != undefined){
        return <Redirect to={`/services/${serviceId}`} />;
      }
      else{
        this.getRecommendationServiceData();
      }
    }
  }

  render() {
    return (
      < div >
      {this.renderRedirectToRecommendationService()}
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
                placeholder="Say Hi!"
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
