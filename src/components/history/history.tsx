import React, { Component, Fragment } from 'react';
import { observer } from 'mobx-react';
import { HistoryStore } from 'stores/history-store';

export type HistoryProps = Readonly<{
    historyStore: HistoryStore;
}>;

@observer
export class History extends Component<HistoryProps> {
    render() {
        const { historyStore } = this.props;
        return (
            historyStore.items.map((item) => {
                return (
                    <Fragment>
                        <div>
                            {item.username}
                        </div>
                        <div>
                            {item.wpm}
                        </div>
                    </Fragment>
                )
            })
        );
    }
}