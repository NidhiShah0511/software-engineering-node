/**
 * @file Implements mongoose schema to CRUD for
 * documents in the likes collection
 */
 import mongoose, {Schema} from "mongoose";
 import Like from "../../models/likes/Like";
 
 /**
  * @typedef LikeSchema Represents likes schema in mongoose
  * @property {Tuit} tuit Tuit being liked
  * @property {User} likedBy User liking the tuit
  */
const LikeSchema = new mongoose.Schema<Like>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    likedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "likes"});
export default LikeSchema;