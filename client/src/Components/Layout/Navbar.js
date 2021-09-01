import React from "react";

const Navbar = () => {
  return (
    <div>
      <nav className="navrbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <a className="navbar-brand" href="landing.html">
            DevConnecter
          </a>
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
                <a className="nav-link" href="profiles.html">
                  Developers
                </a>
              </li>
            </ul>

            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="register.html">
                  Sign up
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="login.html">
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
