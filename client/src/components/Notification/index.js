import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import "./style.scss";
import { useTheme } from "@material-ui/core";
import { motion, useAnimation } from "framer-motion";
import { Clear as ClearIcon } from "@material-ui/icons";
import {undoUserUpdateAsync} from "../../store/actions/userAction";
import { SET_UPDATING_DISPLAY_NAME } from "../../store/actions/actionTypes";

let displayAnmTimeOutId,statusAnmTimeOutId = null; 
const NotificationBox = (props) => {
  const { children,undo,showUndoButton } = props;
  const { background, text } = useTheme().palette;
  return (
    <div
      className="NotificationBox"
      style={{
        background: background.notificationBackground,
        color: text.inverseStrong,
      }}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      {children}
      {showUndoButton && (
        <>
          <span className="ml-4" style={{color:text.notificationHighlight,cursor:"pointer"}} onClick={undo}>undo</span>
          <ClearIcon className="ml-4" style={{cursor:"pointer"}} />
        </>
      )}
    </div>
  );
};

const NotificationContainer = (props) => {
  const { updatingDisplayName, updatingStatus, updatingPhoto } = useSelector(
    (state) => state.user
  );

  const [updatedDisplayName, setUpdatedDisplayName] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState(false);
  const [updatedPhoto, setUpdatedPhoto] = useState(false);
  const firstRender = useRef(true);
  const firstRender2 = useRef(true);
  const notificationBoxController = useAnimation();
  const dispatch = useDispatch(); 
  const [isDisplayNameUndoing , setIsDisplayNameUndoing] = useState(false);
  const [isStatusUndoing, setIsStatusUndoing] = useState(false);
  
  //DISPLAY NAME EFFECTS
  useLayoutEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (updatingDisplayName) {
      notificationBoxOpenAnm();
      return;
    }
  
    if(isDisplayNameUndoing)
      {
        clearInterval(displayAnmTimeOutId);
        setIsDisplayNameUndoing(false);
        return;
      }
    if (!firstRender.current && !updatingDisplayName) {
      setUpdatedDisplayName(true);
      displayAnmTimeOutId = setTimeout(() => {
        setUpdatedDisplayName(false);
        notificationBoxCloseAnm();
        displayAnmTimeOutId = null;
      }, 10000);
      return;
    }  

  }, [firstRender, updatingDisplayName]);


  //STATUS EFFECTS
  useLayoutEffect(() => {
    if (firstRender2.current) {
      firstRender2.current = false;
      return;
    }
    if (updatingStatus) {
      notificationBoxOpenAnm();
      return;
    }
    if(isStatusUndoing)
      {
        clearInterval(displayAnmTimeOutId);
        setIsStatusUndoing(false);
        return;
      }
    if (!firstRender2.current && !updatingStatus) {
      setUpdatedStatus(true);
      statusAnmTimeOutId = setTimeout(() => {
        notificationBoxCloseAnm();
        setUpdatedStatus(false);
      }, 3000);
      return;
    }
  }, [firstRender2, updatingStatus]);

  const notificationBoxOpenAnm = async () => {
    await notificationBoxController.start({ y: 0, opacity: 1 });
  };

  const notificationBoxCloseAnm = async () => {
    await notificationBoxController.start({ y: 20, opacity: 0 });
  };
  console.log("CHECK THIS OUT", updatingDisplayName);
  return (
    <motion.div className="NotificationContainer">
      <motion.div
        className="NotificationContainer__NotificationBoxContainer"
        initial={{ y: 20, opacity: 0 }}
        animate={notificationBoxController}
      >
        {(updatingDisplayName || updatedDisplayName) && (
          <NotificationBox showUndoButton={updatedDisplayName} undo={e => {
            setUpdatedDisplayName(false);
            setIsDisplayNameUndoing(true);
            dispatch(undoUserUpdateAsync("display-name"));
          }}>
            {updatedDisplayName ? "Your name changed" : "Changing your name"}
          </NotificationBox>
        )}
      </motion.div>
  
      <motion.div
        className="NotificationContainer__NotificationBoxContainer"
        initial={{ y: 20, opacity: 0 }}
        animate={notificationBoxController}
      >
        {(updatingStatus || updatedStatus) && (
          <NotificationBox showUndoButton={updatedStatus}  undo={e => {
            setUpdatedStatus(false);
            setIsStatusUndoing(true);
            dispatch(undoUserUpdateAsync("status"));
          }}>
            {updatedStatus ? "About changed" : "Changing about..."}
          </NotificationBox>
        )}
      </motion.div>
    </motion.div>
  );
};

export default NotificationContainer;
