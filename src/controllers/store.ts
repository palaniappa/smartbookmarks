import { Parameter, Parameters } from "../model/parameter";
import { Bookmark, Bookmarks } from "../model/bookmark";
import { ParameterUtil } from "../utils/parameterutils";
import { Util } from "../utils/util";
import { DataModel } from "../model/datamodel";

export class Store {

    public static instance: Store = new Store();

    public static readonly STATUS_ADDED = "ADDED";
    public static readonly STATUS_DELETED = "DELETED";
    public static readonly STATUS_UPDATED = "UPDATED";

    public DataModelVersion: string = "1.0";

    private initializeDefaultBookmarks(): Bookmarks {
        let bookmarks: Bookmarks = { items: new Map<string, Bookmark>() };
        bookmarks.items.set("BM_1", { id: "BM_1", status: Store.STATUS_ADDED, name: "TenantInfo", url: "{{CurrentTabOrigin}}/qa/cdp/cdp.jsp" });
        bookmarks.items.set("BM_2", { id: "BM_2", status: Store.STATUS_ADDED, name: "Generate JWT", url: "{{CurrentTabOrigin}}/qa/cdp/generatejwt.jsp" });
        bookmarks.items.set("BM_3", { id: "BM_3", status: Store.STATUS_ADDED, name: "Mint JWT", url: "{{CurrentTabOrigin}}/qa/cdp/mintedjwt.jsp?issuerId={{OrgId}}&audienceId={{TenantId}}&type=JWT" });
        bookmarks.items.set("BM_4", { id: "BM_4", status: Store.STATUS_ADDED, name: "News Today", url: "https://www.google.com/search?q={{SampleJSParam}}" });
        bookmarks.items.set("BM_5", { id: "BM_5", status: Store.STATUS_ADDED, name: "Google Current Host", url: "https://www.google.com/search?q={{CurrentTabHost}}" });
        bookmarks.items.set("BM_6", { id: "BM_6", status: Store.STATUS_ADDED, name: "Joke on Day", url: "https://www.google.com/search?q=Tell me a joke about {{DayOfWeek}}" });
        bookmarks.items.set("BM_7", { id: "BM_7", status: Store.STATUS_ADDED, name: "Google Current Page Title", url: "https://www.google.com/search?q={{ActiveTabPageTitle}}" });
        return bookmarks;
    }

    private initializeDefaultParameters(): Parameters {
        let parameters: Parameters = { items: new Map<string, Parameter>() };
        parameters.items.set("PM_1", { id: "PM_1", status: Store.STATUS_ADDED, key: "CurrentTabOrigin", value: ParameterUtil.PARAM_TYPE_ACTIVE_TAB + ParameterUtil.PARAM_TYPE_SEPARATOR + "origin" });
        parameters.items.set("PM_2", { id: "PM_2", status: Store.STATUS_ADDED, key: "CurrentTabHost", value: ParameterUtil.PARAM_TYPE_ACTIVE_TAB + ParameterUtil.PARAM_TYPE_SEPARATOR + "host" });
        parameters.items.set("PM_3", { id: "PM_3", status: Store.STATUS_ADDED, key: "SampleJSParam", value: ParameterUtil.PARAM_TYPE_JS_VALUE + ParameterUtil.PARAM_TYPE_SEPARATOR + "'news on ' + new Date().toString()" });
        parameters.items.set("PM_4", { id: "PM_4", status: Store.STATUS_ADDED, key: "DayOfWeek", value: ParameterUtil.PARAM_TYPE_JS_VALUE + ParameterUtil.PARAM_TYPE_SEPARATOR + "new Date().toString().split(' ')[0] + 'day'" });
        parameters.items.set("PM_5", { id: "PM_5", status: Store.STATUS_ADDED, key: "ActiveTabPageTitle", value: ParameterUtil.PARAM_TYPE_ACTIVE_TABE_JS_VALUE + ParameterUtil.PARAM_TYPE_SEPARATOR + "document.querySelector('title') ? document.querySelector('title').innerText : 'no title';" });
        parameters.items.set("PM_6", { id: "PM_6", status: Store.STATUS_ADDED, key: "TenantId", value: ParameterUtil.PARAM_TYPE_ACTIVE_TABE_JS_VALUE + ParameterUtil.PARAM_TYPE_SEPARATOR + 'document.querySelector("body > table > tbody > tr:nth-child(3) > td:nth-child(2)").textContent.trim()' });
        parameters.items.set("PM_7", { id: "PM_7", status: Store.STATUS_ADDED, key: "OrgId", value: ParameterUtil.PARAM_TYPE_ACTIVE_TABE_JS_VALUE + ParameterUtil.PARAM_TYPE_SEPARATOR + 'document.querySelector("body > table > tbody > tr:nth-child(2) > td:nth-child(2)").textContent.trim()' });
        return parameters;
    }

    public initialize(): Promise<void> {
        return this.getBookmarks().then(bms => {
            if (!bms || !bms.items || bms.items.size == 0) {
                let parameters = this.initializeDefaultParameters();
                let bookmarks = this.initializeDefaultBookmarks();
                let p1 = this.saveParameters(parameters);
                let p2 = this.saveBookmarks(bookmarks);
                return Promise.all([p1, p2]).then();
            }
        });
    }

    public getBookmarks(): Promise<Bookmarks> {
        let p = new Promise<Bookmarks>((resolve, reject) => {
            chrome.storage.sync.get("BookmarkList", (result: any) => {
                console.log(result);
                let bookmarks: Bookmarks = Store.deserializeBookmarks(result.BookmarkList);
                resolve(bookmarks);
            });
        });
        return p;
    }

    public getBookmark(bookmarkId: string): Promise<Bookmark> {
        return this.getBookmarks().then((bookmarks) => {
            if (bookmarks.items.has(bookmarkId))
                return bookmarks.items.get(bookmarkId);
            return null;
        });
    }

    public getParameters(): Promise<Parameters> {
        let p = new Promise<Parameters>((resolve, reject) => {
            chrome.storage.sync.get("ParamList", (result: any) => {
                let parameters: Parameters = Store.deserializeParameters(result.ParamList);
                resolve(parameters);
            });
        });
        return p;
    }

    public getParameter(parameterId: string): Promise<Parameter> {
        return this.getParameters().then((parameters) => {
            if (parameters.items.has(parameterId))
                return parameters.items.get(parameterId);
            return null;
        });
    }

    public saveParameters(parametersObject: Parameters): Promise<void> {
        let p = new Promise<void>((resolve, reject) => {
            let serializedItems = Store.serializeParameters(parametersObject);
            chrome.storage.sync.set({ ParamList: serializedItems }, () => {
                console.log("Saved parameters");
                resolve();
            });
        });
        return p;
    }

    public saveBookmarks(bookmarksObject: Bookmarks): Promise<void> {
        let p = new Promise<void>((resolve, reject) => {
            let serializedItems = Store.serializeBookmarks(bookmarksObject);
            chrome.storage.sync.set({ BookmarkList: serializedItems }, () => {
                console.log("Saved bookmarks");
                resolve();
            });
        });
        return p;
    }

    public addBookmarks(newBookmarks: Array<Bookmark>): Promise<void> {
        if (newBookmarks && newBookmarks.length > 0) {
            return this.getBookmarks().then(bookmarks => {
                newBookmarks.forEach(nb => {
                    nb.status = Store.STATUS_ADDED;
                    bookmarks.items.set(nb.id, nb);
                });
                return this.saveBookmarks(bookmarks);
            });
        }
        return null;
    }

    public addBookmark(newBookmark: Bookmark): Promise<void> {
        return this.getBookmarks().then(bookmarks => {
            bookmarks.items.set(newBookmark.id, newBookmark);
            return this.saveBookmarks(bookmarks);
        });
    }

    public deleteBookmark(bookmarkToDelete: string): Promise<void> {
        return this.getBookmarks().then(bookmarks => {
            bookmarks.items.delete(bookmarkToDelete);
            return this.saveBookmarks(bookmarks);
        });
    }

    public softDeleteBookmark(bookmarkToDelete: string): Promise<void> {
        return this.getBookmarks().then(bookmarks => {
            bookmarks.items.get(bookmarkToDelete).status = Store.STATUS_DELETED;
            return this.saveBookmarks(bookmarks);
        });
    }

    public addParameters(newParameters: Array<Parameter>): Promise<void> {
        if (newParameters && newParameters.length > 0) {
            return this.getParameters().then(parameters => {
                newParameters.forEach(np => {
                    np.status = Store.STATUS_ADDED;
                    parameters.items.set(np.id, np);
                });
                return this.saveParameters(parameters);
            });
        }
        return null;
    }

    public addParameter(newParameter: Parameter): Promise<void> {
        return this.getParameters().then(parameters => {
            parameters.items.set(newParameter.id, newParameter);
            return this.saveParameters(parameters);
        })

    }

    public deleteParameter(paremterIdToDelete: string): Promise<void> {
        return this.getParameters().then(parameters => {
            parameters.items.delete(paremterIdToDelete);
            return this.saveParameters(parameters);
        });
    }

    public softDeleteParameter(paremterIdToDelete: string): Promise<void> {
        return this.getParameters().then(parameters => {
            parameters.items.get(paremterIdToDelete).status = Store.STATUS_DELETED;
            return this.saveParameters(parameters);
        });
    }

    private static serializeBookmarks(item: Bookmarks): string {
        let serializedItems = "";
        if (item) {
            serializedItems = JSON.stringify([...item.items]);
        }
        return serializedItems;
    }

    private static serializeParameters(item: Parameters): string {
        let serializedItems = "";
        if (item) {
            serializedItems = JSON.stringify([...item.items]);
        }
        return serializedItems;
    }

    private static deserializeBookmarks(items: string): Bookmarks {
        let bms = { items: new Map<string, Bookmark>() };
        if (items) {
            let bmlist = JSON.parse(items).reduce((m, [key, val]) => m.set(key, val), new Map());
            bms.items = bmlist;
        }
        return bms;
    }

    private static deserializeParameters(items: string): Parameters {
        let pmlist = JSON.parse(items).reduce((m, [key, val]) => m.set(key, val), new Map());
        let pms = { items: pmlist };
        return pms;
    }

    public overwriteBookmarks(newItems: DataModel): Promise<void> {
        let parameters: Parameters = { items: new Map<string,Parameter>()};
        let bookmarks: Bookmarks = { items: new Map<string, Bookmark>() };
        if(newItems && newItems.bookmarks) {
            newItems.bookmarks.forEach(bm => {
                bookmarks.items.set(bm.id,bm);
            });
        }

        if(newItems && newItems.parameters) {
            newItems.parameters.forEach(pm => {
                parameters.items.set(pm.id,pm);
            });
        }

        let p1 = this.saveParameters(parameters);
        let p2 = this.saveBookmarks(bookmarks);
        return Promise.all([p1, p2]).then();
    }
}

