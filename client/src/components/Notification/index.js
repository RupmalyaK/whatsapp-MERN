import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./style.scss";
import { useTheme } from "@material-ui/core";
import { motion, useAnimation } from "framer-motion";
import { Clear as ClearIcon } from "@material-ui/icons";
import { undoUserUpdateAsync } from "../../store/actions/userAction";
import { SET_UPDATING_DISPLAY_NAME } from "../../store/actions/actionTypes";

let displayAnmTimeOutId,
  statusAnmTimeOutId = null;
const NotificationBox = (props) => {
  const { children, undo, showUndoButton, showClearButton, handleClear } = props;
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
          <span
            className="ml-4"
            style={{ color: text.notificationHighlight, cursor: "pointer" }}
            onClick={undo}
          >
            undo
          </span>
        </>
      )}
      {showClearButton && (
        <ClearIcon className="ml-4" style={{ cursor: "pointer" }} onClick={handleClear}/>
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
  const firstRender3 = useRef(true);
  const photoNotificationController = useAnimation();
  const displayNameNotificationController = useAnimation();
  const statusNotificationController = useAnimation(); 
  const dispatch = useDispatch();
  const [isDisplayNameUndoing, setIsDisplayNameUndoing] = useState(false);
  const [isStatusUndoing, setIsStatusUndoing] = useState(false);

  //DISPLAY NAME EFFECTS
  useLayoutEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (updatingDisplayName) {
      notificationBoxOpenAnm("display-name");
      return;
    }

    if (isDisplayNameUndoing) {
      clearInterval(displayAnmTimeOutId);
      setIsDisplayNameUndoing(false);
      return;
    }
    if (!firstRender.current && !updatingDisplayName) {
      setUpdatedDisplayName(true);
      displayAnmTimeOutId = setTimeout(() => {
        setUpdatedDisplayName(false);
        notificationBoxCloseAnm("display-name");
        displayAnmTimeOutId = null;
      }, 5000);
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
      notificationBoxOpenAnm("status");
      return;
    }
    if (isStatusUndoing) {
      clearInterval(displayAnmTimeOutId);
      setIsStatusUndoing(false);
      return;
    }
    if (!firstRender2.current && !updatingStatus) {
      setUpdatedStatus(true);
      statusAnmTimeOutId = setTimeout(() => {
        notificationBoxCloseAnm("status");
        setUpdatedStatus(false);
      }, 5000);
      return;
    }
  }, [firstRender2, updatingStatus]);

  //Photo Effect
  //STATUS EFFECTS
  useLayoutEffect(() => {
    if (firstRender3.current) {
      firstRender3.current = false;
      return;
    }
    if (updatingPhoto) {
      notificationBoxOpenAnm("photo");
      return;
    }

    if (!firstRender3.current && !updatingPhoto) {
      setUpdatedPhoto(true);
      setTimeout(() => {
        notificationBoxCloseAnm("photo");
        setUpdatedPhoto(false);
      }, 5000);
      return;
    }
  }, [firstRender3, updatingPhoto]);


  const notificationBoxOpenAnm = async (whichNotification) => {
    switch(whichNotification)
      {
        case "display-name":
          await displayNameNotificationController.start({ y: 0, opacity: 1 });
          break;
        case "status":
          await statusNotificationController.start({ y: 0, opacity: 1 });
          break;
        case "photo":
          await photoNotificationController.start({ y: 0, opacity: 1 });
          break;
      }
  }

  const notificationBoxCloseAnm = async (whichNotification) => {
    switch(whichNotification)
    {
      case "display-name":
        await displayNameNotificationController.start({ y: 20, opacity: 0 });;
        break;
      case "status":
        await statusNotificationController.start({ y: 20, opacity: 0 });;
        break
      case "photo":
        await photoNotificationController.start({ y: 20, opacity: 0 });;
        break;
    }
  }


  return (
    <motion.div className="NotificationContainer">
      <motion.div
        className="NotificationContainer__NotificationBoxContainer"
        initial={{ y: 20, opacity: 0 }}
        animate={photoNotificationController}
      >
        {(updatingPhoto || updatedPhoto) && (
          <NotificationBox showClearButton={updatedPhoto}
          handleClear={e => setUpdatedPhoto(false)}
          >
            {updatingPhoto ? "Setting profile photo" : "Profile photo set"}
          </NotificationBox>
        )}
      </motion.div>

      <motion.div
        className="NotificationContainer__NotificationBoxContainer"
        initial={{ y: 20, opacity: 0 }}
        animate={displayNameNotificationController}
      >
        {(updatingDisplayName || updatedDisplayName) && (
          <NotificationBox
            showUndoButton={updatedDisplayName}
            showClearButton={updatedDisplayName}
            undo={(e) => {
              setUpdatedDisplayName(false);
              setIsDisplayNameUndoing(true);
              dispatch(undoUserUpdateAsync("display-name"));
            }}
            handleClear={e => setUpdatedDisplayName(false)}
          >
            {updatedDisplayName ? "Your name changed" : "Changing your name"}
          </NotificationBox>
        )}
      </motion.div>

      <motion.div
        className="NotificationContainer__NotificationBoxContainer"
        initial={{ y: 20, opacity: 0 }}
        animate={statusNotificationController}
      >
        {(updatingStatus || updatedStatus) && (
          <NotificationBox
            showUndoButton={updatedStatus}
            showClearButton={updatedStatus}
            undo={(e) => {
              setUpdatedStatus(false);
              setIsStatusUndoing(true);
              dispatch(undoUserUpdateAsync("status"));
            }}
            handleClear={e => setUpdatedStatus(false)}
          >
            {updatedStatus ? "About changed" : "Changing about..."}
          </NotificationBox>
        )}
      </motion.div>
    </motion.div>
  );
};

export default NotificationContainer;
