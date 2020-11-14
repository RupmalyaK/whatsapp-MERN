import React, {useState} from "react";
import profileIcon from "../../assets/images/profile-icon.svg";

const SignUp = ({ onSubmit }) => {
  const [profileImage,setProfileImage] = useState(null); 
  return (
    <form onSubmit={onSubmit} className="sign-up-form">
      <h2 className="title">Sign up</h2>
      <div className="input-field">
        <i className="fas fa-user"></i>
        <input type="text" name="displayName" placeholder="Display Name" />
      </div>
      <div className="input-field">
        <i className="fas fa-envelope"></i>
        <input type="email" name="email" placeholder="Email" />
      </div>
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input type="password" placeholder="Password" name="password" />
      </div>
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input type="password" placeholder="Confirm Password" name="confirmPassword" />
      </div>
      <div className="profileInputContainer">
          <img src={profileImage || profileIcon} alt="profile" className="profileImage"/>
          <div className="input-file">
            <i className="fas fa-lock"></i>
            <input type="file" placeholder="Profile icon" name="profileImageInput" accept="image/*"  onChange = {e => e.target.files[0] ? setProfileImage(URL.createObjectURL(e.target.files[0])) : setProfileImage(null)}/>
          </div>
      </div>
      <button type="submit" className="btn">
        Sign Up
      </button>
    </form>
  );
};

export default SignUp;
