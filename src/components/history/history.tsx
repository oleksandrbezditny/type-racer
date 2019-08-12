import React, { Component, Fragment } from 'react';
import { observer } from 'mobx-react';
import { History as HistoryItems } from 'connections/history-provider';

export type HistoryProps = Readonly<{
    items: HistoryItems;
}>;

@observer
export class History extends Component<HistoryProps> {
    render() {
        const { items } = this.props;
        return (
            // key={index} can be replaced to something better
            items.map((item, index) => {
                return (
                    <Fragment key={index}>
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