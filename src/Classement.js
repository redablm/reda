import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import de useNavigate

const Classement = () => {
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const navigate = useNavigate(); // Utilisation de useNavigate

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);

    // Trier les utilisateurs par leur meilleur score global
    const sorted = storedUsers.sort((a, b) => {
      const totalScoreA = a.quizResults.reduce((sum, result) => sum + result.score, 0);
      const totalScoreB = b.quizResults.reduce((sum, result) => sum + result.score, 0);
      return totalScoreB - totalScoreA; // Tri du plus grand au plus petit
    });

    setSortedUsers(sorted);
  }, []);

  // Fonction de navigation vers la page Info
  const handleNavigateToInfo = () => {
    navigate("/Info");
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Classement Général</h1>
      {sortedUsers.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Rang</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Score Total</th>
                <th>Catégorie</th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user, index) => {
                // Calculer le score total de l'utilisateur
                const totalScore = user.quizResults.reduce((sum, result) => sum + result.score, 0);

                // Sélectionner la première catégorie des résultats de l'utilisateur
                const category = user.quizResults.length > 0 ? user.quizResults[0].category : 'Non spécifiée';

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
        <p className="alert alert-warning text-center">Aucun utilisateur trouvé.</p>
      )}

      {/* Bouton pour revenir à la page Info */}
      <div className="mt-3">
        <button
          type="button"
          className="btn btn-primary btn-lg w-100"
          onClick={handleNavigateToInfo}
        >
          Revenir à la page Info
        </button>
      </div>
    </div>
  );
};

export default Classement;
