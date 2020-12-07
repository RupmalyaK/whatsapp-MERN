import React from "react";
import { Link } from "react-router-dom";
import "./Signin.scss";

const Signin = ({ onSubmit, onChangePage }) => {
  return (
    // <form onSubmit={onSubmit} className='sign-in-form'>
    //   <h2 className='title'>Sign in</h2>
    //   <div className='input-field'>
    //     <i className='fas fa-user'></i>
    //     <input name='email' type='email' placeholder='Email' />
    //   </div>
    //   <div className='input-field'>
    //     <i className='fas fa-lock'></i>
    //     <input type='password' name='password' placeholder='Password' />
    //   </div>
    //   <button type='submit' className='btn solid'>
    //     Sign In
    //   </button>

    // </form>

    <div className="__SignIn">
      <div className="__container">
        <div className="__left_side">
          <div className="__user_image"></div>
          <h3>Sign In Your Account</h3>
          <p>Create a new account</p>
          <div className="__form">
            <form onSubmit={onSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email"
              />
              <input type="password" name="password" placeholder="Password" />

              {/* <label htmlFor="" onClick={togglePasswordVisiblity}>show</label> */}
              <p>
                <a href="">Forget password?</a>
              </p>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>

        <div className="__right_side">
          <div className="__right_content">
            <h2>Hey you, Welcome</h2>
            <p>
              Objectively benchmark empowered collaboration and idea-sharing via
              focused e-commerce. Continually foster viral.
            </p>
            <button onClick={onChangePage}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
