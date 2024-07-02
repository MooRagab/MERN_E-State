import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import { sendEmail } from "../services/email.js";
import User from "../../DB/models/user.model.js";
import { errorHandler } from "../middlewares/errHandler.js";

export const signup = async (req, res, next) => {
  const { email, username, password } = req.body;
  const user = await User.findOne({ email, username }).select("email");
  try {
    if (user) {
      return next(errorHandler(409, "Email is already in use"));
    } else {
      const hash = bcrypt.hashSync(password, parseInt(process.env.SALTROUND));
      const newUser = new User({
        email,
        password: hash,
        username,
      });
      await newUser.save();
      res.status(201).json("User created successfully!");
    }
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return next(errorHandler(404, "User not found!"));
    const match = bcrypt.compareSync(password, user.password);
    if (!match) return next(errorHandler(401, "Wrong credentials!"));
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        cpassword: hashedPassword,
        pfp: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
