/**
 * @file Implements mongoose model to CRUD
 * documents in the follows collection
 */
import mongoose from "mongoose";
import FollowSchema from "./FollowSchema";

/**
 * @typedef FollowModel Represents the Follow model in mongoose
 */
const FollowModel = mongoose.model("FollowModel", FollowSchema);
export default FollowModel;