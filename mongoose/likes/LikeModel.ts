/**
 * @file Implements mongoose model to CRUD
 * documents in the likes collection
 */
import mongoose from "mongoose";
import LikeSchema from "./LikeSchema";
 
/**
 * @typedef LikeModel Represents the Like model in mongoose
 */
const LikeModel = mongoose.model("LikeModel", LikeSchema);
export default LikeModel;