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

class Chatbot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userMessage: '',
      userRequest: '',
      conversation: [],
      redirectToRecommendation: false,
      suggestServiceId: 0,
      finishedSuggestionServiceFetch: false,
      redirectToAllServices: false,
      redirectToAllEvents: false,
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
        this.renderRedirectToRecommendationService();
      }
      else if(intent == 'help - services'){
        this.setState({
          redirectToAllServices: true,
        });
      }
      else if(intent == 'help - events'){
        this.setState({
          redirectToAllEvents: true,
        });
      }
    })
  }

  keyPress = event => {
    if(event.keyCode == 13) {
      this.handleSubmit(event);
    }
  }

  renderRedirectToRecommendationService = () => {
    const redirectToRecommendation = this.state.redirectToRecommendation;
    if (redirectToRecommendation) {
      axios.get('/api/services/recommendations').then((response) => {
        this.setState({
          suggestServiceId: response.data[0]._id,
          finishedSuggestionServiceFetch: true,
        });
      });
    }
  }

  render() {
    if(this.state.redirectToRecommendation && this.state.serviceId != 0 && this.state.finishedSuggestionServiceFetch){
      this.setState({
        redirectToRecommendation: false,
        finishedSuggestionServiceFetch: false,
      });
      return <Redirect to={`/services/${this.state.suggestServiceId}`} />
    }
    else if(this.state.redirectToAllServices){
      this.setState({
        redirectToAllServices: false,
      });
      return <Redirect to="/services" />
    }
    else if(this.state.redirectToAllEvents){
      this.setState({
        redirectToAllEvents: false,
      });
      return <Redirect to="/events" />
    }
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
