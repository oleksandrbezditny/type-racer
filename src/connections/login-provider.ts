import { Connection, RequestResponse } from './connection';

export type LoginCredentials = Readonly<{
    username: string;
    password: string;
}>;

type Logins = ReadonlyArray<LoginCredentials>;

export interface ILoginProvider {
    login(credentials: LoginCredentials): Promise<boolean>,
}

export class LoginProvider implements ILoginProvider {
    constructor(private readonly _connection: Connection) {}

    login(credentials: LoginCredentials): Promise<boolean> {
        return this._connection.request({})
            .then((response) => this.isSuccessResponse(response, credentials))
    }

    private isSuccessResponse(response: RequestResponse, credentials: LoginCredentials): boolean {
        if(LoginProvider.isLoginInfo(response)) {
            return response.some(({ username, password }) =>
                username === credentials.username && password === credentials.password
            )
        }
        return false;
    }

    static isLoginInfo(response: RequestResponse): response is Logins {
        return Array.isArray(response) && response.every((credentials) =>
            credentials.hasOwnProperty('username') && credentials.hasOwnProperty('password')
        );
    }
}