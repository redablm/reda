import React from 'react';

const Question = ({ question, onAnswer }) => {
  const answers = [...question.incorrect_answers, question.correct_answer].sort();

  return (
    <div>
      <h2>{question.question}</h2>
      {answers.map((answer, index) => (
        <button key={index} onClick={() => onAnswer(answer === question.correct_answer)}>
          {answer}
        </button>
      ))}
    </div>
  );
};

export default Question;
