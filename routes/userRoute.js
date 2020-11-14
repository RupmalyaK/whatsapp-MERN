import UserModel from "../model/UserModel.js";
import RoomModel from "../model/RoomModel.js";
import { isAuthenticated } from "../controller/authController.js";
import { Router } from "express";
import mongoose from "mongoose";

const router = Router();

router.get("/search/:searchString", isAuthenticated, async (req, res, next) => {
  const { searchString } = req.params;
  try {
    if (!searchString) {
      res.status(200).json([]);
      return;
    }
    const users = await UserModel.find({
      displayName: { $regex: new RegExp(searchString, "i") },
    });

    const startWith = [];
    const notStartWith = [];
    users.forEach((user) => {
      if (user.displayName.match(new RegExp(`^${searchString}`, "i"))) {
        startWith.push(user);
      } else {
        notStartWith.push(user);
      }
    });
    const allUsers = [...startWith, ...notStartWith];
    res.status(200).json(allUsers.slice(0, 10));
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get("/singleuser/:userId", isAuthenticated, async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await UserModel.findById(mongoose.Types.ObjectId(userId))
      .populate({
        path: "chatRooms",
        model: "chatRoom",
        populate: {
          path: "users",
          model: "user",
        },
      })
      .exec();
    if (!user) {
      throw new Error("No user exist with this id");
    }
    if (user.chatRooms.length < 2) {
      res.status(200).json(user);
      return;
    }
    user.chatRooms.sort((room1, room2) => {
      if (room1.chats.length === 0 || room2.chats.length === 0) {
        return -1;
      }
     
      return (
        new Date(room2.chats[room2.chats.length - 1].time) -
        new Date(room1.chats[room1.chats.length - 1].time)
      );
    });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    next(err);
  }
});
export default router;