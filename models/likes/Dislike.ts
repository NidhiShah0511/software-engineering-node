/**
 * @file Declares Dislike data type representing relationship between
 * users and tuits, as in user dislikes a tuit
 */
 import Tuit from "../tuit/Tuit";
 import User from "../user/User";
 
 /**
  * @typedef Like Represents dislikes relationship between a user and a tuit,
  * as in a user dislikes a tuit
  * @property {Tuit} tuit Tuit being disliked
  * @property {User} dislikedBy User disliking the tuit
  */
 
 export default interface Dislike {
     tuit: Tuit,
     dislikedBy: User
 };