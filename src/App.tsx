import React, { Component, Fragment } from 'react';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import { isSomething } from 'utils';
import { config } from 'config';
import { TextProvider } from 'connections/text';
import { Connection } from 'connections/connection';
import { RaceTracker } from 'components/race-tracker/race-tracker';
import { History } from 'components/history/history';
import { RaceStore } from 'stores/race-store';
import { HistoryStore } from 'stores/history-store';
import { LoginStore } from 'stores/login-store';
import { HistoryProvider } from 'connections/history-provider';
import { LoginProvider } from 'connections/login-provider';
import { Login } from 'components/login/login';

@observer
export class App extends Component {
    @observable.ref
    private _raceStore: RaceStore | null = null;

    private _loginStore = new LoginStore(
        new LoginProvider(
            new Connection(config.loginConnection)
        )
    );

    private _historyStore = new HistoryStore(
        new HistoryProvider(
            new Connection(config.historyConnection)
        ),
         this._loginStore
    );

    render() {
        return (
            <div className="App">
                {this._loginStore.isLoggedIn && (
                    <Fragment>
                        {isSomething(this._raceStore) && <RaceTracker raceStore={this._raceStore} onFinish={this.finishRace}/>}
                        {!isSomething(this._raceStore) && <input type="button" value="Start" onClick={this.startRace}/>}
                        <History items={this._historyStore._history}/>
                        <History items={this._historyStore.userHistory}/>
                    </Fragment>
                )}
                {!this._loginStore.isLoggedIn && <Login loginStore={this._loginStore}/>}
            </div>
        );
    }

    @action
    private startRace = () => {
        this._raceStore = new RaceStore(
            new TextProvider(
                new Connection(config.textProviderConnection)
            ),
            config.roundDuration
        );
    }

    @action
    private finishRace = () => {
        this._historyStore.addNewRecord({
            // login info should exists in this case
            username: this._loginStore!.loginInfo!.username,
            // race store should exists in this case
            wpm: this._raceStore!.WPM
        });
        this._raceStore = null;
    }
}

export default App;
