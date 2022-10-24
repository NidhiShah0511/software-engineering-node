/**
 * @file Implements mongoose schema to CRUD for
 * documents in the Follows collection
 */
import mongoose, {Schema} from "mongoose";
import Follow from "../../models/follow/Follow";

/**
 * @typedef FollowSchema Represents follow schema in mongoose
 * @property {User} user User being followed
 * @property {User} followedBy User following the user
 */
const FollowSchema = new mongoose.Schema<Follow>({
    user: {type: Schema.Types.ObjectId, ref: "UserModel"},
    followedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "follows"});
export default FollowSchema;