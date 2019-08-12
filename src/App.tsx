import React, { Component, Fragment } from 'react';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import { isSomething } from 'utils';
import { config } from 'config';
import { TextProvider } from 'connections/text';
import { Connection } from 'connections/connection';
import { TypingPanel } from 'components/typing-panel/typing-panel';
import { History } from 'components/history/history';
import { Login } from 'components/login/login';
import { Loader } from 'components/loader/loader';
import { TypingPanelStore } from 'stores/typing-panel-store';
import { HistoryStore } from 'stores/history-store';
import { LoginStore } from 'stores/login-store';
import { HistoryProvider } from 'connections/history-provider';
import { LoginProvider } from 'connections/login-provider';
@observer
export class App extends Component {
    @observable.ref
    private _typingPanelStore: TypingPanelStore | null = null;

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
                        {isSomething(this._typingPanelStore) && (
                            <TypingPanel typingPanelStore={this._typingPanelStore} onFinish={this.finish}/>
                        )}
                        {!isSomething(this._typingPanelStore) && (
                            <input type="button" value="Start" onClick={this.start}/>
                        )}
                        <Loader loading={!isSomething(this._historyStore.history)}>
                            <History items={this._historyStore.history!}/>
                            <History items={this._historyStore.userHistory!}/>
                        </Loader>
                    </Fragment>
                )}
                {!this._loginStore.isLoggedIn && <Login loginStore={this._loginStore}/>}
            </div>
        );
    }

    @action
    private start = () => {
        this._typingPanelStore = new TypingPanelStore(
            new TextProvider(
                new Connection(config.textProviderConnection)
            ),
            config.roundDuration
        );
    }

    @action
    private finish = () => {
        this._historyStore.addNewRecord({
            // login info should exists in this case
            username: this._loginStore!.loginInfo!.username,
            // typing panel store should exists in this case
            wpm: this._typingPanelStore!.WPM
        });
        this._typingPanelStore = null;
    }
}

export default App;
