/**
 * @file Declares Controller for the Bookmarks resource
 */
import {Request, Response} from "express";

export default interface BookmarkControllerI {
    userRemovesAllBookmarks(req: Request, res: Response): void;

    userBookmarksTuit(req: Request, res: Response): void;

    userUnbookmarksTuit(req: Request, res: Response): void;

    findAllTuitsBookmarkedByUser(req: Request, res: Response): void;

    findAllUsersThatBookmarkedTuit(req: Request, res: Response): void;
};