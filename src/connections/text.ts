import { Connection, RequestResponse } from './connection';

export enum TextType {
    AllMeat = 'all-meat',
    MeatAndFiller = 'MeatAndFiller'
}
export type Bit = 0 | 1;
export enum Format {
    Json = 'json',
}

export type TextOptions = Readonly<{
    type: TextType;
    StartWithLorem: Bit;
    format: Format;
    paras?: number;
    sentences?: number;
}>;

type Text = ReadonlyArray<string>;

export const defaultTextOptions: TextOptions = {
    type: TextType.AllMeat,
    StartWithLorem: 0,
    format: Format.Json,
    sentences: 10
};

export class TextProvider {
    constructor(private readonly _connection: Connection) {}

    getTexts(options: TextOptions = defaultTextOptions): Promise<Text> {
        return this._connection.request(options)
            .then((response: RequestResponse) => TextProvider.isText(response) ? response : []);
    }

    static isText(response: RequestResponse): response is Text {
        return !Connection.isErrorResponse(response) && Array.isArray(response);
    }
}