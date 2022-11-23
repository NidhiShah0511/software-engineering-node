
import DislikeDaoI from "../interfaces/DislikeDaoI";
import DislikeModel from "../mongoose/likes/DislikeModel";
import Dislike from "../models/likes/Dislike";

/**
 * @class DislikeDao Implements Data Access Object managing data storage
 * of dislikes
 * @property {DislikeDao} dislikeDao Private single instance of DislikeDao
 */
export default class DislikeDao implements DislikeDaoI {
    private static dislikeDao: DislikeDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns DislikeDao
     */
    public static getInstance = (): DislikeDao => {
        if (DislikeDao.dislikeDao === null) {
            DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao;
    }

    /**
     * Uses DislikeDao to retrieve all user documents from users collection that disliked a Tuit
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    findAllUsersThatDislikedTuit = async (tid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({tuit: tid})
            .populate("dislikedBy")
            .exec();
    
    /**
     * Uses DislikeDao to retrieve all user documents from tuits collection that are disliked by a user
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    findAllTuitsDislikedByUser = async (uid: string): Promise<Dislike[]> =>
        DislikeModel.find({dislikedBy: uid})
            .populate({
                path: "tuit",
                populate: {
                    path: "postedBy"
                }
            })
            .exec();

    /**
     * Uses DislikeDao to post a dislike by a user on a tuit
     * @param {string} tid Tuit's primary key
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    userDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.create({tuit: tid, dislikedBy: uid});

    /**
     * Uses DislikeDao to find a dislike by a user on a tuit
     * @param {string} tid Tuit's primary key
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the users are retrieved from
     * database
     */       
    findUserDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.findOne({tuit: tid, dislikedBy: uid});
    
    /**
     * Uses DislikeDao to undo a dislike by a user on a tuit
     * @param {string} tid Tuit's primary key
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    userUndislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.deleteOne({tuit: tid, dislikedBy: uid});

    /**
     * Uses DislikeDao to count the number of dislikes on a tuit
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when the users are retrieved from
     * database
     */    
    countHowManyDislikedTuit = async (tid: string): Promise<any> =>
        DislikeModel.count({tuit: tid});
}