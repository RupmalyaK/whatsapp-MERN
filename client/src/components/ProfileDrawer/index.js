import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@material-ui/core";
import "./style.scss";
import {
  AccountCircle as AccountCircleIcon,
  ArrowBack as ArrowBackIcon,
  CameraAlt as CameraIcon,
  Create as PencilIcon,
  Check as CheckIcon,
} from "@material-ui/icons";
import { updateUserAsync } from "../../store/actions/userAction";
import ImageFromBuffer from "../ImageFromBuffer";

const InputBox = (props) => {
  const { label, handleSubmit, value, isDisable,showNoOfCharLeft,maxChar, ...otherProps } = props;
  const theme = useTheme();
  const [currentValue, setCurrentValue] = useState(value);
  const [isActive, setIsActive] = useState(false);
  const { background, icon } = theme.palette;
  const inputRef = useRef(null);

  useEffect(() => {
    isActive && inputRef.current.focus();
  });

  useEffect(() => {
    isDisable && setIsActive(false);
  }, [isDisable]);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

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
      <div
        className="inputBox__outer"
        style={
          isActive
            ? {
                borderBottom: `2px solid ${background.headerDarkBackground}`,
              }
            : {}
        }
      >
        <input
          className="inputBox__input"
          readOnly={!isActive}
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
          ref={inputRef}
          maxLength={maxChar || 120}
        ></input>
        
        {isActive ? (
          
          <>
          {showNoOfCharLeft && <span className="inputBox__char-left">{maxChar - currentValue.length}</span>}
          <CheckIcon
            className="inputBox__icon"
            onClick={(e) => {
              handleSubmit(currentValue);
              setIsActive(false);
            }}
          />
          </>
        ) : (
          <PencilIcon
            className="inputBox__icon"
            onClick={(e) => setIsActive(true)}
          />
        )}
      </div>
    </div>
  );
};

const ProfileDrawer = (props) => {
  const { openDrawer, handleCloseDrawer } = props;
  const [profileImageHover, setProfileImageHover] = useState(false);
  const [profileImageClickPos, setProfileImageClickPos] = useState(null);
  const { profileImage, displayName, status } = useSelector(
    (state) => state.user
  );
  const drawerControl = useAnimation();
  const profileImageContainerController = useAnimation();
  const formController = useAnimation();
  const menuRef = useRef(null);
  const menuControl = useAnimation();
  const [picFile, setPicFile] = useState(null);
  const dispatch = useDispatch();
  const theme = useTheme();
  const [currentProfileImage, setCurrentProfileImage] = useState(profileImage);
  const hiddenFileInputRef = useRef(null);
  const menuHeight = 90;
  const menuWidth = 150;

  const { background, icon } = theme.palette;

  const openMenuAnm = async () => {
    await menuControl.set({ scale: 0, opacity: 0 });
    await menuControl.start({ scale: 1, opacity: 1 });
  };
  const closeMenuAnm = async () => {
    await menuControl.start({ scale: 0, opacity: 0 });
  };

  useEffect(() => {
    profileImageClickPos ? openMenuAnm() : closeMenuAnm();
  }, [profileImageClickPos]);

  useEffect(() => {
    const checkClickOutsideBox = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setProfileImageClickPos(null);
      }
    };

    document.addEventListener("click", checkClickOutsideBox);

    const onUnmount = () => {
      document.removeEventListener("click", checkClickOutsideBox);
    };
    return onUnmount;
  }, []);

  const getMouseClickPos = (e) => {
    const currentTargetRect = e.currentTarget.getBoundingClientRect();
    return [e.clientX, e.clientY];
  };

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

  const handleImageUpload = e => {
    if(e.target.files[0])
      {
        
        const reader = new FileReader(); 
        const file = e.target.files[0];
        const imageObject = {
          contentType:file.type,
        };
        reader.onload = (e) => {
          const arrayBuffer = e.target.result;
          imageObject.data = {type:"Buffer", data:arrayBuffer}
          setCurrentProfileImage(imageObject);
        }
        reader.readAsArrayBuffer(file)
        const formData = new FormData();
        formData.append("profileImage", e.target.files[0]);   
        dispatch(updateUserAsync("photo",formData));
      }
  
  }

  return (
    <motion.div
      className="profileDrawer"
      animate={drawerControl}
      initial={{ x: -1000 }}
    >
        <input
                type="file"
                name="profileImageInput"
                accept="image/*"
                style={{display:"none"}}
                ref={hiddenFileInputRef}
                onChange={handleImageUpload}
              />
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
          onMouseEnter={(e) => setProfileImageHover(true)}
          onMouseLeave={(e) => setProfileImageHover(false)}
          onClick={(e) => setProfileImageClickPos(getMouseClickPos(e))}
          ref={menuRef}
        >
          {(!profileImage || profileImageHover || profileImageClickPos) && (
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
                {!profileImage && (
                  <>
                    <span>Add Profile</span>
                    <span style={{ alignSelf: "center" }}>Photo</span>
                  </>
                )}
                {(profileImageHover || profileImageClickPos) && profileImage && (
                  <>
                    <span style={{ alignSelf: "center" }}>Change</span>
                    <span style={{ alignSelf: "center" }}>Profile Picture</span>
                  </>
                )}
              </div>
            </div>
          )}

          {currentProfileImage.contentType ? (
            <ImageFromBuffer
              arrayBuffer={currentProfileImage.data.data}
              contentType={currentProfileImage.contentType}
              className="profileDrawer__body__profileImage"
              style={{ cursor: "pointer" }}
            />
          ) : (
            <AccountCircleIcon color="red" style={{ cursor: "pointer" }} />
          )}
        </motion.div>
        {profileImageClickPos && (
          <motion.div
            className="profileDrawer__body__image-container__upload-img__menu"
            style={{
              left: profileImageClickPos[0] + "px",
              top: profileImageClickPos[1] + "px",
              height: menuHeight + "px",
              width: menuWidth + "px",
              background: background.siderBarChatListBackground,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={menuControl}
          >
            <div className="pb-2 pt-3 pl-3" style={{ cursor: "pointer" }} onClick = {e => {hiddenFileInputRef.current.click()}}>
              {" "}
            
             Upload Photo 
            </div>
            <div className="pb-2 pt-3 pl-3" style={{ cursor: "pointer" }} onClick={e => {
              dispatch(updateUserAsync("photo",{removeProfileImage:true}));
              setCurrentProfileImage({contentType:""});
              }}>
              Remove Photo
            </div>
          </motion.div>
        )}
        <motion.div
          className="profileDrawer__body__form"
          initial={{ opacity: 0, y: -50 }}
          animate={formController}
        >
          <InputBox
            label="Your Name"
            value={displayName}
            handleSubmit={(value) => {
              if(value === displayName)
                {
                  return;
                }
              dispatch(updateUserAsync("display-name", { displayName: value }));
            }}
            isDisable={!openDrawer}
            showNoOfCharLeft 
            maxChar={25}
          />
          <InputBox
            label="About"
            value={status}
            handleSubmit={(value) => {
              if(value === status)
                {
                  return;
                }
              dispatch(updateUserAsync("status", { status: value }));
            }}
            isDisable={!openDrawer}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfileDrawer;
