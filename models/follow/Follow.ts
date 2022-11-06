/**
 * @file Declares Follow data type representing relationship between
 * users, as in user follows another user
 */
import User from "../user/User";

/**
 * @typedef Follow Represents follows relationship between users,
 * as in a user follows another user
 * @property {User} user User being followed
 * @property {User} followedBy User following the user
 */
export default interface Follow {
    user: User,
    followedBy: User
};