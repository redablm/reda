import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Info = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(savedUsers);
  }, []);

  const handleDeleteUser = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const handleClearHistory = () => {
    setUsers([]);
    localStorage.removeItem('users');
  };

  const handleNavigateBack = () => {
    navigate("/Home");
  };

  // Function to navigate to the Ranking page
  const handleNavigateToClassement = () => {
    navigate("/Classement", { state: { category: 'exampleCategory' } });  // Example category, replace with the actual category
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h1 className="text-center mb-4">Saved Information</h1>
        {users.length > 0 ? (
          <div>
            {users.map((user, index) => (
              <div key={index} className="mb-3">
                <p><strong>First Name:</strong> {user.firstName}</p>
                <p><strong>Last Name:</strong> {user.lastName}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <h3>Quiz Results</h3>
                {user.quizResults.length > 0 ? (
                  user.quizResults.map((result, idx) => (
                    <div key={idx}>
                      <p><strong>Category:</strong> {result.category || 'Not specified'}</p>
                      <p><strong>Score:</strong> {result.score}</p>
                      <hr />
                    </div>
                  ))
                ) : (
                  <p>No results available.</p>
                )}
                <button
                  type="button"
                  className="btn btn-danger w-100 mb-2"
                  onClick={() => handleDeleteUser(index)}
                >
                  Delete this user
                </button>
                <hr />
              </div>
            ))}
          </div>
        ) : (
          <p className="alert alert-warning text-center">No saved information.</p>
        )}
      </div>

      <div className="mt-3">
        <button
          type="button"
          className="btn btn-danger btn-lg w-100"
          onClick={handleClearHistory}
        >
          Reset History (Delete all users)
        </button>
      </div>

      <div className="mt-3">
        <button
          type="button"
          className="btn btn-primary btn-lg w-100"
          onClick={handleNavigateBack}
        >
          Back to Main Menu
        </button>
      </div>

      {/* Add a button to navigate to the Ranking page */}
      <div className="mt-3">
        <button
          type="button"
          className="btn btn-info btn-lg w-100"
          onClick={handleNavigateToClassement}
        >
          View Ranking
        </button>
      </div>
    </div>
  );
};

export default Info;
