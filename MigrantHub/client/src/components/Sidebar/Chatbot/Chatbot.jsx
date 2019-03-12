import React, { Component } from "react";

// core components
import { Chat, addResponseMessage } from "components/Sidebar/Chatbot/react-chatbot-popup";
import { Redirect } from 'react-router-dom';
import logo from 'assets/img/logo_transparent.png';
import axios from "axios";

class Chatbot extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  handleSubmit = (newMessage) => {
    if(!newMessage.trim()) return;

    axios.get('api/chatbot/', {
      params: {
        userRequest: newMessage,
      },
    }).then((response) => {
      response.data.fulfillmentMessages.forEach(element => {
        this.setState({
          redirectToRecommendation: false,
        });
        addResponseMessage(element.text.text[0])
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
      <Chat 
      handleNewUserMessage={this.handleSubmit} 
      profileAvatar={logo}
      title="MigrantHub Chat"
      />
    )
  }
}

export default (Chatbot);
