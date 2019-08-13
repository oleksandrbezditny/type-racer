import { action, computed, observable, runInAction } from 'mobx';
import { isSomething } from 'utils';
import { HistoryItem, IHistoryProvider, History } from 'connections';
import { LoginStore } from './login-store';

export class HistoryStore {
    @observable
    private _history: History | null = null;

    constructor(
        private readonly _historyProvider: IHistoryProvider,
        private readonly _loginStore: LoginStore
    ) {
        this._historyProvider.getHistory()
            .then((history) => runInAction(() => this._history = history));
    }

    @action
    addNewRecord(item: HistoryItem): void {
        if(isSomething(this._history)) {
            this._history.push(item);

            this._historyProvider.update(this._history);
        }
    }

    get history(): History | null {
        return this._history;
    }

    @computed
    get userHistory(): History {
        const { username, isGuest } = this._loginStore.loginInfo!;
        return !isGuest && isSomething(this._history)
            ? this._history.filter((item) => item.username === username)
            : [];
    }
}