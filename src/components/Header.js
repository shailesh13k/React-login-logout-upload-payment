import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AuthenticationService from "../services/AuthenticationService";

const Header = (props) => {
  const [login, setLogin] = useState(false);
  const [roles, setRoles] = useState("");
  const [userName, setUserName] = useState("");
  const history = useHistory();

  useEffect(() => {
    const user = AuthenticationService.getCurrentUser();

    if (user) {
      const roles = [];

      user.authorities.forEach((authority) => {
        roles.push(authority.authority);
      });

      setUserName(user.userName);
      setRoles(roles);
      setLogin(true);
    }
  }, []);

  const signOut = () => {
    AuthenticationService.signOut();
    history.push("/");
    setUserName("");
    setRoles("");
    setLogin(false);
    window.location.reload();
  };

  return (
    <header id="header" className="fixed-top header-inner-pages">
      <div className="container d-flex align-items-center">
        <h1 className="logo me-auto">
          <a href="/">Uway Booking System</a>
        </h1>
        <nav className="nav-menu d-none d-lg-block">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            {roles && (
              <li>
                <a href="/profile">{roles}</a>
              </li>
            )}
            {userName && (
              <li>
                <a href="/home">{userName}</a>
              </li>
            )}
            {login ? (
              <li>
                <a href="/" onClick={signOut}>
                  SignOut
                </a>
              </li>
            ) : (
              <li>
                <a href="/login">Login</a>
              </li>
            )}
          </ul>
        </nav>
        <a href="#about" className="get-started-btn scrollto">
          Get Started
        </a>
      </div>
    </header>
  );
};

export default Header;
