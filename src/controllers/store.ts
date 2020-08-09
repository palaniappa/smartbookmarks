import { Parameter, Parameters } from "../model/parameter";
import { Bookmark, Bookmarks } from "../model/bookmark";
import { ParameterUtil } from "../utils/parameterutils";
import { Util } from "../utils/util";

export class Store {

    public static instance: Store = new Store();

    parameters: Parameters = { items: new Map<string,Parameter>() };
    bookmarks: Bookmarks = { items: new Map<string,Bookmark>() };

    public DataModelVersion: string = "1.0";

    private initializeDefaults(): void {
        this.parameters.items.set("PM_1",{ id: "PM_1", key: "CurrentTabOrigin", value: ParameterUtil.PARAM_TYPE_ACTIVE_TAB + ParameterUtil.PARAM_TYPE_SEPARATOR + "origin" });
        this.parameters.items.set("PM_2",{ id: "PM_2", key: "CurrentTabHost", value: ParameterUtil.PARAM_TYPE_ACTIVE_TAB + ParameterUtil.PARAM_TYPE_SEPARATOR + "host" });
        this.parameters.items.set("PM_3",{ id: "PM_3", key: "SampleJSParam", value: ParameterUtil.PARAM_TYPE_JS_VALUE + ParameterUtil.PARAM_TYPE_SEPARATOR + "'news on ' + new Date().toString()" });
        this.parameters.items.set("PM_4",{ id: "PM_4", key: "DayOfWeek", value: ParameterUtil.PARAM_TYPE_JS_VALUE + ParameterUtil.PARAM_TYPE_SEPARATOR + "new Date().toString().split(' ')[0] + 'day'" });
        this.parameters.items.set("PM_5",{ id: "PM_5", key: "ActiveTabPageTitle", value: ParameterUtil.PARAM_TYPE_ACTIVE_TABE_JS_VALUE + ParameterUtil.PARAM_TYPE_SEPARATOR + "document.querySelector('title') ? document.querySelector('title').innerText : 'no title';" });
        this.parameters.items.set("PM_6",{ id: "PM_6", key: "TenantId", value: ParameterUtil.PARAM_TYPE_ACTIVE_TABE_JS_VALUE + ParameterUtil.PARAM_TYPE_SEPARATOR + 'document.querySelector("body > table > tbody > tr:nth-child(3) > td:nth-child(2)").textContent.trim()' });
        this.parameters.items.set("PM_7",{ id: "PM_7", key: "OrgId", value: ParameterUtil.PARAM_TYPE_ACTIVE_TABE_JS_VALUE + ParameterUtil.PARAM_TYPE_SEPARATOR + 'document.querySelector("body > table > tbody > tr:nth-child(2) > td:nth-child(2)").textContent.trim()' });

        this.bookmarks.items.set("BM_1",{ id: "BM_1", name: "TenantInfo", url: "{{CurrentTabOrigin}}/qa/cdp/cdp.jsp" });
        this.bookmarks.items.set("BM_2",{ id: "BM_2", name: "Generate JWT", url: "{{CurrentTabOrigin}}/qa/cdp/generatejwt.jsp" });
        this.bookmarks.items.set("BM_3",{ id: "BM_3", name: "Mint JWT", url: "{{CurrentTabOrigin}}/qa/cdp/mintedjwt.jsp?issuerId={{OrgId}}&audienceId={{TenantId}}&type=JWT" });
        this.bookmarks.items.set("BM_4",{ id: "BM_4", name: "News Today", url: "https://www.google.com/search?q={{SampleJSParam}}" });
        this.bookmarks.items.set("BM_5",{ id: "BM_5", name: "Google Current Host", url: "https://www.google.com/search?q={{CurrentTabHost}}" });
        this.bookmarks.items.set("BM_6",{ id: "BM_6", name: "Joke on Day", url: "https://www.google.com/search?q=Tell me a joke about {{DayOfWeek}}" });
        this.bookmarks.items.set("BM_7",{ id: "BM_7", name: "Google Current Page Title", url: "https://www.google.com/search?q={{ActiveTabPageTitle}}" });
    }

    public initialize(): Promise<void> {
        this.initializeDefaults();
        let p1 = this.saveParameters(this.parameters);
        let p2 = this.saveBookmarks(this.bookmarks);
        return Promise.all([p1, p2]).then();
    }

    public getBookmarks(): Promise<Bookmarks> {
        let p = new Promise<Bookmarks>( (resolve,reject) =>{
            chrome.storage.sync.get("BookmarkList", (result: any) => {
                let bookmarks: Bookmarks = Store.deserializeBookmarks(result.BookmarkList);
                resolve(bookmarks);
            });
        });
        return p;
    }

    public getBookmark(bookmarkId: string): Promise<Bookmark> {
        return this.getBookmarks().then( (bookmarks) => {
            if(bookmarks.items.has(bookmarkId))
                return bookmarks.items.get(bookmarkId);
            return null;
        });
    }

    public getParameters(): Promise<Parameters> {
        let p = new Promise<Parameters>( (resolve,reject) =>{
            chrome.storage.sync.get("ParamList", (result: any) => {
                let parameters: Parameters = Store.deserializeParameters(result.ParamList);
                resolve(parameters);
            });
        });
        return p;
    }

    public getParameter(parameterId: string): Promise<Parameter> {
        return this.getParameters().then( (parameters) => {
            if(parameters.items.has(parameterId))
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

    public addBookmarks( newBookmarks: Array<Bookmark>): Promise<void> {
        if(newBookmarks && newBookmarks.length > 0){
            return this.getBookmarks().then( bookmarks => {
                newBookmarks.forEach( nb => {
                    bookmarks.items.set(nb.id,nb);
                });
                return this.saveBookmarks(bookmarks);
            });
        }
        return null;
    }

    public addBookmark( newBookmark: Bookmark): Promise<void> {
        return this.getBookmarks().then( bookmarks => {
            bookmarks.items.set(newBookmark.id,newBookmark);
            return this.saveBookmarks(bookmarks);
        });
    }

    public deleteBookmark( bookmarkToDelete: string): Promise<void> {
        return this.getBookmarks().then( bookmarks => {
            bookmarks.items.delete(bookmarkToDelete);
            return this.saveBookmarks(bookmarks);
        });
    }

    public addParameters( newParameters: Array<Parameter>): Promise<void> {
        if(newParameters && newParameters.length > 0){
            return this.getParameters().then( parameters => {
                newParameters.forEach( np => {
                    parameters.items.set(np.id,np);
                });
                return this.saveParameters(parameters);
            });
        }
        return null;
    }

    public addParameter( newParameter: Parameter): Promise<void> {
        return this.getParameters().then( parameters => {
            parameters.items.set(newParameter.id,newParameter);
            return this.saveParameters(parameters);
        })

    }

    public deleteParameter( paremterIdToDelete: string): Promise<void> {
        return this.getParameters().then( parameters => {
            parameters.items.delete(paremterIdToDelete);
            return this.saveParameters(parameters);
        });
    }

    private static serializeBookmarks( item: Bookmarks): string {
        let serializedItems = "";
        if(item){
            serializedItems = JSON.stringify([...item.items]);
        }
        return serializedItems;
    }

    private static serializeParameters( item: Parameters): string {
        let serializedItems = "";
        if(item){
            serializedItems = JSON.stringify([...item.items]);
        }
        return serializedItems;
    }

    private static deserializeBookmarks(items: string): Bookmarks {
        let bmlist = JSON.parse(items).reduce((m, [key, val])=> m.set(key, val) , new Map());
        let bms = { items: bmlist};
        return bms;
    }

    private static deserializeParameters(items: string): Parameters {
        let pmlist = JSON.parse(items).reduce((m, [key, val])=> m.set(key, val) , new Map());
        let pms = { items: pmlist};
        return pms;
    }
}

