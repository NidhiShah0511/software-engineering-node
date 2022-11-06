/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import Tuit from "../models/tuit/Tuit";
import TuitModel from "../mongoose/tuit/TuitModel";
import TuitDaoI from "../interfaces/TuitDaoI";

/**
 * @class UserDao Implements Data Access Object managing data storage
 * of Users
 * @property {UserDao} userDao Private single instance of UserDao
 */
 export default class TuitDao implements TuitDaoI {
    private static tuitDao: TuitDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns TuitDao
     */
    public static getInstance = (): TuitDao => {
        if (TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }

    private constructor() {
    }

    /**
     * Uses TuitDao to retrieve all tuit documents from tuits collection.
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    async findAllTuits(): Promise<Tuit[]> {
        return await TuitModel.find();
    }

    /**
     * Uses TuitDao to retrieve all tuits documents from tuits collection that are created by user
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    async findTuitsByUser(uid: string): Promise<Tuit[]> {
        return await TuitModel.find({postedBy: uid});
    }

    /**
     * Uses TuitDao to retrieve a tuit documents created by a user from the database
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    async findTuitById(tid: string): Promise<any> {
        return await TuitModel.findById(tid);
    }

    /**
     * Uses TuitDao to insert tuit instance into the database
     * @param {string} uid User's primary key
     * @returns Promise To be notified when tuit is inserted into the database
     */
    async createTuit(tuit: Tuit): Promise<Tuit> {
        return await TuitModel.create(tuit);
    }

    /**
     * Uses TuitDao to update tuit instance in the database
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when tuit is updated into the database
     */
    async updateTuit(tid: string, tuit: Tuit): Promise<any> {
        return await TuitModel.updateOne({_id: tid}, {$set: tuit});
    }

    /**
     * Removes a tuit instance from the database.
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when tuit is removed from the database
     */
    async deleteTuit(tid: string): Promise<any> {
        return await TuitModel.deleteOne({_id: tid});
    }
}