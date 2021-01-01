import UserModel from "../model/UserModel.js";
import RoomModel from "../model/RoomModel.js";
import { isAuthenticated } from "../controller/authController.js";
import { Router } from "express";
import mongoose from "mongoose";
import multer from "multer";


const router = Router();
const upload = multer();

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
   // console.log(err);
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
  //  console.log(err);
    next(err);
  }
});

router.put(
  "/updateuser/:userId",
  isAuthenticated,
  upload.single("profileImage"),
  async (req, res, next) => {
    const { displayName, status,socketId, removeProfileImage } = req.body;
    try {
      const user = await UserModel.findById(mongoose.Types.ObjectId(req.params.userId))
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
      user.displayName = displayName || user.displayName;
      user.status = status || user.status;
      if (req.file ? req.file.fieldname === "profileImage" : false) {
        const profileImage = req.file;
        user.profileImage = {
          data:profileImage.buffer,
          contentType:profileImage.mimetype,
        };
      } else if (removeProfileImage) {
        user.profileImage = {
          data: [],
          contentType: "",
        };
      }
      user.socketId = socketId || user.socketId;
      await user.save();
      res.status(200).json(user);
    } catch (err) {
    //  console.log(err);
      next(err);
    }
  }
);
router.get("/getidbyemail/:email", async (req,res,next) => {
  console.log(req.params.email);
  try{
      const user = await UserModel.findOne({email:req.params.email}); 
      if(!user)
        {
          throw new Error("No user exist with this email"); 
        }
       res.status(200).json({userId:user._id}); 
     }
  catch(err)
    {
      console.log(err);
      next(err);
    }
});


export default router;
