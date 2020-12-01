import React, {useState} from "react";
import "./Register.scss";
const user = "https://galileoenrichment.com/wp-content/uploads/2020/03/man.png";

const Register = () => {
    const [passwordShown, setPasswordShown] = useState(false)

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true)
    }
  return (
    <div className="__wrapper">
      <div className="__container">
        <div className="__left_side">
          <div className="__user_image">
          <label for="file-input">
            <img type="file" src={user} alt="" />
            <input id="file-input" type="file" placeholder="Profile icon" name="profileImageInput" accept="image/*"
              // onChange = {e => e.target.files[0] ? setProfileImage(URL.createObjectURL(e.target.files[0])) : setProfileImage(null)}
              />
            </label>
          </div>
          <h3>Create Account</h3>
          <p>Create a new account</p>
          <div className="__form">
              <form>
            <input type="text" name="Full Name" id="firstName" placeholder="Full Name"  />
            <input type="email" name="lastName" id="lastName" placeholder="Email" />
            <input type={passwordShown ? "text" : "password"} name="password" id="password" placeholder="Password" />
            <input  type={passwordShown ? "text" : "password"} name="cpassword" id="cpassword" placeholder="Confirm Password" />
         

            {/* <label htmlFor="" onClick={togglePasswordVisiblity}>show</label> */}
            <p><a href="">Forget password?</a></p>
            <button>Submit</button>
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
          <button>Sign In</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
