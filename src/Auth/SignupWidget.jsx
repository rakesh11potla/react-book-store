import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const SignupWidget = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        'https://dev-06815052.okta.com/api/v1/users?activate=true',
        {
          "profile": {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "login": email
          },
          "credentials": {
            "password": { "value": password }
          }
        },
        {
          headers: {
            Authorization: 'SSWS 00CY_prEA7PTnBTTpm2x0jEix9Cirzkm81DGTuIOZa',
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('User registration successful:', response.data);
      setIsSubmitting(false);
      // Reset form fields after submission
      setEmail('');
      setFirstName('');
      setLastName('');
      setPassword('');
      // Redirect to login page after successful registration
      setTimeout(() => {
        history.push('/login');
      }, 2000);
    } catch (error) {
      console.error('User registration error:', error);
      setIsSubmitting(false);
      if (error.response && error.response.data && error.response.data.errorSummary) {
        const errorMessage = error.response.data.errorSummary;
        if (errorMessage.includes('Api validation failed: login')) {
          setError('Invalid email format or email already in use. Please use a different email address.');
        } else {
          setError(errorMessage);
        }
      } else {
        setError('An error occurred while processing your request. Please try again later.');
      }
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <h2>Sign Up</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            className="form-control"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            className="form-control"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <br/>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default SignupWidget;
