import { doc } from "prettier";
import { Bookmark } from "../model/bookmark";
import { Util } from "./util";


export class HtmlUtil {
    public static createTable(tableData: Array<Array<Object>>, headers: Array<string>, ids: Array<string>, editHandler: (bookmarkId:string) => void): HTMLElement {
        let table = document.createElement('table');

        if (headers) {
            let tableHead = document.createElement('thead');

            let headerRow = document.createElement('tr');

            headers.forEach(function (headerData) {
                let cell = document.createElement('th');
                cell.appendChild(document.createTextNode(headerData));
                headerRow.appendChild(cell);
            });
            tableHead.appendChild(headerRow);
            table.appendChild(tableHead);
        }

        let tableBody = document.createElement('tbody');

        let rowcount = 0;
        tableData.forEach(function (rowData) {
            let row = document.createElement('tr');
            let itemId = ids[rowcount++];
            rowData.forEach(function (cellData) {
                let cell = document.createElement('td');
                let element = cellData as HTMLElement;
                if(Util.isString(cellData))
                {
                    cell.appendChild(document.createTextNode(cellData as string));
                }
                else
                    cell.appendChild(element);
                row.appendChild(cell);
            });
            row.ondblclick = ()=> {
                editHandler(itemId);
            }
            tableBody.appendChild(row);
        });

        table.appendChild(tableBody);
        return table;
    }

    public static getListItemWithClose(childElemet: HTMLElement, itemId: string, openHandler: (bookmarkId: string) => void, deleteHandler: (bookmarkId:string) => void, editHandler: (bookmarkId:string) => void): HTMLElement {
        let newLi = document.createElement("li");
        newLi.className = "bmUListItem";
        newLi.appendChild(childElemet);
        let closeButton = HtmlUtil.getCloseButton(itemId, deleteHandler);
        newLi.appendChild(closeButton);
        newLi.onclick = () =>{
            openHandler(itemId);
        };
        newLi.ondblclick = ()=> {
            editHandler(itemId);
        }
        return newLi;

    }

    public static getCloseButton( itemId: string, deleteHandler: (bookmarkName:string) => void): HTMLElement {
        let closeButton = document.createElement("span");
        if(itemId.startsWith("BM")){
            closeButton.className = "closeBookmark";
        }else{
            closeButton.className = "closeParam";
        }
        closeButton.innerHTML = '&times;';

        closeButton.addEventListener("click", () => {
            deleteHandler(itemId);
          });
          return closeButton;
    }

    public static getBookmarkDisplay(bm: Bookmark, resolvedUrl: string, openHandler: (bookmarkId:string) => void, deleteHandler: (bookmarkId:string) => void, editHandler: (bookmarkId:string) => void): HTMLElement {
        let anchorElement = HtmlUtil.getAnchorElement(bm.name, resolvedUrl);
        return HtmlUtil.getListItemWithClose(anchorElement,bm.id, openHandler, deleteHandler, editHandler);
    }

    public static getAnchorElement(name: string, resolvedUrl: string): HTMLElement {
        let x = document.createElement("A");
        let t = document.createTextNode(name);
        x.setAttribute("target", "_base");
        x.setAttribute("href", resolvedUrl);
        x.appendChild(t);
        return x;
    }
}