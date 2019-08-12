import { observable } from 'mobx';
import { LoginCredentials, LoginProvider } from 'connections/login-provider';

export type LoginInfo = Readonly<{
   username: string;
   isGuest: boolean;
}>;

export class LoginStore {
    @observable
    private _isLoggedIn: boolean = false;

    @observable
    private _loginInfo: LoginInfo | null = null;

    constructor(private readonly _loginProvider: LoginProvider) {}

    login(credentials: LoginCredentials): void {
        this._loginProvider.login(credentials)
            .then((isLogged) => {
                if(isLogged) {
                    this._isLoggedIn = true;
                    this._loginInfo = {
                        username: credentials.username,
                        isGuest: false
                    }
                }
            });
    }

    loginAsGuest(): void {
        this._loginInfo = {
            username: `Guest${(Math.random() * 1000000).toFixed()}`,
            isGuest: true
        };
        this._isLoggedIn = true;
    }

    get isLoggedIn(): boolean {
        return this._isLoggedIn;
    }

    get loginInfo(): LoginInfo | null {
        return this._loginInfo;
    }
}