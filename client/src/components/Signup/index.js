import React, { useState } from "react";
import profileIcon from "../../assets/images/profile-icon.svg";
import "./Signup.scss";
import { Link } from 'react-router-dom';

const user = "https://galileoenrichment.com/wp-content/uploads/2020/03/man.png";

const SignUp = ({ onSubmit,onChangePage }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  return (
    // <form onSubmit={onSubmit} className="sign-up-form">
    //   <h2 className="title">Sign up</h2>
    //   <div className="input-field">
    //     <i className="fas fa-user"></i>
    //     <input type="text"  name="displayName" placeholder="Display Name" />
    //   </div>
    //   <div className="input-field">
    //     <i className="fas fa-envelope"></i>
    //     <input type="email" name="email" placeholder="Email" />
    //   </div>
    //   <div className="input-field">
    //     <i className="fas fa-lock"></i>
    //     <input type="password" placeholder="Password" name="password" />
    //   </div>
    //   <div className="input-field">
    //     <i className="fas fa-lock"></i>
    //     <input type="password" placeholder="Confirm Password" name="confirmPassword" />
    //   </div>
    //   <div className="profileInputContainer">
    //       <img src={profileImage || profileIcon} alt="profile" className="profileImage"/>
    //       <div className="input-file">
    //         <i className="fas fa-lock"></i>
    //         <input type="file" placeholder="Profile icon" name="profileImageInput" accept="image/*"  onChange = {e => e.target.files[0] ? setProfileImage(URL.createObjectURL(e.target.files[0])) : setProfileImage(null)}/>
    //       </div>
    //   </div>
    //   <button type="submit" className="btn">
    //     Sign Up
    //   </button>
    // </form>

    <div className="__wrapper">
      <div className="__container">
        <div className="__left_side">
          <div className="__user_image">
            <label for="file-input">
              <img type="file" src={profileImage || profileIcon} alt="" />
            </label>
          </div>
          <h3>Create Account</h3>
          <p>Create a new account</p>
          <div className="__form">
            <form onSubmit={onSubmit} style={{ padding: "0px" }}>
            <input
                id="file-input"
                type="file"
                placeholder="Profile icon"
                name="profileImageInput"
                className="file-input"
                accept="image/*"
                onChange={(e) =>
                  e.target.files[0]
                    ? setProfileImage(URL.createObjectURL(e.target.files[0]))
                    : setProfileImage(null)
                }
              />
              <input type="text"  name="displayName" placeholder="Display Name" />

              <input type="email" name="email" placeholder="Email" />
              <input
                type={passwordShown ? "text" : "password"}
                name="password"
                placeholder="Password"
              />
              
              <input
                type={passwordShown ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
              />
              {/* <label htmlFor="" onClick={togglePasswordVisiblity}>show</label> */}
              <p>
                <a  href="">Forget password?</a>
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
            <button type="submit" onClick={onChangePage}>Sign In</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
