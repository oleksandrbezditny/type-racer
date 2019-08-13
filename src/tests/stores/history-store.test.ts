import { HistoryItem, IHistoryProvider, History } from 'connections';
import { HistoryStore, LoginStore } from 'stores';
import { FakeLoginProvider } from './login-store.test';

class FakeHistoryProvider implements IHistoryProvider {
    private _history: Array<HistoryItem> = [{
        username: 'test',
        wpm: '120'
    }, {
        username: 'test2',
        wpm: '100'
    }];

    getHistory(): Promise<History> {
        return new Promise<History>((resolve) => {
            resolve(this._history);
        });
    }

    update(history: History): void {
    }
}

describe('HistoryStore', () => {
    let historyStore: HistoryStore;

    beforeEach(() => {
        historyStore = new HistoryStore(
            new FakeHistoryProvider(),
            new LoginStore(new FakeLoginProvider())
        );
   });

    it('Should have history', () => {
        expect(historyStore.history).toBeDefined();
        expect(historyStore.history!.length).toBe(2);
    });

    it('Should have history', () => {
        expect(historyStore.history).toBeDefined();
        expect(historyStore.history!.length).toBe(2);
    });

    it('Should update history', () => {
        historyStore.addNewRecord({
            username: 'test',
            wpm: '120'
        });
        expect(historyStore.history!.length).toBe(3);
    });
});