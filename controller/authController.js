import jwt from "jsonwebtoken";
import { check } from "express-validator";
import UserModel from "../model/UserModel.js";

global.teacherPostingTask = {};

const notAuthorizedErrorThrow = (res) => {
  return res
    .status(401)
    .send({ error: "You are not authorized to make this request" });
};

const getAuthToken = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "bearer"
  ) {
    req.authToken = req.headers.authorization.split(" ")[1];
  } else {
    req.authToken = null;
  }
  next();
};

export const isAuthenticated = (req, res, next) => {
  getAuthToken(req, res, async () => {
    try {
      const user = await jwt.verify(req.authToken, process.env.JWT_SECRET);
      req.user = user;
      next();
    } catch (error) {
      console.log(error);
      notAuthorizedErrorThrow(res);
    }
  });
};

export const signUpValidationMiddlewaresArr = [
  check("email").isEmail().withMessage("Email Must be a valid email address"),
  check("email").custom(async (value) => {
    const user = await UserModel.findOne({ email: value });
    if (user) {
      return Promise.reject("Email User with this email already exist");
    }
    return Promise.resolve();
  }),

  check("password")
    .isLength({ min: 5 })
    .withMessage("Password Must be at least 5 character long")
    .isLength({ max: 32 })
    .withMessage("Password Must be less than 32 characters long")
    .matches(/\d/)
    .withMessage("Password Must contain at least a single digit")
    .matches(/[\W_]/)
    .withMessage("Password Must contain at least a single special character"),

  check("displayName")
    .isLength({ min: 6 })
    .withMessage("Display-name Must be at least 5 character long")
    .isLength({ max: 32 })
    .withMessage("Display-name Must be less than 32 characters long"),
];

export const limitRequestFromTheUser = (req, res, next) => {
  const { teacherId } = req.body;
  if (!teacherPostingTask[teacherId]) {
    global.teacherPostingTask[teacherId] = true;
    next();
  } else {
    res.status(400).send({ error: "Previous request is still executing" });
    console.log("Previous request is still executing");
  }
};

export const isAuthenticatedSocket = function (socket, next) {
  if (socket.handshake.query && socket.handshake.query.token) {
    jwt.verify(
      socket.handshake.query.token,
      "SECRET_KEY",
      function (err, decoded) {
        if (err) return next(new Error("Authentication error"));
        socket.decoded = decoded;
        next();
      }
    );
  } else {
    next(new Error("Authentication error"));
  }
};
