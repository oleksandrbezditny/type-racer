export type ConnectionError = Readonly<{
    code: number;
    message: string;
}>;

export type RequestResponse = object | ConnectionError;

export class Connection {
    constructor(private readonly _srcPath: string) {
    }

    request(params: object): Promise<RequestResponse> {
        return new Promise<RequestResponse>((resolve) => {
            fetch(`${this._srcPath}?${toUrlParams(params)}`)
                .then((response: Response) => resolve(response.json()))
                .catch(({status, message}) => resolve({code: status, message}));
        });
    }

    update(object: any): Promise<RequestResponse> {
        return new Promise<RequestResponse>((resolve) => {
            fetch(this._srcPath, {
                method: 'PUT',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                redirect: 'follow',
                referrer: 'no-referrer',
                body: JSON.stringify(object),
            })
                .then((response: Response) => resolve(response.json()))
                .catch(({status, message}) => resolve({code: status, message}));
        });
    }

    static isErrorResponse(response: RequestResponse): response is ConnectionError {
        return response.hasOwnProperty('code') && response.hasOwnProperty('message');
    }
}


export function toUrlParams(obj: object): string {
    return Object.entries(obj).map(([key, value]) => `${key}=${value}`).join('&');
}