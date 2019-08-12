import { action, computed, observable, runInAction } from 'mobx';
import { emptyString, random, space } from 'utils';
import { defaultTextOptions, TextProvider } from 'connections';

export class TypingPanelStore {
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
            sentences: random(5, 15)
        }).then((text) => {
            this.initGameState(text.join(' '));

            setTimeout(
                () => runInAction(() => this._isInProgress = false),
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
            this.updateCurrentPosition(this._currentPosition + 1);
        } else if (this._text[this._lastCorrectPosition] === word) {
            this.updateCurrentPosition(this._currentPosition + 1);
            this.updateLastCorrectPosition(this._lastCorrectPosition + 1);
        } else {
            this.updateCurrentPosition(this._currentPosition + 1);
        }
    };

    goBack = (): void => {
        if (this.isInStartingPosition()) {
            return;
        }
        if (!this.hasWrongRecords()) {
            this.updateCurrentPosition(this._currentPosition - 1);
            this.updateLastCorrectPosition(this._lastCorrectPosition - 1);
        } else {
            this.updateCurrentPosition(this._currentPosition - 1);
        }
    };

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

    @action
    private updateCurrentPosition(position: number): void {
        this._currentPosition = position;
    }

    @action
    private updateLastCorrectPosition(position: number): void {
        this._lastCorrectPosition = position;
    }

    @action
    private initGameState(text: string): void {
        this._text = text;
        this._isInProgress = true;
        this._startTime = Date.now();
    }
}