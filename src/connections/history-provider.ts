import { Connection, RequestResponse } from './connection';

export type HistoryItem = Readonly<{
    username: string;
    wpm: string;
}>;

export type History = Array<HistoryItem>;

export interface IHistoryProvider {
    getHistory(): Promise<History>;
    update(history: History): void;
}

export class HistoryProvider implements IHistoryProvider {
    constructor(
        private readonly _connection: Connection,
    ) {}

    getHistory(): Promise<History> {
        return this._connection.request({})
            .then((response) => HistoryProvider.isHistory(response) ? response : []);
    }

    update(history: History): void {
        this._connection.update(history);
    }

    static isHistory(response: RequestResponse): response is History {
        return Array.isArray(response)
            && response.every(
                (item) => item.hasOwnProperty('username') && item.hasOwnProperty('wpm')
            )
    }
}