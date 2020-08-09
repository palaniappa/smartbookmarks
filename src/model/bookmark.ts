interface Bookmark {
    id: string;
    name: string;
    url: string;
}
interface Bookmarks {
    items: Map<string,Bookmark>;
}

const BOOKMARK_ID_PREFIX = "BM";
export { Bookmark, Bookmarks, BOOKMARK_ID_PREFIX};
