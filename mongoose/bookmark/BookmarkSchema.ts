/**
 * @file Implements mongoose schema to CRUD for
 * documents in the bookmarks collection
 */
import mongoose, {Schema} from "mongoose";
import Bookmark from "../../models/bookmark/Bookmark";

/**
 * @typedef Bookmark Represents bookmarks schema in mongoose.
 * @property {Tuit} tuit Tuit being bookmarked
 * @property {User} bookmarkedBy User bookmarking the tuit
 */
const BookmarkSchema = new mongoose.Schema<Bookmark>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    bookmarkedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "bookmarks"});
export default BookmarkSchema;