import React, { Fragment, Component } from 'react';
import { observer } from 'mobx-react';
import { TypingPanelStore } from 'stores';
import { TypingProgress, ProgressInfo, TextInput, Timer, Loader } from 'components';
import styles from './typing-panel.module.scss';

export type TypingPanelProps = Readonly<{
    typingPanelStore: TypingPanelStore;
    onFinish: () => void;
}>

@observer
export class TypingPanel extends Component<TypingPanelProps> {
    render() {
        const { typingPanelStore } = this.props;
        return (
            <Fragment>
                <Loader loading={!typingPanelStore.text}>
                    <div className={styles.progressInfo}>
                        <input type="button" onClick={this.props.onFinish} value="Finish"/>
                        <ProgressInfo WPM={typingPanelStore.WPM} completionPercent={typingPanelStore.completionPercent}/>
                        {typingPanelStore.isInProgress && <Timer duration={typingPanelStore.duration}/>}
                    </div>
                    <div>
                        <TypingProgress
                            currentPosition={typingPanelStore.currentPosition}
                            lastCorrectPosition={typingPanelStore.lastCorrectPosition}
                            text={typingPanelStore.text}
                        />
                        <div>
                            <TextInput onUserType={typingPanelStore.applyLetter} removeLetter={typingPanelStore.goBack}/>
                        </div>
                    </div>
                </Loader>
            </Fragment>
        )
    }
}