import React, { useState } from "react";
import "../App.css";
import { withRouter } from "react-router-dom";
import AuthenticationService from "../services/AuthenticationService";
import Header from "./Header";

function LoginForm(props) {
  const [state, setState] = useState({
    email: "",
    password: "",
    error: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    AuthenticationService.signin(state.email, state.password).then(
      () => {
        props.history.push("/home");
      },
      (error) => {
        console.log("Login fail: error = { " + error.toString() + " }");
        setState({
          error:
            "Can not signin successfully ! Please check username/password again",
        });
      }
    );
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
              <li>Login</li>
            </ol>
          </div>
        </section>
        <section className="inner-page">
          <div className="container">
            <div className="website-form">
              <div class="section-title">
                <h2>Login Form</h2>
              </div>
              <div
                className="alert alert-danger"
                style={{ display: state.error ? "block" : "none" }}
                role="alert"
              >
                {state.error}
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    required
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    value={state.email}
                    onChange={handleChange}
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    required
                    id="password"
                    placeholder="Password"
                    value={state.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-check"></div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default withRouter(LoginForm);
