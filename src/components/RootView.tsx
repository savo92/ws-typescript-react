import { Col, Layout, Row } from "antd";
import * as React from "react";

import { IToDoEntry } from "../interfaces";

import { EntriesList } from "./EntriesList";
import { NewEntryForm } from "./NewEntryForm";

interface IState {
    entries: IToDoEntry[];
}

// You can provide interfaces for props and state directly in the class declaration.
// Here, props is an empty object and state is IState.
export class RootView extends React.PureComponent<{}, IState> {
    constructor(props: {}) {
        super(props);
        this.state = { entries: [] };

        this.addNewEntry = this.addNewEntry.bind(this);
        this.toggleStatus = this.toggleStatus.bind(this);
    }

    public render(): JSX.Element {
        return (
            <Layout>
                <Layout.Content className="root-content">
                    <Row>
                        <Col span={24}>
                            <h1>ToDo App</h1>

                            <EntriesList
                                entries={this.state.entries}
                                onStatusToggle={this.toggleStatus}
                            />

                            <NewEntryForm onCreate={this.addNewEntry} />
                        </Col>
                    </Row>
                </Layout.Content>
            </Layout>
        );
    }

    // You can define both function params and return
    private addNewEntry(
        description: string,
        tags: string[],
        dueDate?: Date,
    ): void {
        const now = new Date();
        const newEntry: IToDoEntry = {
            completed: false,
            creationDate: now,
            description,
            dueDate,
            id: `entry-${now.toUTCString()}-${Math.random()}`,
            tags,
        };

        this.setState({
            entries: [...this.state.entries, newEntry],
        });
    }

    private toggleStatus(entryId: string): void {
        this.setState((state) => {
            // On VScode, if you hover over `entries`, it will describe it as `IToDoEntry`.
            // This thanks to the Typescript type inference and VScode that has an advanced support to Typescript
            const entries = state.entries.map((entry: IToDoEntry) => {
                if (entry.id === entryId) {
                    entry.completed = !entry.completed;
                }

                return entry;
            });

            return {
                entries,
            };
        });
    }
}
