import React from "react";

const Home = React.lazy(() => import("../containers/Home"));
const SignInSignUp = React.lazy(() => import("../containers/Login"));

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
];

export default routes;
