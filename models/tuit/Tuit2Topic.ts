/**
 * @file Declares Tuit2Topic data type representing a specific instance
 * of the many-to-many relationship of tuits to topic
 */

import Tuit from "./Tuit";
import Topic from "./Topic";
 
 export default class Tuit2Topic {
     private tuit: Tuit = new Tuit();
     private tag: Topic = new Topic();
 }