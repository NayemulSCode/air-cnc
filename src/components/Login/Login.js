import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from 'react-router';
import { UserContext } from '../../App';
import { initializeLoginFramework, logInWithEmailPassword } from './loginManager';

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
    
    
    

    const { register, handleSubmit, formState: { errors }} = useForm();
    const onSubmit = (data) => {
        initializeLoginFramework();
        const { email, password } = data;
        logInWithEmailPassword(email, password)
        .then((res) => {
            setLoggedInUser(res);
            history.replace(from);
        })
        .catch((error) => {
            setLoggedInUser(error);
        });
    };
    
    return (
        <div>
            <>
        <h1 className="form-header">Log In</h1>
        <form className="form-submit" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">Email</label>
          <input
            defaultValue={loggedInUser?.email}
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
            defaultValue={loggedInUser?.password}
            placeholder="Your Password"
            type="password"
            {...register('password',{
              required: true,
              pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
            })}
          />
          {errors.password && (
            <p>
              password between 6 to 20 characters which contain one numeric
              digit, one uppercase and one lowercase letter.
            </p>
          )}
          <input type="submit" value="Login" />
        </form>
        {!setLoggedInUser.success && (
          <p className="text-center">{setLoggedInUser.error}</p>
        )}
      </>
        </div>
    );
};

export default Login;