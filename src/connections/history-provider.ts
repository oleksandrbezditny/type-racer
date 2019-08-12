import { Connection, RequestResponse } from './connection';

export type HistoryItem = Readonly<{
    username: string;
    wpm: number;
}>;

export type History = Array<HistoryItem>;

export class HistoryProvider {
    constructor(private readonly _connection: Connection) {}

    getHistory(): Promise<History> {
        return this._connection.request({})
            .then((response) => HistoryProvider.isHistory(response) ? response : []);
    }

    update(history: History) {
        this._connection.update(history);
    }

    static isHistory(response: RequestResponse): response is History {
        return Array.isArray(response)
            && response.every(
                (item) => item.hasOwnProperty('username') && item.hasOwnProperty('wpm')
            )
    }
}