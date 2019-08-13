import React, { PureComponent } from 'react';

export type ProgressInfoProps = Readonly<{
    WPM: number;
    completionPercent: number;
}>;

export class ProgressInfo extends PureComponent<ProgressInfoProps> {
    render() {
        const { WPM, completionPercent } = this.props;
        return (
            <div>
                <div>WPM: {WPM.toFixed()}</div>
                <div>Completion percent: {completionPercent.toFixed(1)}%</div>
            </div>
        )
    }
}