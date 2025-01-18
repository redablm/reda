import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  function Sign(event) {
    event.preventDefault();

    // Retrieve existing users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Create a new user object with personal information
    const newUser = {
      firstName,
      lastName,
      email,
      quizResults: [],  // Initialize an array for quiz results
    };

    // Add the new user to the array
    users.push(newUser);

    // Save the updated array to localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Set the current user's email in localStorage
    localStorage.setItem('currentUserEmail', email);

    // Redirect to the Home page
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
            <label htmlFor="firstName" className="form-label text-white">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              placeholder="Your first name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label text-white">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              placeholder="Your last name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-white">Email</label>
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
