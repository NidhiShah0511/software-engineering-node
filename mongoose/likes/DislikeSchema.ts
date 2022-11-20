/**
 * @file Implements mongoose schema to CRUD for
 * documents in the likes collection
 */
 import mongoose, {Schema} from "mongoose";
 import Dislike from "../../models/likes/Dislike";
 
 /**
  * @typedef DislikeSchema Represents likes schema in mongoose
  * @property {Tuit} tuit Tuit being liked
  * @property {User} likedBy User liking the tuit
  */
  
  const DislikeSchema = new mongoose.Schema<Dislike>({
      tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
      dislikedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
  }, {collection: "dislikes"});
  export default DislikeSchema;