/**
 * @file Controller RESTful Web service API for follows resource
 */
import {Express, Request, Response} from "express";
import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/FollowControllerI";

/**
 * @class FollowController Implements RESTful Web service API for follows resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid1/follows/:uid2 user follows another user
 *     </li>
 *     <li>DELETE /api/users/:uid1/follows/:uid2 user unfollows another user
 *     </li>
 *     <li>GET /api/users/:uid/follows to get a list of other users a user is following
 *     </li>
 *     <li>GET /api/users/:uid/followers to get a list of other users that are following them
 *     no londer follows a user</li>
 *    <li>DELETE /api/users/:uid/followers user unfollows all followers
 *     </li>
 *   <li>DELETE /api/users/:uid/follows user unfollows all users they are following
 *     </li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing follows CRUD operations
 * @property {FollowController} FollowController Singleton controller implementing
 * RESTful Web service API
 */
export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return FollowController
     */
    public static getInstance = (app: Express): FollowController => {
        if (FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.post("/api/users/:uid1/follows/:uid2", FollowController.followController.userFollowsUser);
            app.delete("/api/users/:uid1/unfollows/:uid2", FollowController.followController.userUnfollowsUser);
            app.get("/api/users/:uid/follows", FollowController.followController.findAllUsersFollowedByUser);
            app.get("/api/users/:uid/followers", FollowController.followController.findAllUsersThatFollowUser);
            app.delete("/api/users/:uid/removefollowers", FollowController.followController.userRemovesAllFollowers);
            app.delete("/api/users/:uid/removefollows", FollowController.followController.userUnfollowsAllUsers);
        }
        return FollowController.followController;
    }

    private constructor() {
    }

    /**
     * Retrieves all users that followed a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the followed user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsersThatFollowUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersThatFollowUser(req.params.uid)
            .then(follows => res.json(follows));

    /**
     * Retrieves all users followed by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user followed the users
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects that were followed
     */
    findAllUsersFollowedByUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersFollowedByUser(req.params.uid)
            .then(follows => res.json(follows));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and uid representing the user that is unfollowing the user
     * and the user being followed
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new follows that was inserted in the
     * database
     */
    userFollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsUser(req.params.uid1, req.params.uid2)
            .then(follows => res.json(follows));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and uid representing the user that is unfollowing
     * the user and the user being unfollowed
     * @param {Response} res Represents response to client, including status
     * on whether deleting the follow was successful or not
     */
    userUnfollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowsUser(req.params.uid1, req.params.uid2)
            .then(status => res.send(status));

      
    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid representing the user that is losing
     * all their followers
     * @param {Response} res Represents response to client, including status
     * on whether deleting the followers was successful or not
     */
     userRemovesAllFollowers = (req: Request, res: Response) =>
     FollowController.followDao.userRemovesAllFollowers(req.params.uid)
         .then(status => res.send(status));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid representing the user that is unfollowing
     * all users
     * @param {Response} res Represents response to client, including status
     * on whether unfollowing the users was successful or not
     */
    userUnfollowsAllUsers = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowsAllUsers(req.params.uid)
            .then(status => res.send(status));
};