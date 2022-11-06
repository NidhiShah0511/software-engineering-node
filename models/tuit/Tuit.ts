/**
 * @file Implements Tuit data model
 */

import User from "../user/User";

export default class Tuit {
    private tuit: string = '';
    private postedOn: Date = new Date();
    private postedBy: User | null = null;
}
 