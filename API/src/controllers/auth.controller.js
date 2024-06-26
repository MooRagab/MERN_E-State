import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import { sendEmail } from "../services/email.js";
import User from "../../DB/models/user.model.js";
import { asyncHandler } from "../middlewares/errHandler.js";

export const signup = asyncHandler(async (req, res, next) => {
  const { email, username, password } = req.body;
  const user = await User.findOne({ email, username }).select("email");
  if (user) {
    next(
      Error("E-mail or username is already exist", {
        cause: 409,
      })
    );
  } else {
    const hash = bcrypt.hashSync(password, parseInt(process.env.SALTROUND));
    const newUser = new User({
      email,
      password: hash,
      username,
    });
    await newUser.save();
    res.status(201).json("User created successfully!");
    // const token = jwt.sign({ id: newUser._id }, process.env.EMAILTOKEN, {
    //   expiresIn: "1h",
    // });
    // const link = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/confirmemail/${token}`;
    // const message = `<a href = "${link}">Confirm Your E-mail</a>`;
    // const info = await sendEmail(email, "Confirm Email", message);
  }
});

// export const confirmEmail = asyncHandler(async (req, res, next) => {
//   const { token } = req.params;
//   const decoded = jwt.verify(token, process.env.EMAILTOKEN);

//   if (!decoded?.id) {
//     res.status(400).json({ message: "In-Valid PayLoad" });
//   } else {
//     const user = await User.findOneAndUpdate(
//       { _id: decoded.id, confirmEmail: false },
//       { confirmEmail: true }
//     );
//     if (!user) {
//       res.status(409).json({ message: "E-mail Is Already Confirmed" });
//     } else {
//       res.status(200).json({ message: "Confirmed" });
//     }
//   }
// });

export const signIn = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    next(
      Error("User not found", {
        cause: 404,
      })
    );
  }
  const match = bcrypt.compareSync(password, user.password);
  if (!match) { 
    next(Error("In-Valid Password", { cause: 400 }));
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  const { password: pass, ...rest } = user._doc;

  res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest);
});
