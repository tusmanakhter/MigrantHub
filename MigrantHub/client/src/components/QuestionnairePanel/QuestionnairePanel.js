
import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import qs from 'qs';
import axios from 'axios';
import AnswerTextbox from '../fields/questions/AnswerTextbox';
import AnswerDropdown from '../fields/questions/AnswerDropdown';
import { handleChange } from '../../helpers/Forms';

class QuestionnairePanel extends Component {
  constructor(props) {
    super(props);
    this.getQuestions = this.getQuestions.bind(this);
    this.state = {
      question: '',
      answerOptions: [],
      answer: '',
      answerError: '',
    };
    this.handleChange = handleChange.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions() {
    axios.get('/api/questions/')
      .then((response) => {
        const questions = response.data;
        if (questions.length > 0) {
          const singleQuestion = questions[Math.floor(Math.random() * questions.length)];
          const answerOptions = singleQuestion.answerOptions.map(answerOption => ({
            value: answerOption.optionNumber,
            label: answerOption.answerBody,
          }));
          this.setState({
            question: singleQuestion,
            answerOptions,
          });
        } else {
          this.setState({
            question: '',
            answerOptions: [],
          });
        }
      });
  }

  validate = () => {
    const { answer } = this.state;
    let isError = false;
    const errors = {
      answerError: '',
    };

    if (answer === '') {
      errors.answerError = 'Answer is required';
      isError = true;
    }

    this.setState(prevState => ({
      ...prevState,
      ...errors,
    }));

    return isError;
  }

  handleSubmit = () => {
    const { question, answer } = this.state;
    const error = this.validate();

    if (!error) {
      axios.post('/api/useranswers/',
        qs.stringify({
          question: question._id,
          answerOption: answer,
        })).then((response) => {
        if (response.status === 200) {
          this.getQuestions();
          this.setState({
            answer: '',
            answerError: '',
          });
        }
      });
    }
  }

  render() {
    const {
      question, answerOptions, answer, answerError,
    } = this.state;

    return (
      <React.Fragment>
        {question
        && (
        <Card>
          <CardContent>
            <p>Please answer this question so we can recommend services to you!</p>
            <b>{question.question}</b>
            { answerOptions.length > 0
              ? (
                <React.Fragment>
                  <AnswerDropdown
                    answer={answer}
                    answerError={answerError}
                    answers={answerOptions}
                    handleChange={this.handleChange}
                  />
                </React.Fragment>
              )
              : (
                <React.Fragment>
                  <AnswerTextbox
                    answer={answer}
                    answerError={answerError}
                    handleChange={this.handleChange}
                  />
                </React.Fragment>
              )
            }
            <Button onClick={this.handleSubmit} color="primary"> Submit </Button>
          </CardContent>
        </Card>
        )
        }
      </React.Fragment>
    );
  }
}
export default QuestionnairePanel;
