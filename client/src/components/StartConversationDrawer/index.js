import React, {useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useSelector,useDispatch } from "react-redux";
import {setCurrentRoom} from "../../store/actions/roomAction";
import { useTheme } from "@material-ui/core";
import SearchBar from "../SearchBar";
import { AccountCircle as AccountCircleIcon } from "@material-ui/icons";
import "./style.scss";
import {
  ArrowBack as ArrowBackIcon,
  Search as SearchIcon,
} from "@material-ui/icons";
import ImageFromBuffer from "../ImageFromBuffer";
import { ListGroup } from "react-bootstrap";

const StartConversationDrawer = (props) => {
  const { openDrawer, handleCloseDrawer } = props;
  const { chatRooms, id,status } = useSelector((state) => state.user);
  const drawerControl = useAnimation();
  const [activeIndex,setActiveIndex] = useState(-1);
  const [hoverIndex,setHoverIndex ] = useState(-1);  
  const dispatch = useDispatch();
  const theme = useTheme();
  const [searchInput, setSearchInput] = useState('');
  const { background, text } = theme.palette;
  const drawerOpeningSequence = async () => {
    await drawerControl.start({ x: 0, transition: { duration: "0.5" } });
  };
  const drawerClosingSequence = async () => {
    await drawerControl.start({ x: -1000, transition: { duration: "0.5" } });
  };
  useEffect(() => {
    if (openDrawer) {
      drawerOpeningSequence();
      return;
    }
    drawerClosingSequence();
  }, [openDrawer]);
  
  const handleCurrentRoomChange = (e, roomId) => {
    e.preventDefault();
    dispatch(setCurrentRoom(roomId));
    handleCloseDrawer();
  }

  const showInactiveChatRooms = () => {
 
    const inactiveRoomsComponents = chatRooms.map((room,index) => {
      if(!room.chats)
        {
          return <></> ;
        }
      if (room.chats.length === 0) {
        const otherUserInfo =
          id === room.users[0]._id ? room.users[1] : room.users[0];
          if (
            searchInput &&
            !otherUserInfo.displayName.match(new RegExp(`${searchInput}`, "i"))
          ) {
            return <></>;
          }
        return (
          <ListGroup.Item className="startConversationDrawer__body__user-info-wrapper" onClick={e => handleCurrentRoomChange(e, room._id)} style={hoverIndex === index ? {
            background:background.chatListBackgroundHover,
          } : {} } onMouseEnter={e => setHoverIndex(index)} onMouseLeave={e => setHoverIndex(-1)}>
            <div className="startConversationDrawer__body__user-info" >
             {otherUserInfo.profileImage.contentType ? <ImageFromBuffer
                className="profileImage"
                arrayBuffer={otherUserInfo.profileImage.data.data}
                contentType={otherUserInfo.profileImage.contentType}
              /> : <AccountCircleIcon  style={{height:"50px", width:"50px"}} /> }
              <div className="startConversationDrawer__body__user-info__name-and-status" >
                  <h5>{otherUserInfo.displayName}</h5>
                  <p>{status}</p>
              </div>
            </div>
          </ListGroup.Item>
        );
      }
      return <></>;
    });
    return inactiveRoomsComponents;
  };
  return (
    <motion.div
      className="startConversationDrawer"
      animate={drawerControl}
      initial={{ x: -1000 }}
      style={{ background: background.siderBarChatListBackground }}
    >
      <div
        className="startConversationDrawer__header"
        style={{
          background: background.headerColorLight,
          color: background.siderBarChatListBackground,
        }}
      >
        <ArrowBackIcon onClick={(e) => handleCloseDrawer()} />
        <h4>New chat</h4>
      </div>
      <div className="startConversationDrawer__body">
       <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} placeHolder={"Search user.."}/>
        <div className="startConversationDrawer__body__chatList">
          <ListGroup>{showInactiveChatRooms()}</ListGroup>
        </div>
      </div>
    </motion.div>
  );
};

export default StartConversationDrawer;
