import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  function Sign(event) {
    event.preventDefault();

    // Récupérer les utilisateurs existants depuis le localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Créer un nouvel objet utilisateur avec les informations personnelles
    const newUser = {
      firstName,
      lastName,
      email,
      quizResults: [],  // Initialiser un tableau pour les résultats de quiz
    };

    // Ajouter le nouvel utilisateur au tableau
    users.push(newUser);

    // Sauvegarder le tableau mis à jour dans le localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Définir l'email de l'utilisateur actuel dans le localStorage
    localStorage.setItem('currentUserEmail', email);

    // Rediriger vers la page Home
    navigate("/Home");
  }

  return (
    <div className="container" style={{ maxWidth: '400px', margin: '50px auto' }}>
      <div className="card shadow-sm p-4">
        <h1 className="text-center mb-4" style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>
          Sign In
        </h1>
        <form onSubmit={Sign}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">Prénom</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              placeholder="Votre prénom"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">Nom</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              placeholder="Votre nom"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="your@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
