import React, { useRef, useEffect, useState } from "react";
import "./style.css";
import { useTheme } from "@material-ui/core";
import {
  AccountCircle as AccountCircleIcon,
  Message as MessageIcon,
  MoreVert as MenuIcon,
  Search as SearchIcon,
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

const SideBar = (props) => {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isConvoDrawerOpen, setIsConvoDrawerOpen] = useState(false);
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);
  const [isSidebarDropdownOpen, setIsSidebarDropdownOpen] = useState(false);
  const dropDownRef = useRef(); 

  const theme = useTheme();
  const { chatRooms, id: userId, profileImage } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const activeChatRoomId = useSelector((state) => state.room.currentChatRoomId);


  useEffect(() => {
    const checkClickOutsideBox = (e) => {
      console.log(dropDownRef.current);
        if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
          setIsSidebarDropdownOpen(false);
        }
      }

    
    document.addEventListener("click",checkClickOutsideBox);

    const onUnmount = () => {
      document.removeEventListener("click", checkClickOutsideBox);
    }
    return onUnmount;
});

  const { background, text } = theme.palette;

  const showRoomsWithChat = () => {
    let RoomComponents = [];
    chatRooms.forEach((room, index) => {
      if(!room.chats)
        {
          return (<></>);
        }
      if (room.chats.length !== 0) {
        const otherUserInfo =
          room.users[0]._id === userId ? room.users[1] : room.users[0];

        RoomComponents.push(
          <ChatSnippet
            name={otherUserInfo.displayName}
            profileImage={otherUserInfo.profileImage}
            lastMessage={room.chats[room.chats.length - 1].text}
            timeStamp={"4:31pm"}
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
                color="red"
                style={{ cursor: "pointer" }}
                onClick={(e) => setIsProfileDrawerOpen(true)}
              />
            )}
          </div>
          <div className="sideBar__header__right">
            <MessageIcon onClick={(e) => setIsConvoDrawerOpen(true)} />
            <div className="sidebar__menu-icon-wrapper">
              <MenuIcon onClick={(e) => setIsSidebarDropdownOpen(true)} ref={dropDownRef} />
            <SidebarDropdown  isOpen={isSidebarDropdownOpen} /> 
            </div>
          </div>
        </div>
        <div
          className="sidebar__search-input-wrapper"
          style={{ background: background.searchContainerBackground }}
        >
          <SearchIcon />
          <input
            className="sidebar__search-input"
            style={{ background: background.searchInputBackground }}
            placeholder="search or start a new chat"
          ></input>
        </div>
        <div
          className="sideBar__chats"
          style={{ background: background.siderBarChatListBackground }}
        >
          {showRoomsWithChat()}
        </div>
        <Button
          className="sideBar__add__button"
          onClick={(e) => setIsAddUserModalOpen(true)}
          style={{
            background: background.headerBackground,
            color: text.primaryStrong,
          }}
        >
          Add user
        </Button>
      </div>
    </>
  );
};

export default SideBar;
