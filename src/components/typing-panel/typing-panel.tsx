import React, { Fragment, Component } from 'react';
import { observer } from 'mobx-react';
import { TypingPanelStore } from 'stores';
import { TypingProgress, ProgressInfo, TextInput, Timer, Loader } from 'components';

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
                <div>
                    <ProgressInfo WPM={typingPanelStore.WPM} completionPercent={typingPanelStore.completionPercent}/>
                </div>
                <div>
                    {typingPanelStore.isInProgress && <Timer duration={typingPanelStore.duration}/>}
                </div>
                <div>
                    <input type="button" onClick={this.props.onFinish} value="Finish"/>
                </div>
            </Fragment>
        )
    }
}