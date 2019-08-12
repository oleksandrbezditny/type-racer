import React, { Fragment, Component } from 'react';
import { observer } from 'mobx-react';
import { RaceStore } from 'stores/race-store';
import { RaceText } from 'components/race-status-info/race-text';
import { ProgressInfo } from 'components/progress-info/progress-info';
import { TextInput } from 'components/text-input/text-input';
import { Timer } from 'components/timer/timer';

export type RaceTrackerProps = Readonly<{
    raceStore: RaceStore;
    onFinish: () => void;
}>

@observer
export class RaceTracker extends Component<RaceTrackerProps> {
    render() {
        const {raceStore, onFinish} = this.props;
        return (
            <Fragment>
                {raceStore.isInProgress && (
                    <div>
                        <RaceText
                            currentPosition={raceStore.currentPosition}
                            lastCorrectPosition={raceStore.lastCorrectPosition}
                            text={raceStore.text}
                        />
                        <div>
                            <TextInput onUserType={raceStore.applyLetter} removeLetter={raceStore.goBack}/>
                        </div>
                    </div>
                )}
                <div>
                    <ProgressInfo WPM={raceStore.WPM} completionPercent={raceStore.completionPercent}/>
                </div>
                <div>
                    {raceStore.isInProgress && <Timer duration={raceStore.duration}/>}
                </div>
                <div>
                    <input type="button" onClick={onFinish} value="Finish"/>
                </div>
            </Fragment>
        )
    }
}