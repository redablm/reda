import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Ranking = () => {
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);

    // Sort users by their highest total score
    const sorted = storedUsers.sort((a, b) => {
      const totalScoreA = a.quizResults.reduce((sum, result) => sum + result.score, 0);
      const totalScoreB = b.quizResults.reduce((sum, result) => sum + result.score, 0);
      return totalScoreB - totalScoreA; // Sorting from highest to lowest
    });

    setSortedUsers(sorted);
  }, []);

  // Function to navigate to the Info page
  const handleNavigateToInfo = () => {
    navigate("/Info");
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">General Ranking</h1>
      {sortedUsers.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Total Score</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user, index) => {
                // Calculate the total score of the user
                const totalScore = user.quizResults.reduce((sum, result) => sum + result.score, 0);
                const category = user.quizResults.length > 0 ? user.quizResults[0].category : 'Not specified';

                return (
                  <tr key={user.email}>
                    <td>{index + 1}</td>
                    <td>{user.lastName}</td>
                    <td>{user.firstName}</td>
                    <td>{totalScore}</td>
                    <td>{category}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="alert alert-warning text-center">No users found.</p>
      )}
      <div className="mt-3">
        <button
          type="button"
          className="btn btn-primary btn-lg w-100"
          onClick={handleNavigateToInfo}
        >
          Back to Info Page
        </button>
      </div>
    </div>
  );
};

export default Ranking;
