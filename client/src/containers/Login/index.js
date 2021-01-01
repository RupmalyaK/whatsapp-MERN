import React, { useState,useEffect } from 'react';
import { useHistory} from 'react-router-dom';
import './index.scss';
import SignUp from '../../components/Signup';
import Signin from '../../components/Signin';
import {useDispatch, useSelector} from "react-redux";
import {signUpAsync,signInAsync,clearSignUpErrors,clearSignInErrors} from "../../store/actions/userAction";
import socket from "../../utils/socketUtils.js";
import { ThemeProvider } from "@material-ui/core";
import { lightTheme, darkTheme } from "../../utils/theme.js";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";




const Login = (props) => {
  const [toggle, setToggle] = useState(true);
  const dispatch = useDispatch(); 
  const {email:userExist, signUpErrors , signInErrors} = useSelector(state => state.user);
  const history = useHistory();
  const [isSigninPage, setIsSignInPage ] = useState(true);  
  const currentTheme = useSelector((state) => state.system.currentTheme);
  

  const handleLogin = e => {
    e.preventDefault();
    const {email, password} = e.target.elements;
    dispatch(signInAsync(email.value,password.value,socket.id));
  }

  useEffect(() => {
    dispatch(clearSignUpErrors());
    dispatch(clearSignInErrors());
  },[])

  const getTheme = () => {
    switch (currentTheme) {
      case "light":
        return lightTheme;
      case "dark":
        return darkTheme;
    }
  };

  const appliedTheme = createMuiTheme(getTheme());

  const handleSignUp = event => {
    event.preventDefault();
    const { displayName , email, password, profileImageInput,confirmPassword} = event.target.elements;
    if(password.value !== confirmPassword.value)
      {
        return;
      }
    const formData = new FormData();
    formData.append("displayName", displayName.value);
    formData.append("email", email.value);
    formData.append("password", password.value);
    formData.append("profilePic", profileImageInput.files[0]);
    formData.append("socketId",socket.id)
    dispatch(signUpAsync(formData));
  }

  if (userExist) {
     history.push('/');
     return (<></>);
  }

  return(
    <ThemeProvider theme={appliedTheme}>
          <div>
            {isSigninPage ?  <Signin onSubmit={handleLogin} onChangePage={() => setIsSignInPage(false)} errors={signInErrors}/> :   <SignUp onSubmit={handleSignUp} onChangePage={() => setIsSignInPage(true)} errors={{...signUpErrors}}/> }
        </div>
    </ThemeProvider>
  
  )
};

export default Login;
