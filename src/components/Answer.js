import React from 'react';
import PropTypes from 'prop-types';

const Answer = ({ content, handleAnswerClick, handleEnterPress }) => {
  return (
    <li
      className="question-answer"
      tabIndex="0"
      onClick={handleAnswerClick}
      onKeyDown={handleEnterPress}
    >
      {content}
    </li>
  );
}

Answer.propTypes = {
  content: PropTypes.string.isRequired,
  handleAnswerClick: PropTypes.func.isRequired,
  handleEnterPress: PropTypes.func.isRequired
};

export default Answer;
