import React, { useRef, useEffect, useState } from "react";
import "./style.css";
import { useTheme } from "@material-ui/core";
import {
  AccountCircle as AccountCircleIcon,
  Message as MessageIcon,
  MoreVert as MenuIcon,
  Search as SearchIcon,
  ArrowDownward,
} from "@material-ui/icons";
import ChatSnippet from "../ChatSnippet";
import { Button, Modal } from "react-bootstrap";
import AddUser from "../AddUser";
import ConvoDrawer from "../StartConversationDrawer";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentRoom } from "../../store/actions/roomAction";
import SidebarDropdown from "../SidebarDropdown";
import ImageFromBuffer from "../ImageFromBuffer";
import ProfileDrawer from "../ProfileDrawer";
import { motion, useAnimation } from "framer-motion";
import SearchBar from "../SearchBar";
import getDay from "../../utils/day.js";

const SideBar = (props) => {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isConvoDrawerOpen, setIsConvoDrawerOpen] = useState(false);
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);
  const [isSidebarDropdownOpen, setIsSidebarDropdownOpen] = useState(false);
  const [addedUserNumber, setAddedUserNumber] = useState(0);
  const [isAddButtonHovering, setIsAddButtonHovering] = useState(false);
  const dropDownRef = useRef();
  const [searchInput, setSearchInput] = useState("");

  const theme = useTheme();
  const dispatch = useDispatch();



  const { chatRooms, id: userId, profileImage } = useSelector(
    (state) => state.user
  );

  const activeChatRoomId = useSelector((state) => state.room.currentChatRoomId);

  useEffect(() => {
    const checkClickOutsideBox = (e) => {
      console.log(dropDownRef.current);
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setIsSidebarDropdownOpen(false);
      }
    };

    document.addEventListener("click", checkClickOutsideBox);

    const onUnmount = () => {
      document.removeEventListener("click", checkClickOutsideBox);
    };
    return onUnmount;
  });

  useEffect(() => {
    let counter = 0;
    for (let i = 0; i < chatRooms.length; i++) {
      if (counter > 100) {
        break;
      }
      if (chatRooms[i].chats.length === 0) {
        counter++;
      }
    }
    setAddedUserNumber(counter);
  }, [chatRooms]);


  const { background, text, icon } = theme.palette;

  const showRoomsWithChat = () => {
    let RoomComponents = [];
    chatRooms.forEach((room, index) => {
      if (!room.chats) {
        return <></>;
      }

      if (room.chats.length !== 0) {
        const otherUserInfo =
          room.users[0]._id === userId ? room.users[1] : room.users[0];
        if (
          searchInput &&
          !otherUserInfo.displayName.match(new RegExp(`${searchInput}`, "i"))
        ) {
          return <></>;
        }
        let date = new Date(room.chats[room.chats.length - 1].time);
        const diffTime = Math.abs(new Date() - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        let currentDay = getDay(diffDays,date);
        if(currentDay === "Today")
          {
            currentDay = `${date.getHours()}:${date.getMinutes()}`;
          }
        RoomComponents.push(
          <ChatSnippet
            name={otherUserInfo.displayName}
            profileImage={otherUserInfo.profileImage}
            lastMessage={room.chats[room.chats.length - 1].text}
            time={currentDay}
   
            onClick={(e) => dispatch(setCurrentRoom(room._id))}
            style={
              room._id === activeChatRoomId
                ? { background: background.chatListBackgroundActive }
                : {}
            }
          />
        );
      }
    });

    return RoomComponents;
  };

  return (
    <>
      <Modal
        show={isAddUserModalOpen}
        onHide={() => setIsAddUserModalOpen(false)}
        size="lg"
        centered
      >
        <AddUser />
      </Modal>

      <div className="sideBar">
        <ConvoDrawer
          openDrawer={isConvoDrawerOpen}
          handleCloseDrawer={(e) => {
            setIsConvoDrawerOpen(false);
          }}
        />
        <ProfileDrawer
          openDrawer={isProfileDrawerOpen}
          handleCloseDrawer={(e) => setIsProfileDrawerOpen(false)}
        />
        <div
          className="sideBar__header"
          style={{ background: background.headerBackground }}
        >
          <div className="sideBar__header__left">
            {profileImage.contentType ? (
              <ImageFromBuffer
                arrayBuffer={profileImage.data.data}
                contentType={profileImage.contentType}
                className="chatSnippet__image"
                style={{ cursor: "pointer" }}
                onClick={(e) => setIsProfileDrawerOpen(true)}
              />
            ) : (
              <AccountCircleIcon
                style={{ cursor: "pointer" }}
                onClick={(e) => setIsProfileDrawerOpen(true)}
              />
            )}
          </div>
          <div className="sideBar__header__right">
            <div className="sideBar__header__right__container">
              <span
                className="sideBar__header__right__container__num"
                style={{ color: icon.addedUserIconNumber }}
              >
                {addedUserNumber ? addedUserNumber : ""}
              </span>
              <MessageIcon
                style={{ color: icon.iconColor }}
                onClick={(e) => setIsConvoDrawerOpen(true)}
              />
            </div>

            <div className="sidebar__menu-icon-wrapper">
              <MenuIcon
                onClick={(e) => setIsSidebarDropdownOpen(true)}
                ref={dropDownRef}
                style={{ color: icon.iconColor }}
              />
              <SidebarDropdown isOpen={isSidebarDropdownOpen} />
            </div>
          </div>
        </div>
        <SearchBar searchInput={searchInput} setSearchInput={setSearchInput}  placeHolder={"Search user.."} />  
        <div
          className="sideBar__chats"
          style={{ background: background.siderBarChatListBackground }}
        >
          {showRoomsWithChat()}
        </div>
        <Button
          className="sideBar__add__button"
          onClick={(e) => setIsAddUserModalOpen(true)}
          onMouseEnter={e => setIsAddButtonHovering(true)}
          onMouseLeave={e => setIsAddButtonHovering(false)}
          style={{
            background:isAddButtonHovering ? background.buttonBackgroundHover : background.buttonBackground,
            color: text.inverseStrong,
            height:"50px"
          }}
        >
          Add user
        </Button>
      </div>
    </>
  );
};

export default SideBar;
