import React, { useState, useEffect } from "react";
import useForm from "../Hooks/useForm";

const Register = () => {
  const [values, handleChange] = useForm({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [errors, setErrors] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    const user = {
      name: values.name,
      email: values.email,
      password: values.password,
      password2: values.password2,
    };

    console.log(user);
  };

  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign up</h1>
            <p className="lead text-center">Create your devConnector account</p>
            <form onSubmit={submitHandler}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                />
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email address"
                    value={values.email}
                    name="email"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    value={values.password}
                    name="password"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Confirm password"
                    value={values.password2}
                    name="password2"
                    onChange={handleChange}
                  />
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </div>
            </form>
            <h1>Testing</h1>
            <h2>{values.name}</h2>
            <h2>{values.email}</h2>
            <h2>{values.password}</h2>
            <h2>{values.password2}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
