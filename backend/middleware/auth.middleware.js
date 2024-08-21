import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) throw new ApiError(401, "Unauthorized request");
  // console.log(token)
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  // console.log(decoded)
  if (!decoded || !decoded._id) throw new ApiError(401, "Invalid Access Token");

  // Find user by primary key (id)
  const user = await User.findByPk(decoded._id, {
    attributes: { exclude: ["password", "refreshToken"] },
  });

  if (!user) throw new ApiError(401, "Invalid Token");

  req.user = user;
  next();
});
