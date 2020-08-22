import { tsParameterProperty } from "@babel/types";

interface Parameter {
    id: string;
    key: string;
    value: string;
    status?: string;
}

interface Parameters {
    items: Map<string,Parameter>;
}

const PARAMETER_ID_PREFIX = "PM";
export { Parameter, Parameters, PARAMETER_ID_PREFIX }