import React, { Suspense, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Aux from "../../hoc/_Aux";
import routes from "../../routes";
import config from "../../config";
import Loader from "../../components/Loader";
import "./app.scss";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Layout = (props) => {
  const { email, id } = useSelector((state) => state.user);
  const history = useHistory();

  useEffect(() => {
 
    if (!email) {
      history.push("/signinsignup");
    }

  }, [])

  const menu = routes.map((route, index) => {
    const { path, exact, name, authRequired, authLevel } = route;
    return route.component ? (
      <Route
        key={index}
        path={`${path}`}
        exact={exact}
        name={name}
        render={(props) => {
          return <route.component {...props} />;
        }}
      />
    ) : null;
  });

  return (
    <Aux>
      <div>
        <Suspense fallback={<Loader />}>
          <Switch>
            {menu}
            <Redirect from="/" to={config.defaultPath} />
          </Switch>
        </Suspense>
      </div>
    </Aux>
  );
};

export default Layout;
