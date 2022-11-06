/**
 * @file Implements mongoose model to CRUD
 * documents in the tuits collection
 */
import mongoose from "mongoose";
import TuitSchema from "./TuitSchema";

/**
 * @typedef TuitModel Represents the Tuit model in mongoose
 */
const TuitModel = mongoose.model('TuitModel', TuitSchema);
export default TuitModel;