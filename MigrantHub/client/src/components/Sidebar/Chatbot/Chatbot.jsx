import React, { Component } from "react";

// core components
import { Widget, addResponseMessage, addLinkSnippet } from 'react-chat-widget';
import { Redirect } from 'react-router-dom';
import logo from 'assets/img/logo_transparent.png';
import axios from "axios";

import './styles.css';  

// Count number of time Chatbot Component is called
let chatbotRenderCount = 0;

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
      redirectToFrenchClasses: false,
      redirectToHousingServices: false,
      serviceCategoryReturn: '',
      subcategory: '',
      isLoading: false,
      firstName: '',
      dataRetrieved: false,
    };
    this.getUser = this.getUser.bind(this);
  }

  componentDidMount() {
    this.getUser(this);
    // Only greet user on initial load
    if(chatbotRenderCount == 0)
      if(!this.state.isLoading){
        setTimeout(
          function() {
            addResponseMessage("Hey there " + this.state.firstName + "! Welcome to MigrantHub!");;
          }
          .bind(this),
          2000
        );
      }
    chatbotRenderCount += 1;
  }

  getUser() {
    const { dataRetrieved } = this.state;
    this.setState({ isLoading: true });
    if (!dataRetrieved) {
      axios.get('/api/accounts/get/user').then((response) => {
        if (response.status === 200) {
          this.setState({
            firstName: response.data.firstName,
            isLoading: false,
            dataRetrieved: true,
          });
        }
      });
    } else {
      this.setState({ isLoading: false });
    }
  }
  
  handleSubmit = (newMessage) => {
    if(!newMessage.trim()) return;

    let count = 1;

    axios.get('../api/chatbot/', {
      params: {
        userRequest: newMessage,
      },
    }).then((response) => {
      response.data.fulfillmentMessages.forEach(element => {
        this.setState({
          redirectToRecommendation: false,
        });
        setTimeout(
          function() {
            addResponseMessage(element.text.text[0]);
          }
          .bind(this),
          count*1000
        );
        count *= 6;
      });

      let intent = response.data.intent
      if(intent != null)
        intent = response.data.intent.displayName;

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
      else if(intent == 'Employment - Non French'){
        this.setState({
          redirectToFrenchClasses: true,
        });
        let linkToCenterClasses = {
          title: 'Our French Classes',
          link: 'https://www.therefugeecentre.org/classes',
          target: '_blank'
        };
        let linkToBookAppointment = {
          title: 'Book an appointment',
          link: 'http://tinyurl.com/y4jkubp4',
          target: '_blank'
        };
        setTimeout(
          function() {
            addLinkSnippet(linkToCenterClasses);
            addResponseMessage("If you still want to try your luck without french, you can book an appointment with us.");
          }
          .bind(this),
          count*1000
        );
        count *= 6;
        setTimeout(
          function() {
            addLinkSnippet(linkToBookAppointment);
            addResponseMessage("In the meantime, here is an organization that offers french classes you might be interested in.");
          }
          .bind(this),
          count*1000
        );
        count *= 6;
      }
      else if(intent == 'Employment - Oui French'){
        let linkToEmployementWorkshops = {
          title: 'Our Workshops',
          link: 'https://www.therefugeecentre.org/erc',
          target: '_blank'
        };
        setTimeout(
          function() {
            addLinkSnippet(linkToEmployementWorkshops);
            addResponseMessage("If you can't make it, here is a list of services I recommend.");
          }
          .bind(this),
          count*1000
        );
        count *= 6;
        this.setState({
          redirectToServiceCategory: true,
          serviceCategoryReturn: 'employement'
        });
      }
      else if(intent == 'Financial Help - Social Welfare'){
        this.setState({
          redirectToServiceCategory: true,
          serviceCategoryReturn: 'welfare'
        });
      }
      else if(intent == 'Financial Help - Social Welfare - Qualifications'){
        let linkToSocialWelfareQualifications = {
          title: 'Qualifications',
          link: 'http://tinyurl.com/y4fjpwlt',
          target: '_blank'
        };
        setTimeout(
          function() {
            addLinkSnippet(linkToSocialWelfareQualifications);
          }
          .bind(this),
          count*1000
        );
        count *= 6;
      }
      else if(intent == 'Financial Help - Banking/debt relief'){
        this.setState({
          redirectToServiceCategory: true,
          serviceCategoryReturn: 'BudgetAndDebtProblems'
        });
      }
      else if(intent == 'Financial Help - Child Benefit'){
        this.setState({
          redirectToServiceCategory: true,
          serviceCategoryReturn: 'FamilyBenefits'
        });
      }
      else if(intent == 'Financial Help - University Loans & Burseries'){
        this.setState({
          redirectToServiceCategory: true,
          serviceCategoryReturn: 'BudgetAndDebtProblems'
        });
      }
      else if(intent == 'Financial Help - Pensions'){
        this.setState({
          redirectToServiceCategory: true,
          serviceCategoryReturn: 'Pensions'
        });
      }
      else if(intent == 'Financial Help - Taxes'){
        this.setState({
          redirectToServiceCategory: true,
          serviceCategoryReturn: 'IncomeTaxes'
        });
      }
      else if(intent == 'Housing - Low-income housing'){
        this.setState({
          redirectToServiceCategory: true,
          serviceCategoryReturn: 'SocialHousing'
        });
      }
      else if(intent == 'Housing - Buy'){
        this.setState({
          redirectToServiceCategory: true,
          serviceCategoryReturn: 'Housing'
        });
      }
      else if(intent == 'Language - French' || intent == 'Language - English'){
        this.setState({
          redirectToFrenchClasses: true,
        });
        let linkToCenterClasses = {
          title: 'Our Classes',
          link: 'https://www.therefugeecentre.org/classes',
          target: '_blank'
        };
        setTimeout(
          function() {
            addLinkSnippet(linkToCenterClasses);
          }
          .bind(this),
          count*1000
        );
        count *= 6;
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
    else if(this.state.redirectToFrenchClasses){
      this.setState({
        redirectToFrenchClasses: false,
      });
      // Redirect to serviceId of the Quebec Gov. Language Classes Service
      return <Redirect to="/services/5c63a6d4e890b00034a5f159"/>
    }
    else if(this.state.redirectToServiceCategory){
      this.setState({
        redirectToServiceCategory: false,
      });
      return <Redirect to={{
        pathname: '/services/',
        state: {
          category: this.state.serviceCategoryReturn,
          subcategory: this.state.subcategory,
        },
      }}/>
    }
    return (
      <Widget 
      handleNewUserMessage={this.handleSubmit} 
      profileAvatar={logo}
      title="MigrantHub Chat"
      subtitle=""
      badge="1"
      senderPlaceHolder="Type 'Help' for help"
      />
    )
  }
}

export default (Chatbot);
