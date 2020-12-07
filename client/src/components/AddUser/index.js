import React, { useState, useEffect } from "react";
import { Modal, Button, ListGroup } from "react-bootstrap";
import { useTheme } from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { getUsersByName,addUserToRoom } from "../../store/actions/userAction.js";
import ImageFromBuffer from "../ImageFromBuffer";
import "./style.scss";
import {createRoomAndJoinSocket} from "../../utils/socketUtils.js"

const AddUser = (props) => {
  const [isSearchByName, setIsSearchByName] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  const { searchedUsers,id:userId,friendList } = useSelector((state) => state.user);
  const theme = useTheme();

  useEffect(() => {
    dispatch(getUsersByName())
  },[]);

  const { background, text } = theme.palette;

  const setSearchByNameInput = (e) => {
    setSearchInput(e.target.value);
    dispatch(getUsersByName(e.target.value));
  };

  const handleAddUserToRoom = (e, otherUserId) => {
    createRoomAndJoinSocket(userId,otherUserId);
  }

  const searchByName = () => {
    return (
      <>
        <p>
          <div
            className="sidebar__search-input-wrapper"
            style={{
              background: background.headerBackground,
              borderRadius: "25px",
            }}
          >
            <SearchIcon />
            <input
              className="sidebar__search-input"
              style={{ background: background.headerBackground }}
              placeholder="search or start a new chat"
              onChange={(e) => setSearchByNameInput(e)}
            ></input>
          </div>
        </p>
        <ListGroup>
            {searchedUsers.map(user => {
              const userId = user._id;
              return (
                <div className="addUser__users-list"> 
                    <ImageFromBuffer arrayBuffer={user.profileImage.data.data} contentType={user.profileImage.contentType} className="addUser__users-list__img"/>
                    <h5 className="addUser__users-list__name" >{user.displayName}</h5>
                    <button className="addUser__users-list__button" variant={friendList[userId] ? "secondary" : "success"} disabled={friendList[userId]}  onClick={e => handleAddUserToRoom(e,user._id)}>{friendList[userId] ? "added" : "add"}</button>
                </div>
              );
            })}
        </ListGroup>
      </>
    );
  };
  const addByEmail = () => {
    return (
      <>
        <h4>Add by Email</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </>
    );
  };
  return (
    <>
      <Modal.Header closeButton className="addUser">
        <Button className="mr-2" onClick={(e) => setIsSearchByName(true)}>
          Search By Name
        </Button>
        <Button variant="secondary" onClick={(e) => setIsSearchByName(false)}>
          Add By Email
        </Button>
      </Modal.Header>
      <Modal.Body style={{ height: "500px", overflow:"auto" }}>
        {isSearchByName ? searchByName() : addByEmail()}
      </Modal.Body>
    </>
  );
};

export default AddUser;
