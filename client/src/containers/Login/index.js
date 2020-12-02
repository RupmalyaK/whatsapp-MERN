import React, { useState, useCallback } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import './index.scss';
import SignUp from '../../components/Signup';
import Signin from '../../components/Signin';
import RightPanel from '../../components/Rightpannel';
import LeftPanel from '../../components/Leftpannel';
import {useDispatch, useSelector} from "react-redux";
import {signUpAsync,signInAsync} from "../../store/actions/userAction";


const Login = (props) => {
  const [toggle, setToggle] = useState(true);
  const dispatch = useDispatch(); 
  const {email:userExist} = useSelector(state => state.user);
  const history = useHistory();
  const [isSigninPage, setIsSignInPage ] = useState(true);  

  const handleLogin = e => {
    e.preventDefault();
    const {email, password} = e.target.elements;
    dispatch(signInAsync(email.value,password.value));
  }

  const handleSignUp = event => {
    event.preventDefault();
    const { displayName , email, password, profileImageInput} = event.target.elements;
    const formData = new FormData();
    formData.append("displayName", displayName.value);
    formData.append("email", email.value);
    formData.append("password", password.value);
    formData.append("profilePic", profileImageInput.files[0]);
    dispatch(signUpAsync(formData));
  }
  // const onClick = () => setToggle(!toggle);
  //const { currentUser } = null;
  if (userExist) {
     history.push('/');
     return (<></>);
  }
  // return toggle ? (
  //   <div className='container'>
  //     <div className='forms-container'>
  //       <div className='signin-signup'>
  //         <Signin onSubmit={handleLogin} />
  //       </div>
  //     </div>

  //     <div className='panels-container'>
  //       <LeftPanel click={onClick} />
  //       <RightPanel click={onClick} />
  //     </div>
  //   </div>
  // ) : (
  //     <div className='container sign-up-mode'>
  //       <div className='forms-container'>
  //         <div className='signin-signup'>
  //           <SignUp onSubmit={handleSignUp}  />
  //         </div>
  //       </div>

  //     <div className='panels-container'>
  //         <LeftPanel click={onClick} />
  //         <RightPanel click={onClick} />
  // </div>
  //     </div>
  //   );
  return(
    <div>
      {isSigninPage ?  <Signin onSubmit={handleLogin} onChangePage={() => setIsSignInPage(false)} /> :   <SignUp onSubmit={handleSignUp} onChangePage={() => setIsSignInPage(true)}/> }
    
    </div>
  )
};

export default Login;
