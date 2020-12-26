import React, { useState, useEffect } from "react";
import { Modal, Button, ListGroup } from "react-bootstrap";
import { useTheme } from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsersByName,
  addUserToRoom,
} from "../../store/actions/userAction.js";
import ImageFromBuffer from "../ImageFromBuffer";
import "./style.scss";
import { createRoomAndJoinSocket } from "../../utils/socketUtils.js";
import SearchBar from "../SearchBar";

const AddUser = (props) => {
  const [isSearchByName, setIsSearchByName] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  const { searchedUsers, id: userId, friendList } = useSelector(
    (state) => state.user
  );
  const theme = useTheme();

  useEffect(() => {
    dispatch(getUsersByName());
  }, []);

  const { background, text } = theme.palette;

  const setSearchByNameInput = (value) => {
    setSearchInput(value);
    dispatch(getUsersByName(value));
  };

  const handleAddUserToRoom = (e, otherUserId) => {
    createRoomAndJoinSocket(userId, otherUserId);
  };

  const searchByName = () => {
    return (
      <>
        <SearchBar
          searchInput={searchInput}
          setSearchInput={setSearchByNameInput}
          placeHolder={"Search for user by name"}
        />

        <ListGroup>
          {searchedUsers.map((user) => {
            const otherUserId = user._id;
            if (userId === otherUserId) {
              return <></>;
            }
            return (
              <div className="addUser__users-list">
                <ImageFromBuffer
                  arrayBuffer={user.profileImage.data.data}
                  contentType={user.profileImage.contentType}
                  className="addUser__users-list__img"
                />
                <h5 className="addUser__users-list__name">
                  {user.displayName}
                </h5>
                <Button
                  className="addUser__users-list__button"
                  variant={friendList[otherUserId] ? "secondary" : "success"}
                  disabled={friendList[otherUserId]}
                  onClick={(e) => handleAddUserToRoom(e, user._id)}
                >
                  {friendList[otherUserId] ? "added" : "add"}
                </Button>
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
        <SearchBar searchInput={searchInput} setSearchInput={setSearchByNameInput} placeHolder={"Add user by email"}/>
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
      <Modal.Body style={{ height: "500px", overflow: "auto" }}>
        {isSearchByName ? searchByName() : addByEmail()}
      </Modal.Body>
    </>
  );
};

export default AddUser;
