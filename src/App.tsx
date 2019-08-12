import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { isSomething } from 'utils/index';
import { config } from 'config';
import { TextProvider } from 'connections/text';
import { Connection } from 'connections/connection';
import { RaceTracker } from 'components/race-tracker/race-tracker';
import { RaceStore } from 'stores/race-store';

@observer
export class App extends Component {
    @observable.ref
    private _raceStore: RaceStore | null = null;
  render() {
    return (
        <div className="App">
            {isSomething(this._raceStore) && <RaceTracker raceStore={this._raceStore} onFinish={this.finishRace}/>}
            {!isSomething(this._raceStore) && <input type="button" value="Start" onClick={this.startRace}/>}
        </div>
    );
  }

  private startRace = () => {
        this._raceStore = new RaceStore(
            new TextProvider(
                new Connection(config.textProviderConnection)
            ),
            config.roundDuration
        );
  }

  private finishRace = () => {
        this._raceStore = null;
  }
}

export default App;
