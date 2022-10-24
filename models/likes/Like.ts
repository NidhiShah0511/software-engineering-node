import Tuit from "../tuit/Tuit";
import User from "../user/User";

export default interface Like {
    tuit: Tuit,
    likedBy: User
};