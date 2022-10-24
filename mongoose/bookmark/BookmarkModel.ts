/**
 * @file Implements mongoose model to CRUD
 * documents in the bookmarks collection
 */
import mongoose from "mongoose";
import BookmarkSchema from "./BookmarkSchema";

/**
 * @typedef BookmarkModel Represents the Bookmark model in mongoose
 */
const BookmarkModel = mongoose.model("BookmarkModel", BookmarkSchema);
export default BookmarkModel;