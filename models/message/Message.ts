/**
 * @file Declares Message data type representing a direct message between
 * two users, as in user messages another user
 */
import User from "../user/User";

/**
 * @typedef Message Represents messages between users,
 * as in a user messages another user
 * @property {string} message message being sent between users
 * @property {User} to user to whom the message is addressed to
 * @property {User} from user who sent the message
 * @property {Date} sentOn time the message was sent
 */
export default interface Message {
    message: string,
    to: User,
    from: User,
    sentOn: Date
};