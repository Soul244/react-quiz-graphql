import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import Quiz from './Quiz';
import Modal from './Modal';
import Results from './Results';
import shuffleQuestions from '../helpers/shuffleQuestions';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

const GET_QUIZ = gql`
  query GetQuiz($quizId: ID!){
    getQuiz(id: $quizId) {
      id
      name
      questions {
        items {
          id
          title
          correct
          answers
          {
            items{
              id
              content
            }
          }
        }
      }
    }
  }
`

class QuizApp extends Component {
  state = {
    questions: [],
    questionsBackup: [],
    questionCount: 0,
    userAnswers: [],
    step: 1,
    score: 0,
    modal: {
      state: 'hide',
      praise: '',
      points: ''
    }
  };

  handleAnswerClick = (index) => (e) => {
    const { questions, step, userAnswers } = this.state;
    const isCorrect = questions[0].correct === index;
    const currentStep = step - 1;
    const tries = userAnswers[currentStep].tries;

    if (isCorrect && e.target.nodeName === 'LI') {
      // Prevent other answers from being clicked after correct answer is clicked
      e.target.parentNode.style.pointerEvents = 'none';

      e.target.classList.add('right');

      userAnswers[currentStep] = {
        tries: tries + 1
      };

      this.setState({
        userAnswers: userAnswers
      });

      setTimeout(() => this.showModal(tries), 750);

      setTimeout(this.nextStep, 2750);
    }

    else if (e.target.nodeName === 'LI') {
      e.target.style.pointerEvents = 'none';
      e.target.classList.add('wrong');

      userAnswers[currentStep] = {
        tries: tries + 1
      };

      this.setState({
        userAnswers
      });
    }
  };

  handleEnterPress = (index) => (e) => {
    if (e.keyCode === 13) {
      this.handleAnswerClick(index)(e);
    }
  };

  showModal = (tries) => {
    let praise;
    let points;

    switch (tries) {
      case 0: {
        praise = '1st Try!';
        points = '+10';
        break;
      }
      case 1: {
        praise = '2nd Try!';
        points = '+5';
        break;
      }
      case 2: {
        praise = 'Correct!';
        points = '+2';
        break;
      }
      default: {
        praise = 'Correct!';
        points = '+1';
      }
    }

    this.setState({
      modal: {
        state: 'show',
        praise,
        points
      }
    });
  };

  nextStep = () => {
    const { questions, userAnswers, step, score } = this.state;
    const restOfQuestions = questions.slice(1);
    const currentStep = step - 1;
    const tries = userAnswers[currentStep].tries;

    this.setState({
      step: step + 1,
      score: this.updateScore(tries, score),
      questions: restOfQuestions,
      modal: {
        state: 'hide'
      }
    });
  };

  updateScore(tries, score) {
    switch (tries) {
      case 1: return score + 10;
      case 2: return score + 5;
      case 3: return score + 2;
      default: return score + 1;
    }
  }

  handleCompleted = (data) => {
    const { items } = data.getQuiz.questions;
    this.setState({
      questions: shuffleQuestions(items),
      questionCount: items.length,
      questionsBackup: items,
      userAnswers: items.map(() => {
        return {
          tries: 0
        }
      }
      )
    })
  }

  restartQuiz = () => {
    this.setState(prevState=>({
      step: 1,
      score: 0,
      questions: shuffleQuestions(prevState.questionsBackup),
      userAnswers: prevState.questionsBackup.map(()=>{
        return {
          tries:0
        }
      })
    }));
  };

  render() {
    const { step, questions, userAnswers, questionCount, score, modal } = this.state;
    return (
      <Fragment>
        <Query
          query={GET_QUIZ}
          variables={{ quizId: "96d6b113-6582-4b54-b80f-154389e599ba" }}
          onCompleted={this.handleCompleted}>
          {({ loading, error, data }) => {
            if (!loading && step >= questionCount + 1) {
              return (
                <Results
                  score={score}
                  restartQuiz={this.restartQuiz}
                  userAnswers={userAnswers}
                />
              );
            } else {
              return (
                <Quiz
                  step={step}
                  questions={questions}
                  questionCount={questionCount}
                  score={score}
                  handleAnswerClick={this.handleAnswerClick}
                  handleEnterPress={this.handleEnterPress}
                />
              )
            }
          }}
        </Query>
        {modal.state === 'show' && <Modal modal={modal} />}
      </Fragment>
    );
  }
}

QuizApp.propTypes = {
  questions: PropTypes.array,
  questionCount: PropTypes.number
}

export default QuizApp;
