export interface ConnectionError {
    code: number;
    message: string;
}

export type RequestResponse = object | ConnectionError;

export class Connection {
    constructor(private readonly _srcPath: string) { }

    request(params: object): Promise<RequestResponse> {
        return new Promise<RequestResponse>((resolve) => {
            fetch(`${this._srcPath}?${toUrlParams(params)}`)
                .then((response: Response) => resolve(response.json()))
                .catch(({ code, message }) => resolve({ code, message }));
        });
    }

    static isErrorResponse(response: RequestResponse): response is ConnectionError {
        return response.hasOwnProperty('code') && response.hasOwnProperty('message');
    }
}


export function toUrlParams(obj: object): string {
    return Object.entries(obj).map(([key, value]) => `${key}=${value}`).join('&');
}