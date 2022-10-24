/**
 * @file Implements DAO managing data storage of Follows resource.
 * Uses mongoose FollowModel to integrate with MongoDB
 */
import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/follow/FollowModel";
import Follow from "../models/follow/Follow";

/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Follows
 * @property {FollowDao} followDao Private single instance of BookmarkDao
 */
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns FollowDao
     */
    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    private constructor() {
    }

    /**
     * Uses FollowDao to insert follow instance into the database
     * @param {string} uid1 User 1 primary key
     * @param {string} uid2 User 2 primary key
     * @returns Promise To be notified when follow is inserted into the database
     */
    userFollowsUser = async (uid1: string, uid2: string): Promise<Follow> =>
        FollowModel.create({user: uid2, followedBy: uid1});

    /**
     * Removes follow instance from the database.
     * @param {string} uid1 User 1 primary key
     * @param {string} uid2 User 2 primary key
     * @returns Promise To be notified when follow is removed from the database
     */
    userUnfollowsUser = async (uid1: string, uid2: string): Promise<any> =>
        FollowModel.deleteOne({user: uid2, followedBy: uid1});

    /**
     * Uses FollowDao to retrieve all user documents from users collection that follow a User
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    findAllUsersThatFollowUser = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({user: uid})
            .populate("followedBy")
            .exec();

    /**
     * Uses FollowDao to retrieve all user documents from users collection that are followed by a User
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    findAllUsersFollowedByUser = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({followedBy: uid})
            .populate("user")
            .exec();

}