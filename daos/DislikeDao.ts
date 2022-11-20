
import DislikeDaoI from "../interfaces/DislikeDaoI";
import DislikeModel from "../mongoose/likes/DislikeModel";
import Dislike from "../models/likes/Dislike";

/**
 * @class DislikeDao Implements Data Access Object managing data storage
 * of Likes
 * @property {DislikeDao} likeDao Private single instance of LikeDao
 */
export default class DislikeDao implements DislikeDaoI {
    private static dislikeDao: DislikeDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns LikeDao
     */
    public static getInstance = (): DislikeDao => {
        if (DislikeDao.dislikeDao === null) {
            DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao;
    }
    findAllUsersThatDislikedTuit = async (tid: string): Promise<Dislike[]> =>
    DislikeModel
        .find({tuit: tid})
        .populate("dislikedBy")
        .exec();

findAllTuitsDislikedByUser = async (uid: string): Promise<Dislike[]> =>
    DislikeModel.find({dislikedBy: uid})
        .populate({
            path: "tuit",
            populate: {
                path: "postedBy"
            }
        })
        .exec();

userDislikesTuit = async (uid: string, tid: string): Promise<any> =>
    DislikeModel.create({tuit: tid, dislikedBy: uid});

findUserDislikesTuit = async (uid: string, tid: string): Promise<any> =>
    DislikeModel.findOne({tuit: tid, dislikedBy: uid});

userUndislikesTuit = async (uid: string, tid: string): Promise<any> =>
    DislikeModel.deleteOne({tuit: tid, dislikedBy: uid});

countHowManyDislikedTuit = async (tid: string): Promise<any> =>
    DislikeModel.count({tuit: tid});
}