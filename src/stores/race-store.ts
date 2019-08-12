import { computed, observable } from 'mobx';
import { emptyString, space } from 'utils';
import { defaultTextOptions, TextProvider } from 'connections/text';

export class RaceStore {
    @observable.ref
    private _text: string = emptyString;

    @observable
    private _lastCorrectPosition = 0;

    @observable
    private _currentPosition = 0;

    @observable
    private _isInProgress: boolean = false;

    private _startTime: number = Date.now();

    constructor(
        private readonly _textProvider: TextProvider,
        private readonly _duration: number // in minutes.
    ) {
        this._textProvider.getTexts({
            ...defaultTextOptions,
            sentences: 5
        }).then((text) => {
            this._text = text.join(' ');
            this._isInProgress = true;
            this._startTime = Date.now();

            setTimeout(
                () => this._isInProgress = false,
                this._duration * 1000 * 60
            );
        });
    }

    get lastCorrectPosition(): number {
        return this._lastCorrectPosition;
    }

    get currentPosition(): number {
        return this._currentPosition;
    }

    get text(): string {
        return this._text;
    }

    get isInProgress(): boolean {
        return this._isInProgress;
    }

    get duration(): number {
        return this._duration;
    }

    applyLetter = (word: string): void => {
        if (this.hasWrongRecords()) {
            this._currentPosition++;
        } else if (this._text[this._lastCorrectPosition] === word) {
            this._currentPosition++;
            this._lastCorrectPosition++;
        } else {
            this._currentPosition++;
        }
    }

    goBack = (): void => {
        if (this.isInStartingPosition()) {
            return;
        }
        if (!this.hasWrongRecords()) {
            this._currentPosition--;
            this._lastCorrectPosition--;
        } else {
            this._currentPosition--;
        }
    }

    @computed
    get WPM(): number {
        if (this._lastCorrectPosition === 0) {
            return 0;
        }

        const trueTypedWords = this._text
            .substring(0, this._lastCorrectPosition)
            .split(space)
            .filter((word) => !!word)
            .length;

        const currentTime = Date.now();
        const mins = ((currentTime - this._startTime) / 1000) / 60;
        return (trueTypedWords / mins);
    }

    @computed
    get completionPercent() {
        return (this._lastCorrectPosition / this._text.length) * 100;
    }

    private isInStartingPosition(): boolean {
        return this._currentPosition === 0 && this._lastCorrectPosition === 0;
    }

    private hasWrongRecords(): boolean {
        return this._currentPosition !== this._lastCorrectPosition;
    }
}