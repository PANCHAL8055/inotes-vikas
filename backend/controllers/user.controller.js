import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import User  from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mail from "../utils/nodemailer.js";


const generateAccessToken = async (user) => {
  try {
    const accessToken = user.generateAccessToken();
    user.refreshToken = accessToken;
    await user.save({ validateBeforeSave: false });
    return  accessToken;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Something Went Wrong While Generating Token");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;

  // Validation: Check if required fields are empty
  if ([email, password].some((value) => value.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if user already exists
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new ApiError(409, "User with email  already exists");
  }

  // Create new user
  const createdUser = await User.create({ name, email, password });
  
  if (!createdUser) {
    throw new ApiError(500, "User not created");
  }
  mail(email);
  // Return success response
  return res.status(201).json(new ApiResponse(200, createdUser, "User created successfully"));
  } catch (error) {
    console.log(error);
   return res.status(500).json(new ApiResponse(500, null, "Something Went Wrong While Creating User"));
  }
});

const loginUser = asyncHandler(async (req, res) => {
  try {
    // Get user email and password from frontend
  const { email,  password } = req.body;

  // Validation: Check if  email and password are provided
  if (!password&& !email)
    throw new ApiError(400, "All Fields are required");
  if (!password) throw new ApiError(400, "Password is required");

  // Find user by email 
  const user = await User.findOne({ where: { email  } });
  if (!user) throw new ApiError(400, "User does not exist");

  // Verify password
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) throw new ApiError(401, "Invalid user credentials");

  // Generate access token and refresh token
  const accessToken = await generateAccessToken(user);

  // Fetch updated user and send cookies
  const loggedInUser = await User.findByPk(user.id, { attributes: { exclude: ['password', 'refreshToken'] } });

  //  return success response
  return res
    .status(200)
    .json(new ApiResponse(200, { loggedInUser, accessToken }, "User logged in successfully"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiResponse(500, null, "Something Went Wrong While Logging In User"));
  }
});

const getCurrentUser = asyncHandler(async (req, res) => {
    const user = await User.findByPk(req.user.id, { attributes: { exclude: ['password ', 'refreshToken'] } });
    return res.status(200).json(new ApiResponse(200, user, "User details fetched successfully"));
  } );



export {
  registerUser,
  loginUser,
  getCurrentUser
};