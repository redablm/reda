import React from 'react';

const Question = ({ question, onAnswer }) => {
  const answers = [...question.incorrect_answers, question.correct_answer].sort();

  return (
    <div className="question-container"> {/* Ajout de la classe CSS */}
      <h2 className="question-title">{question.question}</h2> {/* Ajout de la classe CSS */}
      {answers.map((answer, index) => (
        <button
          key={index}
          className="answer-btn" // Ajout de la classe CSS
          onClick={() => onAnswer(answer === question.correct_answer)}
        >
          {answer}
        </button>
      ))}
    </div>
  );
};

export default Question;
