import { Button } from '@material-ui/core';
import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router';
import { UserContext } from '../../App';
import { handleGoogleSingIn, initializeLoginFramework } from './loginManager';

const LoginWithGandF = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    initializeLoginFramework();
    //google account
    const handleGoogleLogin = () => {
        handleGoogleSingIn().then((res) => {
          console.log(res);
          setLoggedInUser(res);
          history.replace(from);
        });
    };
    return (
        <div className="mt-5">
        <p className="text-center">Or sing up using</p>
        <div className="d-flex justify-content-center">
          <p className="icon">
            <Button onClick={handleGoogleLogin} >Sign in With Google </Button>
          </p>
        </div>
      </div>
    );
};

export default LoginWithGandF;