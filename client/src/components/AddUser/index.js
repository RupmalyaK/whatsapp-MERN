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
import {getUserIdByEmail} from "../../api/usersApi.js";
import Swal from "sweetalert2";

const AddUser = (props) => {
  const [isSearchByName, setIsSearchByName] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [emailInput,setEmailInpuit] = useState('');
  const dispatch = useDispatch();
  const { searchedUsers, id: userId, friendList,email,isSearchingUsers } = useSelector(
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

  const findAndAddUserByEmail = async (otherUserEmail) => {
  if(email === otherUserEmail)
    {
      return;
    }
  try{
    const {userId:otherUserId} = await getUserIdByEmail(otherUserEmail);
    createRoomAndJoinSocket(userId,otherUserId);
    Swal.fire('Friend request sent.')
  }
  catch(err)
    {
     Swal.fire("User not found.");
    }
  }
  const searchByName = () => {
    return (
      <>
        <SearchBar
          searchInput={searchInput}
          setSearchInput={setSearchByNameInput}
          placeHolder={"Search for user by name"}
        />
        {isSearchingUsers ?  <div className="addUser__loader" style={{borderTopColor:background.buttonBackground}}/> : <></>}
       {isSearchingUsers || <ListGroup>
          {Array.isArray(searchedUsers) && searchedUsers.map((user) => {
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
        </ListGroup>}
      </>
    );
  };
  const addByEmail = () => {
    return (
      <div style={{display:"flex", flexDirection:"column",alignContent:"center", justifyContent:"flex-start"}}>
        <SearchBar searchInput={emailInput} setSearchInput={setEmailInpuit} placeHolder={"Add user by email"}/>
        <Button onClick={e => findAndAddUserByEmail(emailInput)} style={{display:"inline"}} >Add user by email</Button>
      </div>
    );
  };
  return (
    <>
      <Modal.Header closeButton className="addUser">
        <Button className="mr-2" onClick={(e) => setIsSearchByName(true)} variant={isSearchByName ? "primary" : "secondary"}>
          Search By Name
        </Button>
        <Button variant={isSearchByName ?  "secondary" :  "primary"} onClick={(e) => setIsSearchByName(false)}>
          Add By Email
        </Button>
      </Modal.Header>
      <Modal.Body style={{ height: "500px", overflow: "auto",position:"relative" }}>
        {isSearchByName ? searchByName() : addByEmail()}
      </Modal.Body>
    </>
  );
};

export default AddUser;
