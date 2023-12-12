import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { AppErr, appErr } from "../utils/appErr.js";
import  generateToken  from "../utils/generateToken.js";

//Register
const registerUser = async (req, res, next) => {
  const { fullname, password, email } = req.body;
  try {
    //check if email exist
    const userFound = await User.findOne({ email });
    if (userFound) {
      return next(appErr("User Already Exist", 400));
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user
    const user = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });
    res.json({
      status: "success",
      fullname: user.fullname,
      email: user.email,
      id: user._id,
    });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};
  
//login
const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    //check if email exist
    const userFound = await User.findOne({ email });
    if (!userFound) return next(new AppErr("Invalid login credentials", 400));

    //check for password validity
    const isPasswordMatch = await bcrypt.compare(password, userFound.password);
    if (!isPasswordMatch)
      return next(new AppErr("Invalid login credentials", 400));

    res.json({
      status: "success",
      fullname: userFound.fullname,
      id: userFound._id,
      token: generateToken(userFound._id),
    });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};
  
//profile
const userProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user).populate({
      path: "accounts",
      populate: {
        path: "transactions",
        model: "Transaction",
      },
    });
    res.json(user);
  }catch(error) {
    next(new AppErr(error.message, 500));
  }
};

//delete 
const deleteUser = async(req, res, next) => {
  try {
    await User.findByIdAndDelete(req.user);
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
}
  
//update
const updateUser = async(req, res, next) => {
  try {
    //Check if email exist
    if (req.body.email) {
      const userFound = await User.findOne({ email: req.body.email });
      if (userFound)
        return next(
          new AppErr("Email is taken or you already have this email", 400)
        );
    }

    //Check if user is updating the password
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      //update the user
      const user = await User.findByIdAndUpdate(
        req.user,
        {
          password: hashedPassword,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      //send the response
      return res.status(200).json({
        status: "success",
        data: user,
      });
    }
    const user = await User.findByIdAndUpdate(req.user, req.body, {
      new: true,
      runValidators: true,
    });
    //send the response
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
}

  
export { registerUser, userLogin, userProfile, deleteUser, updateUser}
  