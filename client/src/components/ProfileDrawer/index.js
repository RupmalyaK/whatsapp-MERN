import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@material-ui/core";
import "./style.scss";
import {
  AccountCircle as AccountCircleIcon,
  ArrowBack as ArrowBackIcon,
  CameraAlt as CameraIcon,
  Create as PencilIcon,
  Check as CheckIcon
} from "@material-ui/icons";
import ImageFromBuffer from "../ImageFromBuffer";

const InputBox = (props) => {
  const { label, handleSubmit, value, ...otherProps } = props;
  const theme = useTheme();
  const [currentValue, setCurrentValue] = useState(value);
  const [isActive,setIsActive] = useState(false);
  const { background, icon } =  theme.palette;

  return (
    <div
      className="inputBox"
      {...otherProps}
      style={{
        ...otherProps.style,
        background: background.siderBarChatListBackground,
      }}
    >
      <span style={{ color: background.headerColorLight }}>{label}</span>
      <div className="inputBox__outer"     style={{
            borderBottom: `2px solid ${background.headerDarkBackground}`,
          }}>
        <input
          className="inputBox__input"
          readOnly={!isActive}
          value={currentValue}
          onChange={e => setCurrentValue(e.target.value)}
        ></input>
        {isActive ? <CheckIcon className="inputBox__icon" onClick={e => {
          handleSubmit(value);
          setIsActive(false);
        }} /> : <PencilIcon className="inputBox__icon" onClick={e => setIsActive(true)}/>}
      </div>
    </div>
  );
};

const StartConversationDrawer = (props) => {
  const { openDrawer, handleCloseDrawer } = props;
  const { profileImage, displayName, status } = useSelector(
    (state) => state.user
  );
  const drawerControl = useAnimation();
  const profileImageContainerController = useAnimation();
  const formController = useAnimation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { background, icon } = theme.palette;

  const drawerOpeningSequence = async () => {
    await drawerControl.start({ x: 0, transition: { duration: "0.5" } });
    await profileImageContainerController.start({
      height: "250px",
      width: "250px",
      transition: { duration: "0.2" },
      y: 0,
    });
    await formController.start({
      y: 0,
      opacity: 1,
      transition: { duration: "0.5" },
    });
  };
  const drawerClosingSequence = async () => {
    await drawerControl.start({ x: -1000, transition: { duration: "0.5" } });
    profileImageContainerController.start({
      height: "0px",
      width: "0px",
      y: +125,
      transition: { duration: 0 },
    });
    formController.start({ y: -50, opacity: 0 });
  };
  useEffect(() => {
    if (openDrawer) {
      drawerOpeningSequence();
      return;
    }
    drawerClosingSequence();
  }, [openDrawer]);

  return (
    <motion.div
      className="profileDrawer"
      animate={drawerControl}
      initial={{ x: -1000 }}
      style={{ background: background.siderBarChatListBackground }}
    >
      <div
        className="profileDrawer__header"
        style={{
          background: background.headerColorLight,
          color: background.siderBarChatListBackground,
        }}
      >
        <ArrowBackIcon onClick={(e) => handleCloseDrawer()} />
        <h4>Profile</h4>
      </div>
      <div
        className="profileDrawer__body"
        style={{ background: background.profileDrawerBackground }}
      >
        <motion.div
          className="profileDrawer__body__image-container"
          initial={{ height: "0px", width: "0px" }}
          animate={profileImageContainerController}
        >
          <div
            className="profileDrawer__body__image-container__upload-img"
            style={{ background: background.uploadPicOverlayBackground }}
          >
            <CameraIcon
              style={{
                height: "25px",
                width: "25px",
                color: background.siderBarChatListBackground,
              }}
            />
            <div
              className="profileDrawer__body__image-container__upload-img__text"
              style={{ color: background.siderBarChatListBackground }}
            >
              <span>Add Profile</span>
              <span style={{ alignSelf: "center" }}>Photo</span>
            </div>
          </div>
          {profileImage.contentType ? (
            <ImageFromBuffer
              arrayBuffer={profileImage.data.data}
              contentType={profileImage.contentType}
              className="profileDrawer__body__profileImage"
              style={{ cursor: "pointer" }}
            />
          ) : (
            <AccountCircleIcon color="red" style={{ cursor: "pointer" }} />
          )}
        </motion.div>
        <motion.div
          className="profileDrawer__body__form"
          initial={{ opacity: 0, y: -50 }}
          animate={formController}
        >
          <InputBox label="Your Name" value={displayName} handleSubmit={value => {}}/>
          <InputBox label="About" handleSubmit={value => {}} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StartConversationDrawer;
