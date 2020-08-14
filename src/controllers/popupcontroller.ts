import { Store } from "./store";
import { Bookmarks, Bookmark, BOOKMARK_ID_PREFIX } from "../model/bookmark";
import { Parameters, Parameter, PARAMETER_ID_PREFIX } from "../model/parameter";
import { HtmlUtil } from "../utils/htmlutils";
import { ParameterUtil } from "../utils/parameterutils";
import { Util } from "../utils/util";
import { DataModel } from "../model/datamodel";

import * as $ from 'jquery';

export class PopupController {

    public static instance: PopupController = new PopupController();
    public bookmarkEditId: string = null;
    public parameterEditId: string = null;

    public render(): Promise<void> {
        console.log("rendering!")
        let p = this.renderBookmarks();
        this.renderBookmarkAddControls();
        this.renderParameters();
        this.renderParameterAddControls();
        this.renderImportControls();
        return p.then(() => {
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
                        let bmUi = HtmlUtil.getBookmarkDisplay(bookmark, resolvedUrl, this.deleteBookmark.bind(this), this.editBookmark.bind(this));
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
        $('#bmClear').off('click').on('click', () => {
            $("#bmName").val('');
            $("#bmUrl").val('');
            this.bookmarkEditId = null;
        });
    }

    private addBookmarkItem(id: string, name: string, url: string): Promise<void> {
        if (name && url) {
            if (id == null || id == '') {
                id = Util.getUniqueId(BOOKMARK_ID_PREFIX);
            }
            let newBookmark: Bookmark = { id: id, name: name, url: url };
            return Store.instance.addBookmark(newBookmark);
        }
        return
    }

    public deleteBookmark(bookmarkId: string): void {
        Store.instance.deleteBookmark(bookmarkId).then(() => {
            this.render();
        });
    }

    public editBookmark(bookmarkId: string): void {
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
        Store.instance.deleteParameter(parameterId).then(() => {
            this.render();
        });
    }

    public editParameter(parameterId: string): void {
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
        }
    }

    public renderImportControls() {
        let importControl = document.getElementById('importFile').onchange = this.onImport.bind(this);
    }

    public onImport(event: any) {
        try {
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
}