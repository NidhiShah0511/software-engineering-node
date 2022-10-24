/**
 * @file Implements DAO managing data storage of Messages resource.
 * Uses mongoose MessageModel to integrate with MongoDB
 */
import MessageDaoI from "../interfaces/MessageDaoI";
import MessageModel from "../mongoose/message/MessageModel";
import Message from "../models/message/Message";

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Messages
 * @property {MessageDao} messageDao Private single instance of LikeDao
 */
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns MessageDao
     */
    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    private constructor() {
    }


    /**
     * Uses MessageDao to insert message instance into the database
     * @param {string} uid2 User 1 primary key
     * @param {string} uid2 User 2 primary key
     * @returns Promise To be notified when message is inserted into the database
     */
    userMessagesUser = async (uid1: string, uid2: string, message: Message): Promise<Message> =>
        MessageModel.create({...message, to: uid2, from: uid1});

    /**
     * Removes a message instance from the database.
     * @param {string} mid Message's primary key
     * @returns Promise To be notified when message is removed from the database
     */
    userDeletesMessage = async (mid: string): Promise<any> =>
        MessageModel.deleteOne({_id: mid});

    /**
     * Uses MessageDao to retrieve all user documents from messages collection that are received by user
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the messages are retrieved from
     * database
     */
    findAllMessagesReceivedByUser = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({to: uid})
            .populate("message")
            .exec();

    /**
     * Uses MessageDao to retrieve all user documents from messages collection that are sent by user
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the messages are retrieved from
     * database
     */
    findAllMessagesSentByUser = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({from: uid})
            .populate("message")
            .exec();

}