import { Connection } from './connection';

export class History {
    constructor(private readonly _connection: Connection) {}

    getHistory() {
        return this._connection.request({})
            .then((history) => {
                debugger;
            })
    }
}