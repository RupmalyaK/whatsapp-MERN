import React, { useState } from "react";
import { useTheme } from "@material-ui/core";
import ImageFromBuffer from "../ImageFromBuffer";
import { AccountCircle as AccountCircleIcon } from "@material-ui/icons";
import "./style.css";

const ChatSnippet = (props) => {
  const {
    name,
    profileImage,
    lastMessage,
    timeStamp,
    isSelected,
    style,
    time,
    ...otherProps
  } = props;
  const [isHovering, setIsHovering] = useState(false);
  const theme = useTheme();
  const date = new Date(time);
  const { background,text } = theme.palette;
  return (
    <div
      className="chatSnippet"
      style={
        isHovering
          ? { background: background.chatListBackgroundHover, ...style }
          : { ...style }
      }
      {...otherProps}
      onMouseEnter={(e) => setIsHovering(true)}
      onMouseLeave={(e) => setIsHovering(false)}
    >
      {profileImage.contentType ? (
        <ImageFromBuffer
          className="chatSnippet__image"
          contentType={profileImage.contentType}
          arrayBuffer={profileImage.data.data}
        />
      ) : (
        <AccountCircleIcon  style={{height:"50px", width:"50px"}} />
      )}
      <div className="chatSnippet__body">
        <span className="chatSnippet__body__name">{name}</span>
        <span className="chatSnippet__body__lm">{lastMessage}</span>
        <span className="chatSnippet__body__time">{time}</span>
      </div>
    </div>
  );
};

export default ChatSnippet;
