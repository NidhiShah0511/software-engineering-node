/**
 * @file Declares Controller for the Follows resource
 */
import {Request, Response} from "express";

export default interface FollowControllerI {
    userFollowsUser(req: Request, res: Response): void;

    userUnfollowsUser(req: Request, res: Response): void;

    findAllUsersFollowedByUser(req: Request, res: Response): void;

    findAllUsersThatFollowUser(req: Request, res: Response): void;

};