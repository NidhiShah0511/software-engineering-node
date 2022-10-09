/**
 * @file Implements an Express Node HTTP server.
 */
import express, {Request, Response} from 'express';
import UserController from './controllers/UserController';
import TuitController from "./controllers/TuitController";
import UserDao from './daos/UserDao';
import TuitDao from './daos/TuitDao';
import mongoose from "mongoose";
import bodyParser from "body-parser";

const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/tuiter')
app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) =>
    res.send('Welcome to Foundation of Software Engineering!!!!'));

app.get('/hello', (req: Request, res: Response) =>
    res.send('Welcome to Foundation of Software Engineering!'));

const userDao = new UserDao();
const tuitDao = new TuitDao();
const userController = new UserController(app, userDao);
const tuitController = new TuitController(app, tuitDao);

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
