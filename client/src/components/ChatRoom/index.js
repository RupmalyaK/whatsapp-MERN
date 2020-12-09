import React, { useState, useEffect } from "react";
import { useTheme } from "@material-ui/core";
import "./style.scss";
import {
  Search as SearchIcon,
  MoreVert as MenuIcon,
  InsertEmoticon as SmileyIcon,
  AttachFile as AttatchFileIcon,
  Mic as MicIcon,
} from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import ImageWithBuffer from "../ImageFromBuffer";
import {
  sendMessageSocket,
  createRoomAndJoinSocket,
} from "../../utils/socketUtils";
import { addChatToRoom } from "../../store/actions/userAction";
import getDay from "../../utils/day";

const status = "online";

const ChatRoom = (props) => {
  const theme = useTheme();
  const { background: backgroundColor, text: textColor } = theme.palette;
  const headerIconColor = theme.palette.icon.hederIconColor;
  const [textInput, setTextInput] = useState("");
  const currentRoomId = useSelector((state) => state.room.currentChatRoomId);
  const currentRoom = useSelector((state) =>
    state.user.chatRooms.find((room) => room._id === currentRoomId)
  );
  const userId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();
  useEffect(() => {}, []);
  if (!currentRoom) {
    return <></>;
  }
  const otherUserInfo =
    currentRoom.users[0]._id === userId
      ? currentRoom.users[1]
      : currentRoom.users[0];
  const { displayName, profileImage } = otherUserInfo;

  const sendMessage = () => {
    dispatch(addChatToRoom(currentRoomId, textInput));
    sendMessageSocket({ userId, roomId: currentRoom._id, text: textInput });
  };

  const showChats = () => {
    if (currentRoom.chats.length == 0) {
      return <></>;
    }

    const ChatComponents = currentRoom.chats.map((chat) => {
      const date = new Date(chat.time);
      const day = getDay(new Date().getHours() - date.getHours());
      console.log(day);
      if (userId === chat.sender) {
        return (
          <div
            className="chatRoom__body__chats__chat chatRoom__body__chats__chat-user"
            style={{ background: backgroundColor.outGoingBackground }}
            key={chat._id}
          >
            <span className="chatRoom__body__chats__chat__text chatRoom__body__chats__chat-user__text">{chat.text}</span>
            <span className="chatRoom__body__chats__chat-user__time">{date.getHours() + '.' + date.getMinutes()}</span>
          </div>
        );
      }
      return (
        <div
          className="chatRoom__body__chats__chat chatRoom__body__chats__chat-other-user"
          style={{ background: backgroundColor.incommingBackground }}
        >
           <span className="chatRoom__body__chats__chat__text chatRoom__body__chats__chat-other-user__text">{chat.text}</span>
           <span className="chatRoom__body__chats__chat-other-user__time">{date.getHours() + '.' + date.getMinutes()}</span>
        </div>
      );
    });

    return ChatComponents;
  };

  return (
    <div className="chatRoom">
      <div
        className="chatRoom__header"
        style={{ background: backgroundColor.headerBackground }}
      >
        <div className="chatRoom__header__left">
          <ImageWithBuffer
            className="chatRoom__img"
            contentType={profileImage.contentType}
            arrayBuffer={profileImage.data.data}
          />
          <div className="chatRoom__header__left__info">
            <span
              className="chatRoom__header__left__info__name"
              style={{ color: textColor.primaryStrong }}
            >
              {displayName}
            </span>
            <span>{status}</span>
          </div>
        </div>
        <div className="chatRoom__header__right">
          <SearchIcon style={{ color: headerIconColor }} />
          <MenuIcon style={{ color: headerIconColor }} />
        </div>
      </div>
      <div
        className="chatRoom__body"
        style={{ backgroundImage: `url(./images/chat-background-1.jpg)` }}
      >
        <div className="chatRoom__body__chats">{showChats()}</div>
      </div>
      <div
        className="chatRoom__footer"
        style={{ background: backgroundColor.headerBackground }}
      >
        <SmileyIcon style={{ color: headerIconColor }} />
        <AttatchFileIcon style={{ color: headerIconColor }} />
        <input
          className="chatRoom__footer__input"
          style={{ background: backgroundColor.searchInputBackground }}
          value={textInput}
          placeholder="search or start a new chat"
          onKeyPress={(e) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();

            if (e.repeat) {
              return;
            }
            console.log(e.key);

            if (e.key === "Enter") {
              sendMessage();
              setTextInput("");
            }
          }}
          onChange={(e) => setTextInput(e.target.value)}
        ></input>
        <MicIcon style={{ color: headerIconColor }} />
      </div>
    </div>
  );
};

export default ChatRoom;
