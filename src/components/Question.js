import React from 'react';
import PropTypes from 'prop-types';
import Answer from './Answer';

const Question = ({ title, answers, handleAnswerClick, handleEnterPress }) => {
  return (
    <li className="question">
      <h2 className="question-title" tabIndex="0">
        {title}
      </h2>
      <ul className="question-answers" tabIndex="-1">
        {answers.map((answer, index) => {
          return (
            <Answer
              key={answer.id}
              content={answer.content}
              handleAnswerClick={handleAnswerClick(index)}
              handleEnterPress={handleEnterPress(index)}
            />
          );
        })}
      </ul>
    </li>
  );
}

Question.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })),
  title: PropTypes.string.isRequired,
  handleAnswerClick: PropTypes.func.isRequired,
  handleEnterPress: PropTypes.func.isRequired
};

export default Question;
