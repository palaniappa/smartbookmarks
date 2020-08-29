import { Parameters } from "../model/parameter";
import { ParameterValues } from "../model/parameterValues"
import { Store } from "../controllers/store";

export class ParameterUtil {

    public static readonly PARAM_TYPE_ACTIVE_TAB = "$ActiveTab";
    public static readonly PARAM_TYPE_JS_VALUE = "$Js";
    public static readonly PARAM_TYPE_ACTIVE_TABE_JS_VALUE = "$ActiveTab$Js";
    public static readonly PARAM_TYPE_SEPARATOR = "::";

    public static getResolvedUrl(url: string, parameters: Parameters, parameterValues: ParameterValues): string {
        let resolvedUrl: string = url;
        if (parameters) {
            parameters.items.forEach(p => {
                let paramValue = p.value;
                if (parameterValues.items.has(p.key)) {
                    paramValue = parameterValues.items.get(p.key);
                    resolvedUrl = this.substituteValue(resolvedUrl, p.key, paramValue)
                }
            });
        }
        return resolvedUrl;
    }

    public static getAllParameterValues(parameters: Parameters, currentTab: chrome.tabs.Tab): Promise<ParameterValues> {
        let paramValues: ParameterValues = { items: new Map<string, string>() };
        let promises = [];
        if (parameters) {
            parameters.items.forEach(param => {
                if(param.status != Store.STATUS_DELETED){
                    let p = this.getRuntimeParamValue(param.value, currentTab).then((value) => {
                        return paramValues.items.set(param.key, value);
                    });
                    promises.push(p);
                }
            });
        }
        return Promise.all<ParameterValues>(promises).then((result) => {
            console.log("done!");
            return paramValues;
        });
    }

    public static getFormattedParamName(paramName: string): string {
        return "{{" + paramName + "}}";
    }

    public static getRuntimeParamValue(paramValue: string, currentActiveTab: chrome.tabs.Tab): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            if (paramValue.indexOf(ParameterUtil.PARAM_TYPE_SEPARATOR) > 0) {
                let items = paramValue.split(ParameterUtil.PARAM_TYPE_SEPARATOR);
                let paramValueType = items[0];
                let computedValue = items[1];
                if (paramValueType == ParameterUtil.PARAM_TYPE_ACTIVE_TAB) {
                    let propertyName = items[1];
                    computedValue = this.getActiveTabValue(propertyName, currentActiveTab);
                    resolve(computedValue);
                }
                else if (paramValueType == ParameterUtil.PARAM_TYPE_JS_VALUE) {
                    let expression = items[1];
                    try {
                        computedValue = eval(expression);
                    } catch (err) {
                        console.log(err);
                    }
                    resolve(computedValue);
                }
                else if (paramValueType == ParameterUtil.PARAM_TYPE_ACTIVE_TABE_JS_VALUE) {
                    this.getActiveTabComputedValue(items[1], currentActiveTab).then((val) => {
                        console.log("done!")
                        resolve(val);
                    });
                }
            }
            else {
                resolve(paramValue);
            }
        });
    }

    private static getActiveTabComputedValue(expression: string, currentActiveTab: chrome.tabs.Tab): Promise<string> {
        let p = new Promise<string>((resolve, reject) => {
            let codeString = `(function evaluateExpression(){ return ` + expression + ` ;})()`;
            chrome.tabs.executeScript(currentActiveTab.id, { code: codeString }, (result) => {
                if(result && result[0])
                    resolve(result[0]);
                else    
                    resolve("");
            })
        });
        return p;
    }
    public static getActiveTabValue(variable: string, currentActiveTab: chrome.tabs.Tab) {
        let varValue = "";
        if (currentActiveTab && currentActiveTab.url) {
            let uri = new URL(currentActiveTab.url);
            varValue = uri[variable];
        }

        return varValue;
    }

    public static substituteValue(url: string, paramName: string, paramValue: string) {
        url = url.replace(this.getFormattedParamName(paramName), paramValue);
        return url;
    }
}