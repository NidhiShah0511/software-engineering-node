/**
 * @file Declares Tuit2Tag data type representing a specific instance
 * of the many-to-many relationship of tuits<->tags
 */

 import Tuit from "./Tuit";
 import Tag from "./Tag";
 
 /**
  * @typedef Tuit2Tag Represents the relationship between a single
  * tuit and a single tag
  * @property {Tuit} tuit the tuit including the tag
  * @property {Tag} tag the tag linked with the tuit
  */
 export default class Tuit2Tag {
     private tuit: Tuit = new Tuit();
     private tag: Tag = new Tag();
 }