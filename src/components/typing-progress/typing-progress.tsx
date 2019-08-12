import React, { PureComponent, Fragment } from 'react';
import { emptyString } from 'utils';
import styles from 'components/typing-progress/typing-progress.module.scss';

export type TypingProgressProps = Readonly<{
    currentPosition: number;
    lastCorrectPosition: number;
    text: string;
}>;

export class TypingProgress extends PureComponent<TypingProgressProps> {
    render() {
        const { text, lastCorrectPosition, currentPosition } = this.props;
        const correctText = text.substring(0, lastCorrectPosition);
        const incorrectText = currentPosition - lastCorrectPosition !== 0
            ? text.substring(lastCorrectPosition, currentPosition)
            : emptyString;
        const restOfText = text.substring(currentPosition, text.length);
        return (
            <Fragment>
                <span className={styles.correct}>{correctText}</span>
                <span className={styles.incorrect}>{incorrectText}</span>
                <span>{restOfText}</span>
            </Fragment>
        );
    }
}