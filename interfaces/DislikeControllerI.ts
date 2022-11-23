import {Request, Response} from "express";

/**
 * @file Declares Controller for the Dislike resource
 */
export default interface DislikeControllerI {
    findAllUsersThatDislikedTuit(req: Request, res: Response): void;

    findAllTuitsDislikedByUser(req: Request, res: Response): void;
};