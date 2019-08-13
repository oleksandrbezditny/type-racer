import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { History as HistoryItems } from 'connections';
import { isSomething } from 'utils';
import styles from './history.module.scss';

export type HistoryProps = Readonly<{
    items: HistoryItems;
    title: string;
}>;

@observer
export class History extends Component<HistoryProps> {
    render() {
        const { items, title } = this.props;

        if(!isSomething(items)) {
            return;
        }
        // key={index} can be replaced to something better
        return (
            <div className={styles.history}>
                <h1>{title}</h1>
                <table className={styles.table}>
                    <tr>
                        <th>speed</th>
                        <th>user</th>
                    </tr>
                    {items.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>
                                    {item.wpm}
                                </td>
                                <td>
                                    {item.username}
                                </td>

                            </tr>
                        )
                    })}
                </table>
            </div>
        );
    }
}