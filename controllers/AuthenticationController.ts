/**
 * @file Controller RESTful Web service API for authentication
 */
import {Request, Response, Express} from "express";
import UserDao from "../daos/UserDao";

const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * @class AuthenticationController Implements RESTful Web service API for authentic resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/auth/login to post login for a user
 *     </li>
 *     <li>POST /api/auth/logout to post logout for a user
 *     </li>
 *     <li>POST /api/auth/profile to retrieve a user's profile
 *     </li>
 *     <li>POST /api/auth/signup to register a new user
 *     </li>
 * </ul>
 * @property {UserDao} userDao Singleton DAO implementing users CRUD operations
 * @property {AuthenticationController} AuthenticationController Singleton controller implementing
 * RESTful Web service API
 */
const AuthenticationController = (app: Express) => {

    const userDao: UserDao = UserDao.getInstance();

    /**
     * Signup api that registers a new user
     * @param {Request} req Represents request from client, including the 
     * new username and password
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    const signup = async (req: Request, res: Response) => {
        const newUser = req.body;
        const password = newUser.password;
        const hash = await bcrypt.hash(password, saltRounds);
        newUser.password = hash;

        const existingUser = await userDao.findUserByUsername(req.body.username);
        if (existingUser) {
            res.sendStatus(403);
            return;
        } else {
            const insertedUser = await userDao.createUser(newUser);
            // @ts-ignore
            insertedUser.password = '';
            // Uses the profile attribute to indicate currently logged-in user.
            // @ts-ignore
            req.session['profile'] = insertedUser;
            res.json(insertedUser);
        }
    }

    /**
     * Login api that logins an existing user
     * @param {Request} req Represents request from client, including the 
     * existing username and password
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    const login = async (req: Request, res: Response) => {
        const user = req.body;
        const username = user.username;
        const password = user.password;
        const existingUser = await userDao
            .findUserByUsername(username);
        if (!existingUser) {
            res.sendStatus(403);
            return;
        }
        const match = await bcrypt.compare(password, existingUser.password);
        if (match) {
            existingUser.password = '*****';
            // @ts-ignore
            req.session['profile'] = existingUser;
            res.json(existingUser);
        } else {
            res.sendStatus(403);
        }
    }

    /**
     * Profile api that retrieves an existing user
     * @param {Request} req Represents request from client, including the 
     * existing session profile
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    const profile = (req: Request, res: Response) => {
        // @ts-ignore
        const profile = req.session['profile'];
        if (profile) {
            profile.password = "";
            res.json(profile);
        } else {
            res.sendStatus(403);
        }
    }

    /**
     * Logout api that logouts an existing user
     * @param {Request} req Represents request from client, including the 
     * existing user session
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    const logout = (req: Request, res: Response) => {
        // @ts-ignore
        req.session.destroy();
        res.sendStatus(200);
    }

    app.post("/api/auth/login", login);
    app.post("/api/auth/profile", profile);
    app.post("/api/auth/logout", logout);
    app.post("/api/auth/signup", signup);

}

export default AuthenticationController;