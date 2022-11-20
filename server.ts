/**
 * @file Implements an Express Node HTTP server.
 */
import express, {Request, Response} from 'express';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import UserController from './controllers/UserController';
import TuitController from "./controllers/TuitController";
import LikeController from './controllers/LikeController';
import FollowController from "./controllers/FollowController";
import BookmarkController from "./controllers/BookmarkController";
import MessageController from "./controllers/MessageController";
import AuthenticationController from './controllers/AuthenticationController';

const cors = require("cors");
const session = require("express-session");
const app = express();

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

let sess = {
    secret: 'process.env.SECRET',
    //saveUninitialized: true,
    //resave: true,
    cookie: {
        secure: false
    }
}

if (process.env.ENV === 'PRODUCTION') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}
app.use(session(sess));
app.use(express.json());

mongoose.connect('mongodb+srv://nshah:nshah@cluster0.egczgje.mongodb.net/tuiter')
app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) =>
    res.send('Welcome to Foundation of Software Engineering!!!!'));

app.get('/hello', (req: Request, res: Response) =>
    res.send('Welcome to Foundation of Software Engineering!'));

const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likesController = LikeController.getInstance(app);
const followController = FollowController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);
const messageController = MessageController.getInstance(app);
const authenticationController = AuthenticationController(app);

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
