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
import DislikeController from './controllers/DislikeController';

const cors = require("cors");
const session = require("express-session");
const app = express();

app.use(function (req, res, next) {

    var allowedDomains = ['http://localhost:3000','http://localhost', 'https://nshah-tuiter-app-react.netlify.app' ];
    const origin = req.headers.origin;
    //@ts-ignore
    if(allowedDomains.indexOf(origin) > -1){
        //@ts-ignore
      res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Accept');
    //@ts-ignore
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
  })

let sess = {
    secret: 'process.env.SECRET',
    //saveUninitialized: true,
    //resave: true,
    cookie: {
          sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax', // must be 'none' to enable cross-site delivery
          secure: process.env.NODE_ENV === "production", // must be true if sameSite='none'
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
const dislikeController = DislikeController.getInstance(app);

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
