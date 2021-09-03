import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useForm from "../Hooks/useForm";
import axios from "axios";
import classnames from "classnames";
import { connect } from "react-redux";
import { registeruser } from "../../actions/authActions";

const Register = ({ registeruser }) => {
  const [values, handleChange] = useForm({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [errors, setErrors] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    const newUser = {
      name: values.name,
      email: values.email,
      password: values.password,
      password2: values.password2,
    };
    registeruser(newUser);
    //   axios
    //     .post("/api/users/register", newUser)
    //     .then((res) => console.log(res.data))
    //     .catch((err) => {
    //       setErrors(err.response.data);
    //     });
    // };
  };
  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign up</h1>
            <p className="lead text-center">Create your devConnector account</p>
            <form noValidate onSubmit={submitHandler}>
              <div className="form-group">
                <input
                  type="text"
                  className={classnames("form-control form-control", {
                    "is-invalid": errors.name,
                  })}
                  placeholder="Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control", {
                      "is-invalid": errors.email,
                    })}
                    placeholder="Email address"
                    value={values.email}
                    name="email"
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control", {
                      "is-invalid": errors.password,
                    })}
                    placeholder="Password"
                    value={values.password}
                    name="password"
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control", {
                      "is-invalid": errors.password2,
                    })}
                    placeholder="Confirm password"
                    value={values.password2}
                    name="password2"
                    onChange={handleChange}
                  />
                  {errors.password2 && (
                    <div className="invalid-feedback">{errors.password2}</div>
                  )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  registeruser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

export default connect(null, { registeruser })(Register);
