/**
 * @file Declares Tuit2Topic data type representing a specific instance
 * of the many-to-many relationship of tuits<->tags
 */

import Tuit from "./Tuit";
import Topic from "./Topic";
 
 /**
  * @typedef Tuit2Tag Represents the relationship between a single
  * tuit and a single tag
  * @property {Tuit} tuit the tuit including the tag
  * @property {Tag} tag the tag linked with the tuit
  */
 export default class Tuit2Topic {
     private tuit: Tuit = new Tuit();
     private tag: Topic = new Topic();
 }