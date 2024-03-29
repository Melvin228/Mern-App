import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="navrbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="nav-link" to="/">
            Devconnector
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggle-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  Profiles
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Sign up
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
