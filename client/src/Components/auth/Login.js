import React, { useState } from "react";
import useForm from "../Hooks/useForm";

const Login = () => {
  const [values, handleChange] = useForm({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    const user = {
      email: values.email,
      password: values.password,
    };
    console.log(user);
  };
  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log in</h1>
            <p className="lead text-center">
              Sign in to your DevConnecter Account
            </p>
            <form onSubmit={submitHandler}>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Email address"
                  name="email"
                  values={values.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  name="password"
                  values={values.password}
                  onChange={handleChange}
                />
              </div>
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
            <h1>Testing</h1>
            <h2>{values.email}</h2>
            <h2>{values.password}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
