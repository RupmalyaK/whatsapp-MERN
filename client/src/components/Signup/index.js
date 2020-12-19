import React, { useState } from "react";
import profileIcon from "../../assets/images/profile-icon.svg";
import "./Signup.scss";
import {AddAPhoto as AddaPhotoIcon} from "@material-ui/icons";
import {useTheme} from "@material-ui/core";
import whatsappIcon from "../../assets/images/whatsapp-icon.svg";

const user = "https://galileoenrichment.com/wp-content/uploads/2020/03/man.png";

const SignUp = ({ onSubmit,onChangePage,errors }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [passwordShown, setPasswordShown] = useState(false);
  const theme = useTheme();

  const {cameraIconColor} = theme.palette.icon;

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const [password,setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');

  const displayErrors = (errors) => {
    const ErrorComponents = errors.map(error => {
      return(<span className="error">{error}</span>)
    })
    return ErrorComponents;
  }

  return (
    <div className="__wrapper">
      <div className="__container">
        <div className="__left_side">
          <div className="__user_image">
            <label for="file-input" className="__user__image__profile-icon-container">
              <img type="file" src={profileImage || profileIcon} alt="" />
              {!profileImage && <AddaPhotoIcon className="__user__image__profile-icon-container__camera-icon" style={{color:cameraIconColor, fontSize:"2.2rem"}}/>}
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
              {errors.displayNameErrors && displayErrors(errors.displayNameErrors)}
              <input type="text"  name="displayName" placeholder="Display Name" />

              {errors.emailErrors && displayErrors(errors.emailErrors)}   
              <input type="email" name="email" placeholder="Email" />

              {errors.passwordErrors && displayErrors(errors.passwordErrors)}
              <input
                type={passwordShown ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
               {password !== confirmPassword && displayErrors(["Password and confirm password didn't match"])}
               <label htmlFor="" onClick={togglePasswordVisiblity} style={{cursor:"pointer"}}>{passwordShown ? "hide" : "show"}</label> 
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
              
             {/* <p>
                <a  href="">Forget password?</a>
             </p>*/}
              <button type="submit" style={{cursor:"pointer",marginTop:"5px"}}>Submit</button>
            </form>
          </div>
        </div>

        <div className="__right_side">
          <div className="__right_content">
          <img src={whatsappIcon} alt="whatsapp-icon" className="__right_content__whatsapp-icon"/>
            <h2>Hey you, Welcome</h2>
            <p>
              Objectively benchmark empowered collaboration and idea-sharing via
              focused e-commerce. Continually foster viral.
            </p>
            <button type="submit" onClick={onChangePage} style={{cursor:"pointer"}}>Sign In</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
