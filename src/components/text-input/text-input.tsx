import React, { KeyboardEvent, FocusEvent, PureComponent } from 'react';
import { isSomething } from 'utils';

export type TextInputProps = Readonly<{
    onUserType: (letter: string) => void;
    removeLetter: () => void;
}>;

export class TextInput extends PureComponent<TextInputProps> {
    private _inputRef: HTMLInputElement | null = null;

    render() {
        return (
            <input
                ref={(ref) => this._inputRef = ref}
                type="text"
                autoCorrect="off"
                autoCapitalize="off"
                placeholder="Type here"
                onKeyPress={this.onKeyPress}
                onKeyDown={this.onKeyDown}
                onFocus={this.moveToTheEnd}
            />
        )
    }

    private onKeyDown = (e: KeyboardEvent) => {
        const keyCode = e.which || e.keyCode;

        switch (keyCode) {
            case 8:
                this.props.removeLetter();
        }
    }

    private onKeyPress = (e: KeyboardEvent) => {
        const keyCode = e.which || e.keyCode;
        const letter = String.fromCharCode(keyCode);

        if (isSomething(letter)) {
            this.props.onUserType(letter);
        }
    }

    private moveToTheEnd = (e: FocusEvent) => {
        // input should exists in this case
        const input = this._inputRef!;
        const text = input.value;
        input.value = '';
        input.value = text;
    }
}