import { action, observable } from 'mobx';
import { LoginCredentials, LoginProvider } from 'connections/login-provider';

export type LoginInfo = Readonly<{
   username: string;
   isGuest: boolean;
}>;

export class LoginStore {
    @observable
    private _isLoggedIn: boolean = false;

    @observable.ref
    private _loginInfo: LoginInfo | null = null;

    constructor(private readonly _loginProvider: LoginProvider) {}

    login(credentials: LoginCredentials): void {
        this._loginProvider.login(credentials)
            .then((isLogged) => {
                if(isLogged) {
                    this.fillLoginInfo({
                        username: credentials.username,
                        isGuest: false
                    });
                }
            });
    }

    loginAsGuest(): void {
        this.fillLoginInfo({
            username: `Guest${(Math.random() * 1000000).toFixed()}`,
            isGuest: true
        });
    }

    get isLoggedIn(): boolean {
        return this._isLoggedIn;
    }

    get loginInfo(): LoginInfo | null {
        return this._loginInfo;
    }

    @action
    private fillLoginInfo(loginInfo: LoginInfo): void {
        this._loginInfo = loginInfo;
        this._isLoggedIn = true;
    }
}