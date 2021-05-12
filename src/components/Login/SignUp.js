import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import Login from './Login';
import {createAccountWithEmailPassword, initializeLoginFramework } from './loginManager';
import LoginWithGandF from './LoginWithGandF';
import './SignUp.css'
const SignUp = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    initializeLoginFramework();

    const { register, handleSubmit, formState: { errors }} = useForm();
    const onSubmit = (data) => {
        const { firstName, lastName, email, password } = data;
        const name = `${firstName} ${lastName}`
        createAccountWithEmailPassword(email, password, name)
          .then(res => {
            setLoggedInUser(res);
            history.replace(from);
          })
          .catch(error => {
          console.log(error)
            setLoggedInUser(error);
        })
    };
    const [login, setLogin] = useState(false);

    return (
        <div className="">
        <div className="container w-50">
          {login ? (
            <div>
                <Login handleToggleLogin />
              <p className="text-center">
                Don't have an account?
                <span className="toggle-login" onClick={() => setLogin(false)}>
                  Sing up now.
                </span>
              </p>
            </div>
          ) : (
            <div className="shadow-lg py-5 my-5">
              <h1 className="form-header"> Create An Account</h1>
              <form className="form-submit" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="firstName">First Name</label>
                <input
                  defaultValue=""
                  placeholder="Your first name"
                  {...register('firstName',{
                    validate: (value) => value.length > 3,
                    required: true,
                  })}
                />
                {errors.firstName && (
                  <p>Your first name is less than 3 characters</p>
                )}

                <label htmlFor="lastName">Last Name</label>
                <input
                  defaultValue=""
                  placeholder="Your last name"
                  {...register('lastName',{
                    validate: (value) => value.length > 2,
                    required: true,
                  })}
                />
                {errors.lastName && (
                  <p>Your last name is less than 2 characters</p>
                )}

                <label htmlFor="email">Email</label>
                <input
                  defaultValue=""
                  placeholder="Your Email"
                  type="email"
                  {...register('email',{
                    required: true,
                    pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                />
                {errors.email && <p>Your email is invalid</p>}

                <label htmlFor="password">Password</label>
                <input
                  defaultValue=""
                  placeholder="Your Password"
                  type="password"
                  {...register('password',{
                    required: true,
                    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
                  })}
                />
                {errors.password && (
                  <p>
                    password between 6 to 20 characters which contain one
                    numeric digit, one uppercase and one lowercase letter.
                  </p>
                )}
                <input type="submit" />
              </form>
              <p className="text-center mt-3">
                Have an account?
                <span className="toggle-login" onClick={() => setLogin(true)}>
                  Login now.
                </span>
              </p>
            </div>
          )}
          <div>
            <LoginWithGandF />
          </div>
        </div>
      </div>
    );
};

export default SignUp;