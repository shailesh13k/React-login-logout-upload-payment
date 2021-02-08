import React from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Footer from "./components/Footer";
import PrivateRoute from "./utils/PrivateRoute";
function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact={true} component={Landing} />
          <Route path="/register" exact={true} component={RegistrationForm} />
          <Route path="/login" exact={true} component={LoginForm} />
          <PrivateRoute path="/home">
            <Home />
          </PrivateRoute>
        </Switch>
      </Router>
      <Footer />
    </>
  );
}

export default App;
