import { Bookmark  } from "./bookmark";
import { Parameter } from "./parameter";

interface DataModel {
    version: string,
    bookmarks: Array<Bookmark>;
    parameters: Array<Parameter>; 
}

export { DataModel };