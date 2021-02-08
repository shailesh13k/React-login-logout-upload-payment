import React, { useState } from "react";
import "../App.css";
import { withRouter } from "react-router-dom";
import AuthenticationService from "../services/AuthenticationService";
import Header from "./Header";
function RegistrationForm(props) {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [mobile, setMobile] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [message, setMessage] = useState();

  const sendDetailsToServer = () => {
    if (email.length && password.length) {
      AuthenticationService.register(
        firstName,
        lastName,
        mobile,
        email,
        password
      ).then(
        (response) => {
          setMessage(response.data.message);
        },
        (error) => {
          console.log("Fail! Error = " + error.toString());
          setMessage(error.toString());
        }
      );
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      sendDetailsToServer();
    } else {
      props.showError("Passwords do not match");
    }
  };

  return (
    <>
      <Header />
      <main id="main">
        <section id="breadcrumbs" className="breadcrumbs">
          <div className="container">
            <ol>
              <li>
                <a href="/">Home</a>
              </li>
              <li>Register</li>
            </ol>
          </div>
        </section>
        <div className="website-form">
          <div class="section-title">
            <h2>Register Form</h2>
          </div>

          <div
            className="alert alert-success"
            style={{ display: message ? "block" : "none" }}
            role="alert"
          >
            {message}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                required
                id="firstName"
                placeholder="Enter firstname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                placeholder="Enter lastname"
                value={lastName}
                required
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <label htmlFor="mobile" className="form-label">
                Mobile
              </label>
              <input
                type="mobile"
                className="form-control"
                id="mobile"
                placeholder="Enter mobile"
                value={mobile}
                required
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="mb-2">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default withRouter(RegistrationForm);
