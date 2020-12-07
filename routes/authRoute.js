import UserModel from "../model/UserModel";
import bcrypt from "bcrypt";
import {
  isAuthenticated,
  limitRequestFromTheUser,
  signUpValidationMiddlewaresArr,
} from "../controller/authController.js";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import multer from "multer";
import { Router } from "express";

const upload = multer();
const router = Router();

router.post(
  "/signup",
  upload.single("profilePic"),
  //signUpValidationMiddlewaresArr,
  async (req, res, next) => {
    const { email, password, displayName } = req.body;
    console.log(email,password,displayName);
    let profilePic = {
      buffer:[],
      mimetype:'',
    };
   
    if (req.file ? req.file.fieldname === "profilePic" : false) {
      profilePic = req.file;
    }
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log("Adsda");
    try {
      const user = await UserModel.findOne({ email });
      if (user) {
        throw new Error("User already exist with that username");
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = await UserModel.create({
        email,
        password: hashPassword,
        displayName,
        profileImage:{
          data:profilePic.buffer,
          contentType:profilePic.mimetype,
        },
        status:"Hey there! I am using WhatsApp."
      });
      const accessToken = jwt.sign(
        { email, password },
        process.env.JWT_SECRET,
        {
          expiresIn: "365d",
        }
      );
      const doc = newUser._doc;
      doc.accessToken = accessToken;
      delete doc.password;
      res.status(200).json(doc);
    } catch (error) {
      console.log(error);
      res.status(500);
      res.error = error;
      next();
    }
  }
);

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email }).populate({
      path: "chatRooms",
      model: "chatRoom",
      populate: {
        path: "users",
        model: "user",
      },
    });
    if (!user) {
      throw "User with that email does not exist";
    }
    const isPasswordRight = await bcrypt.compare(password, user.password);
    if (!isPasswordRight) {
      throw "Wrong password";
    }
    const doc = user._doc;
    const accessToken = await jwt.sign(
      { email, password },
      process.env.JWT_SECRET,
      {
        expiresIn: "365d",
      }
    );
    doc.accessToken = accessToken;
    delete doc.password;
    res.status(200).json(doc);
  } catch (error) {
    res.status(500);
    res.errors = error;
    next();
  }
});

router.get("/", async (req, res) => {
  const users = await UserModel.find({});
  res.status(200).json(users);
});

export default router;

/*(async () => {
    await UserModel.deleteMany({});
})();*/
