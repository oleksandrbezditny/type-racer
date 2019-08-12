import React, { Component, Fragment } from 'react';
import { observer } from 'mobx-react';
import { action, observable, runInAction } from 'mobx';

export type TimerProps = Readonly<{
    duration: number; //in minutes
}>;

@observer
export class Timer extends Component<TimerProps> {
    @observable
    private _secondsRemaining: number = 0;
    private _intervalId: number;

    constructor(props: TimerProps) {
        super(props);

        this.updateSeconds(this.props.duration * 60);
        this._intervalId = window.setInterval(
            () => {
                if(this._secondsRemaining === 0) {
                    window.clearInterval(this._intervalId);
                    return;
                }
                this.updateSeconds(this._secondsRemaining - 1);
            },
            1000);
    }

    render() {
        const minutes = Math.floor(this._secondsRemaining / 60);
        var seconds = this._secondsRemaining - (minutes * 60);

        return (
            <Fragment>
                <div>
                    Minutes: {minutes}
                </div>
                <div>
                    Seconds: {seconds}
                </div>
            </Fragment>
        )
    }

    @action
    private updateSeconds(seconds: number): void {
        this._secondsRemaining = seconds;
    }

    componentWillUnmount() {
        window.clearInterval(this._intervalId);
    }
}