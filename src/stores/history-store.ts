import { observable } from 'mobx';
import { HistoryItem, HistoryProvider } from 'connections/history-provider';
import { History } from 'connections/history-provider';

export class HistoryStore {
    @observable
    items: History = [];

    constructor(private readonly _historyProvider: HistoryProvider) {
        this._historyProvider.getHistory()
            .then((history) => this.items = history);
    }

    addNewRecord(item: HistoryItem): void {
        this.items.push(item);

        this._historyProvider.update(this.items);
    }
}