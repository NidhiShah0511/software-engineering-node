/**
 * @file Declares Tuit2Tag data type representing a specific instance
 * of the many-to-many relationship of tuits to tags
 */

 import Tuit from "./Tuit";
 import Tag from "./Tag";
 
 export default class Tuit2Tag {
     private tuit: Tuit = new Tuit();
     private tag: Tag = new Tag();
 }