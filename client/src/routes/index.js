import React from "react";

const Home = React.lazy(() => import("../containers/Home"));
const SignInSignUp = React.lazy(() => import("../containers/Login"));
const Register = React.lazy(() => import("../components/OwnRegister/Register"));


const routes = [
  {
    path: "/",
    exact: true,
    name: "Home",
    component: Home,
  },
  {
    path: "/signinsignup",
    exact: true,
    name: "Login",
    component: SignInSignUp,
  },
    {
    path: "/register",
    exact: true,
    name: "Register",
    component: Register,
  },

];

export default routes;
