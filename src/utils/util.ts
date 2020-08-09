export class Util {

    public static getUniqueId(prefix: string): string {
        return prefix + "_" + Math.floor(Math.random() * Date.now()).toString();
    }
    public static isString(value) {
        return typeof value === 'string' || value instanceof String;
    }
}