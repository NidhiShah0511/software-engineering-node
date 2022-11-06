/**
 * @file Implements mongoose schema to CRUD for
 * documents in the messages collection
 */
import mongoose, {Schema} from "mongoose";
import Message from "../../models/message/Message";

/**
 * @typedef MessageSchema Represents messages schema in mongoose
 * @property {string} message message being sent between users
 * @property {User} to user to whom the message is addressed to
 * @property {User} from user who sent the message
 * @property {Date} sentOn time the message was sent
 */
const MessageSchema = new mongoose.Schema<Message>({
    message: {type: String, required: true},
    to: {type: Schema.Types.ObjectId, ref: "UserModel"},
    from: {type: Schema.Types.ObjectId, ref: "UserModel"},
    sentOn: {type: Date, default: Date.now}
}, {collection: "messages"});
export default MessageSchema;