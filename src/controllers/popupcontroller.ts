import { Store } from "./store";
import { Bookmarks, Bookmark, BOOKMARK_ID_PREFIX } from "../model/bookmark";
import { Parameters, Parameter, PARAMETER_ID_PREFIX } from "../model/parameter";
import { HtmlUtil } from "../utils/htmlutils";
import { ParameterUtil } from "../utils/parameterutils";
import { Util } from "../utils/util";
import { DataModel } from "../model/datamodel";

import * as $ from 'jquery';
export class PopupController {

    public CATEGORY_TYPE_USER = "user";
    public CATEGORY_TYPE_SYSTEM = "system";
    public EVENT_ACTION_RENDER = "render";
    public EVENT_ACTION_ADD_BM = "add_bookmark";
    public EVENT_ACTION_DELETE_BM = "delete_bookmark";
    public EVENT_ACTION_EDIT_BM = "edit_bookmark";
    public EVENT_ACTION_CLEAR_BM = "clear_bookmark";
    public EVENT_ACTION_ADD_PM = "add_parameter";
    public EVENT_ACTION_DELETE_PM = "delete_parameter";
    public EVENT_ACTION_EDIT_PM = "edit_parameter";
    public EVENT_ACTION_CLEAR_PM = "clear_parameter";
    public EVENT_ACTION_IMPORT = "import";
    public EVENT_ACTION_EXPORT = "export";
    public EVENT_ACTION_LINK_OPENED = "linkopened";

    public static instance: PopupController = new PopupController();
    public bookmarkEditId: string = null;
    public parameterEditId: string = null;

    public render(): Promise<void> {
        console.log("rendering!")
        let p = this.renderBookmarks();
        this.renderSyncControls();
        this.renderBookmarkAddControls();
        this.renderParameters();
        this.renderParameterAddControls();
        this.renderImportControls();
        return p.then(() => {
            ga("send", "event", this.CATEGORY_TYPE_SYSTEM, this.EVENT_ACTION_RENDER);
            console.log("rendering complete!");
        });
    }

    private getCurrentActiveTab(): Promise<chrome.tabs.Tab> {
        let queryReq = { active: true, currentWindow: true };

        let p = new Promise<chrome.tabs.Tab>((resolve, reject) => {
            chrome.tabs.query(queryReq, (tabs: [chrome.tabs.Tab]) => {
                let currentTab = tabs[0];
                resolve(currentTab);
            });
        });
        return p;
    }

    private renderBookmarks(): Promise<void> {
        let bmPromise = Store.instance.getBookmarks();
        let ctPromise = this.getCurrentActiveTab();
        let parametersPromise = Store.instance.getParameters();
        return Promise.all([bmPromise, parametersPromise, ctPromise]).then((result: any) => {
            let bookmarks: Bookmarks = result[0];
            let parameters: Parameters = result[1];
            let currentTab: chrome.tabs.Tab = result[2];
            this.renderExportLink(bookmarks, parameters);
            let bookmarkListContainer = document.getElementById("bookmarkList");
            if (bookmarkListContainer) {
                let bmList = document.createElement("ul");
                bmList.className = "bmUList";
                return ParameterUtil.getAllParameterValues(parameters, currentTab).then((parameterValues) => {
                    bookmarks.items.forEach(bookmark => {
                        let url = bookmark.url;
                        let resolvedUrl = ParameterUtil.getResolvedUrl(url, parameters, parameterValues);
                        let bmUi = HtmlUtil.getBookmarkDisplay(bookmark, resolvedUrl, this.openBookmark.bind(this), this.deleteBookmark.bind(this), this.editBookmark.bind(this));
                        bmList.appendChild(bmUi);
                    });
                    bookmarkListContainer.innerHTML = '';
                    bookmarkListContainer.appendChild(bmList);
                });


            }
        });
    }

    private renderBookmarkAddControls(): void {
        $("#bmName").val('');
        $("#bmUrl").val('');
        this.bookmarkEditId = null;
        $('#bmAdd').off('click').on('click', () => {
            let bmName = $("#bmName").val() as string;
            let bmUrl = $("#bmUrl").val() as string;
            this.addBookmarkItem(this.bookmarkEditId, bmName, bmUrl).then(() => {
                this.render();
            });
        });
        $('#bmClear').off('click').on('click', (e) => {
            $("#bmName").val('');
            $("#bmUrl").val('');
            this.bookmarkEditId = null;
            ga("send", "event", this.CATEGORY_TYPE_USER, this.EVENT_ACTION_CLEAR_BM);
        });
    }

    private addBookmarkItem(id: string, name: string, url: string): Promise<void> {
        ga("send", "event", this.CATEGORY_TYPE_USER, this.EVENT_ACTION_ADD_BM);
        if (name && url) {
            if (id == null || id == '') {
                id = Util.getUniqueId(BOOKMARK_ID_PREFIX);
            }
            let newBookmark: Bookmark = { id: id, name: name, url: url };
            return Store.instance.addBookmark(newBookmark);
        }
        return
    }

    public openBookmark(bookmarkId: string): void {
        ga("send", "event", this.CATEGORY_TYPE_USER, this.EVENT_ACTION_LINK_OPENED);
    }

    public deleteBookmark(bookmarkId: string): void {
        ga("send", "event", this.CATEGORY_TYPE_USER, this.EVENT_ACTION_DELETE_BM);
        Store.instance.deleteBookmark(bookmarkId).then(() => {
            this.render();
        });
    }

    public editBookmark(bookmarkId: string): void {
        ga("send", "event", this.CATEGORY_TYPE_USER, this.EVENT_ACTION_EDIT_BM);
        Store.instance.getBookmark(bookmarkId).then((bookmark) => {
            if (bookmark) {
                this.bookmarkEditId = bookmarkId;
                $("#bmName").val(bookmark.name);
                $("#bmUrl").val(bookmark.url);
                $("#upsertBookmark").removeClass("collapsible");
                $("#upsertBookmark").addClass("collapsible active");
                $("#upsertBookmark").click();
            }
        });
    }

    private renderParameters(): void {
        let promiseParameters = Store.instance.getParameters();
        let globalParameterListContainer = document.getElementById("globalParameterList");
        if (globalParameterListContainer) {
            promiseParameters.then((parametersObject: Parameters) => {
                document.createElement("table");
                let items: Array<Array<Object>> = [];
                let ids: Array<string> = [];
                parametersObject.items.forEach(p => {
                    if (p) {
                        let closeButton = HtmlUtil.getCloseButton(p.id, this.deleteParameter.bind(this));
                        let paramItem = [p.key, p.value, closeButton];
                        ids.push(p.id);
                        items.push(paramItem);
                    }
                });
                let hearders: Array<string> = [];
                hearders.push("Key");
                hearders.push("Value");
                hearders.push("x");
                let table = HtmlUtil.createTable(items, hearders, ids, this.editParameter.bind(this));
                globalParameterListContainer.innerHTML = '';
                globalParameterListContainer.appendChild(table);
            });

        }
    }

    private renderParameterAddControls(): void {
        $("#pmKey").val("");
        $("#pmValue").val("");
        this.parameterEditId = null;
        $('#pmAdd').off('click').on('click', () => {
            let pmKey = $("#pmKey").val() as string;
            let pmValue = $("#pmValue").val() as string;
            this.addParameter(this.parameterEditId, pmKey, pmValue).then(() => {
                this.render();
            });
        });
        $('#pmClear').off('click').on('click', () => {
            $("#pmKey").val("");
            $("#pmValue").val("");
            this.parameterEditId = null;
        });
    }

    private addParameter(id: string, key: string, value: string): Promise<void> {
        ga("send", "event", this.CATEGORY_TYPE_USER, this.EVENT_ACTION_ADD_PM);
        if (key && value) {
            if (id == null || id == '') {
                id = Util.getUniqueId(PARAMETER_ID_PREFIX);
            }
            let newParameter: Parameter = { id: id, key: key, value: value };
            return Store.instance.addParameter(newParameter);
        }
        return
    }

    public deleteParameter(parameterId: string): void {
        ga("send", "event", this.CATEGORY_TYPE_USER, this.EVENT_ACTION_DELETE_PM);
        Store.instance.deleteParameter(parameterId).then(() => {
            this.render();
        });
    }

    public editParameter(parameterId: string): void {
        ga("send", "event", this.CATEGORY_TYPE_USER, this.EVENT_ACTION_EDIT_PM);
        Store.instance.getParameter(parameterId).then((parameter) => {
            if (parameter) {
                this.parameterEditId = parameter.id;
                $("#pmKey").val(parameter.key);
                $("#pmValue").val(parameter.value);
            }
        });
    }

    public renderExportLink(bookmarks: Bookmarks, parameters: Parameters) {
        let link = document.getElementById("downloadlink");
        if (link) {
            let datamodel: DataModel = { version: Store.instance.DataModelVersion, bookmarks: [], parameters: [] };
            bookmarks.items.forEach(b => {
                datamodel.bookmarks.push(b);
            });
            parameters.items.forEach(p => {
                datamodel.parameters.push(p);
            });

            let dataToExport = JSON.stringify(datamodel);
            let encodedExportData = "text/json;charset=utf-8," + encodeURIComponent(dataToExport);
            link.setAttribute("href", "data:" + encodedExportData);
            link.setAttribute("download", "SmartBookmarks.json");
            $('#export').off('click').on('click', () => {
                ga("send", "event", this.CATEGORY_TYPE_USER, this.EVENT_ACTION_EXPORT);
            });

        }
    }

    public renderImportControls() {
        let importControl = document.getElementById('importFile').onchange = this.onImport.bind(this);
    }

    public onImport(event: any) {
        try {
            ga("send", "event", this.CATEGORY_TYPE_USER, this.EVENT_ACTION_IMPORT);
            let files = event.target.files;
            if (!files.length) {
                alert('No file selected!');
                return;
            }
            let file = files[0];
            let reader = new FileReader();
            const self = this;
            reader.onload = (event) => {
                console.log('FILE CONTENT', event.target.result);
                let content = event.target.result as string;
                let dataModel = JSON.parse(content) as DataModel;
                this.importData(dataModel);
            };
            reader.readAsText(file);
        } catch (err) {
            console.error(err);
        }
    }

    public importData(dataModel: DataModel): void {
        if (dataModel) {
            let promises = [];
            if (dataModel.bookmarks) {
                promises.push(Store.instance.addBookmarks(dataModel.bookmarks));
            }
            if (dataModel.parameters) {
                promises.push(Store.instance.addParameters(dataModel.parameters));
            }
            Promise.all(promises).then(() => {
                this.render();
            });
        }
    }

    private toggleSpinner(start: boolean) {
        if(start){
            $('#syncSpinner').removeClass("loader");
            $('#syncSpinner').addClass("spinner");
        }
        else {
            $('#syncSpinner').removeClass("spinner");
            $('#syncSpinner').addClass("loader");
        }
    }

    public renderSyncControls(): void {
        $('#syncButton').off('click').on('click', () => {
            this.toggleSpinner(true);
            var manifest = chrome.runtime.getManifest();
            var clientId = encodeURIComponent(manifest.oauth2.client_id);
            var scopes = encodeURIComponent(manifest.oauth2.scopes.join(' '));
            var redirectUri = encodeURIComponent('https://' + chrome.runtime.id + '.chromiumapp.org');

            var url = 'https://accounts.google.com/o/oauth2/auth' +
                '?client_id=' + clientId +
                '&response_type=id_token' +
                '&access_type=offline' +
                '&redirect_uri=' + redirectUri +
                '&scope=' + scopes;

            chrome.identity.launchWebAuthFlow(
                {
                    'url': url,
                    'interactive': true
                },
                this.onAuthCallback.bind(this));
        });
    }

    public onAuthCallback(responseUrl?: string ) {
        if (chrome.runtime.lastError) {
            // Example: Authorization page could not be loaded.
            console.log(chrome.runtime.lastError.message);
            this.toggleSpinner(false);
        }
        else {
            var response = responseUrl.split('#', 2)[1];

            // Example: id_token=<YOUR_BELOVED_ID_TOKEN>&authuser=0&hd=<SOME.DOMAIN.PL>&session_state=<SESSION_SATE>&prompt=<PROMPT>
            console.log(response);
            this.toggleSpinner(false);
        }
    }
}