/**
 * @file Declares Controller for the Messages resource
 */
import {Request, Response} from "express";

export default interface MessageControllerI {
    userMessagesUser(req: Request, res: Response): void;

    findAllMessagesSentByUser(req: Request, res: Response): void;

    findAllMessagesReceivedByUser(req: Request, res: Response): void;

    userDeletesMessage(req: Request, res: Response): void;
};