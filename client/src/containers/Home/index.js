import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@material-ui/core";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import * as demoApi from "../../api/demoAPI";
import { lightTheme, darkTheme } from "../../utils/theme.js";
import SideBar from "../../components/SideBar";
import ChatRoom from "../../components/ChatRoom";
import {useHistory} from "react-router-dom";
import NotificationContiner from "../../components/Notification";
import Intro from "../../components/Intro";
import socket from "../../utils/socketUtils.js";
import "./style.css";

const Home = () => {
  const currentTheme = useSelector((state) => state.system.currentTheme);
  const {email,id} = useSelector(state => state.user);
  const {currentChatRoomId:currentChatRoom} = useSelector(state => state.room);
  const history = useHistory();
  useEffect(() => {
    socket.emit("set-socket-id", {userId:id})
  },[]);
  
  if(!email)
    {
      history.push("/signinsignup");
      return (<></>);
    }

  const getTheme = () => {
    switch (currentTheme) {
      case "light":
        return lightTheme;
      case "dark":
        return darkTheme;
    }
  };

  const appliedTheme = createMuiTheme(getTheme());

  return (
    <ThemeProvider theme={appliedTheme}>
      <div
        className="home"
        style={{ background: appliedTheme.palette.background.outerBackground, backgroundImage:appliedTheme.palette.background.outerBackgroundImage}}
      >
        <div
          className="home__body"
          style={{
            background: appliedTheme.palette.background.innerBackground,
            boxShadow:appliedTheme.outerBoxShadow,
          }}
        >
          <SideBar  />
          <ChatRoom />
          {currentChatRoom === -1 && <Intro />}
          <NotificationContiner />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Home;
