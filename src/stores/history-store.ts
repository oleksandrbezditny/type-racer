import { computed, observable, runInAction } from 'mobx';
import { HistoryItem, HistoryProvider } from 'connections/history-provider';
import { History } from 'connections/history-provider';
import { LoginStore } from './login-store';

export class HistoryStore {
    @observable
    _history: History = [];

    constructor(
        private readonly _historyProvider: HistoryProvider,
        private readonly _loginStore: LoginStore
    ) {
        this._historyProvider.getHistory()
            .then((history) => runInAction(()=> this._history = history));
    }

    addNewRecord(item: HistoryItem): void {
        this._history.push(item);

        this._historyProvider.update(this._history);
    }

    get history(): History {
        return this._history;
    }

    @computed
    get userHistory(): History {
        const { username, isGuest } = this._loginStore.loginInfo!;
        return !isGuest
            ? this._history.filter((item) => item.username === username)
            : [];
    }
}