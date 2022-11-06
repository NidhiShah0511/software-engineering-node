/**
 * @file Declares API for Messages related data access object methods
 */
import Message from "../models/message/Message";

export default interface MessageDaoI {
    userMessagesUser(uid1: string, uid2: string, message: Message): Promise<Message>;

    findAllMessagesSentByUser(uid: string): Promise<Message[]>;

    findAllMessagesReceivedByUser(tid: string): Promise<Message[]>;

    userDeletesMessage(mid: string): Promise<any>;

    userDeletesAllReceivedMessages(uid: string): Promise<any>;

    userDeletesAllSentMessages(uid: string): Promise<any>;
};