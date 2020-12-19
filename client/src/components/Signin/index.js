import React from "react";
import { Link } from "react-router-dom";
import "./Signin.scss";
import whatsappIcon from "../../assets/images/whatsapp-icon.svg";

const Signin = ({ onSubmit, onChangePage,errors }) => {
  return (
   
    <div className="__SignIn">
      <div className="__container">
        <div className="__left_side">
          <div className="__user_image"></div>
          <h3>Sign In Your Account</h3>
          <p>Create a new account</p>
          <div className="__form">
           {errors && <span className="error">Email or Password incorrect</span>}
            <form onSubmit={onSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email"
              />
              <input type="password" name="password" placeholder="Password" />

           {/*  <label htmlFor="" onClick={togglePasswordVisiblity}>show</label> */}
            {/*  <p>
                <a href="">Forget password?</a>
            </p>*/}
              <button type="submit"  style={{cursor:"pointer",marginTop:"5px"}}>Submit</button>
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
            <button onClick={onChangePage} style={{cursor:"pointer"}}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
