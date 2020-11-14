import React, { useEffect, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import Aux from '../../hoc/_Aux';
import routes from '../../routes';
import config from '../../config';
import Loader from '../../components/Loader';
import {getUserDetail} from "../../store/actions/userAction.js";
import {setCurrentRoom} from "../../store/actions/roomAction.js";
import {justJoinRoom} from "../../utils/socketUtils.js";


import "./app.scss";



const Layout = (props) => {
  const dispatch = useDispatch();
  const chatRooms = useSelector(state => state.user.chatRooms);

  const joinAllSubscribedRooms = () => {
    if(!chatRooms || chatRooms.length === 0)
      {
  
        return;
      }
      chatRooms.forEach(room => {
        justJoinRoom(room._id);
      });
  }

  useEffect(() => {
    dispatch(getUserDetail());
    dispatch(setCurrentRoom(-1));
    joinAllSubscribedRooms();
  },[]);

  const menu = routes.map((route, index) => {
    const {path,exact,name,authRequired,authLevel} = route;
    return route.component ? (
      <Route
        key={index}
        path={`${path}`}
        exact={exact}
        name={name}
        render={(props) =>{
        return(<route.component {...props} />);
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
            <Redirect from='/' to={config.defaultPath} />
          </Switch>
        </Suspense>
      </div>
    </Aux>
  );
}

export default Layout;
