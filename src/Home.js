import React, { useState, useEffect } from 'react';
import Quiz from './Quiz';
import CategorySelector from './CategorySelector';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [questions, setQuestions] = useState([]);
  const [startTime, setStartTime] = useState(null);

  const handleSelectCategory = async (categoryId) => {
    setSelectedCategory(categoryId);
    localStorage.setItem('selectedCategory', categoryId);

    try {
      const response = await fetch(`https://opentdb.com/api_category.php`);
      const data = await response.json();
      const selectedCategory = data.trivia_categories.find(category => category.id === categoryId);
      setCategoryName(selectedCategory ? selectedCategory.name : 'Unknown');
      localStorage.setItem('categoryName', selectedCategory ? selectedCategory.name : 'Unknown');

      const quizResponse = await fetch(`https://opentdb.com/api.php?amount=10&category=${categoryId}&type=multiple`);
      const quizData = await quizResponse.json();
      if (quizData && quizData.results) {
        setQuestions(quizData.results);
      } else {
        console.error("No questions received");
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleQuizStart = () => {
    setStartTime(performance.now());
  };

  const handleQuizCompletion = (score) => {
    const endTime = performance.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);

    const quizData = {
      category: categoryName,
      score,
      duration,
    };

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = users.find(user => user.email === localStorage.getItem('currentUserEmail'));
    if (currentUser) {
      currentUser.quizResults.push(quizData);
      localStorage.setItem('users', JSON.stringify(users));
    } else {
      console.log("User not found");
    }
  };

  const handleViewResults = () => {
    navigate("/Info");
  };

  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Interactive Quiz</h1>
      <div className="row justify-content-center">
        <div className="col-md-8">
          {!selectedCategory ? (
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h2 className="card-title mb-4">Choose a category</h2>
                <CategorySelector onSelectCategory={handleSelectCategory} />
              </div>
            </div>
          ) : (
            <div className="card shadow-sm">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">
                  Questions from category: {categoryName}
                </h2>
                <Quiz questions={questions} onQuizComplete={handleQuizCompletion} onQuizStart={handleQuizStart} />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="text-center mt-4">
        <button onClick={handleViewResults} className="btn btn-info">View Saved Results</button>
        <button onClick={goBack} className="btn btn-info mx-3">Go Back</button>
      </div>
    </div>
  );
};

export default Home;
