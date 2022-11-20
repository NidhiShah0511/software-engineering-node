import Dislike from "../models/likes/Dislike";

export default interface DislikeDaoI {
    findAllUsersThatDislikedTuit(tid: string): Promise<Dislike[]>;

    findAllTuitsDislikedByUser(uid: string): Promise<Dislike[]>;

    userUndislikesTuit(tid: string, uid: string): Promise<any>;

    userDislikesTuit(tid: string, uid: string): Promise<Dislike>;
};