import React, { Component, Fragment } from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

export type TimerProps = Readonly<{
    duration: number; //in minutes
}>;

@observer
export class Timer extends Component<TimerProps> {
    @observable
    private secondsRemaining: number = 0;

    private intervalId: number;

    constructor(props: TimerProps) {
        super(props);
        this.secondsRemaining = this.props.duration * 60;

        this.intervalId = window.setInterval(
            () => {
                if(this.secondsRemaining === 0) {
                    window.clearInterval(this.intervalId);
                    return;
                }
                this.secondsRemaining--;
            },
            1000);
    }

    render() {
        const minutes = Math.floor(this.secondsRemaining / 60);
        var seconds = this.secondsRemaining - (minutes * 60);

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

    componentWillUnmount() {
        window.clearInterval(this.intervalId);
    }
}