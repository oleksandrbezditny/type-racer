import { ILoginProvider, LoginCredentials } from 'connections';
import { LoginStore } from 'stores';

export class FakeLoginProvider implements ILoginProvider {
    private readonly _accounts: ReadonlyArray<LoginCredentials> = [{
        username: 'test',
        password: 'test'
    }, {
       username: 'test1',
       password: 'test1'
    }];

    login(credentials: LoginCredentials): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            resolve(this._accounts.some(({ username, password }) =>
                username === credentials.username && password === credentials.password
            ));
        })
    }
}

describe('LoginStore', () => {
    let loginStore: LoginStore;

    beforeEach(() => {
        loginStore = new LoginStore(new FakeLoginProvider());
    });

    it('Should have correct init values', () => {
       expect(loginStore.loginInfo).toBeNull();
    });

    it('Should have possibility to login as a guest', () => {
        loginStore.loginAsGuest();
        expect(loginStore.loginInfo).toBeDefined();
        expect(loginStore.loginInfo!.isGuest).toBeTruthy();
    });

    it('Should have possibility to login', (done) => {
        loginStore.login({
            username: 'test',
            password: 'test'
        })
            .then(() => {
                expect(loginStore.loginInfo!.username).toBe('test');
                expect(loginStore.loginInfo!.isGuest).toBeFalsy();
                done();
            });
    });

    it('Shouldn/t be logged in when credentials are wrong', (done) => {
        loginStore.login({
            username: 'test',
            password: 'test1'
        })
            .then((result) => {
                expect(result).toBeFalsy();
                done();
            })
    });
});