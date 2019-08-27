import { Checkbox, List, Tag } from "antd";
import * as React from "react";

import { IToDoEntry } from "../interfaces";

interface IEntryProps {
    entry: IToDoEntry;
    onStatusToggle(entryId: string): void;
}

interface IListProps {
    entries: IToDoEntry[];
    onStatusToggle(entryId: string): void;
}

const randomColor = (): string => {
    const hex = [...Array(6).keys()]
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join("");

    return `#${hex}`;
};

const EntryCheck = (props: IEntryProps): JSX.Element => (
    <Checkbox
        checked={props.entry.completed}
        onChange={props.onStatusToggle.bind(null, props.entry.id)}
    />
);

const Entry = (props: IEntryProps): JSX.Element => {

    const descr = props.entry.dueDate !== undefined ? props.entry.dueDate.toUTCString() : "";
    const tags = props.entry.tags.map((tag: string) => <Tag color={randomColor()} key={tag}>{tag}</Tag>);

    const toggleStatus = (
        <EntryCheck
            key="lisitem-check"
            entry={props.entry}
            onStatusToggle={props.onStatusToggle}
        />
    );

    return (
        <List.Item actions={[toggleStatus]}>
            <List.Item.Meta
                description={descr}
                title={props.entry.description}
            />
            <div>{tags}</div>
        </List.Item>
    );
};

export const EntriesList = (props: IListProps): JSX.Element => {

    const renderItem = (entry: IToDoEntry): JSX.Element => (
        <Entry
            entry={entry}
            onStatusToggle={props.onStatusToggle}
        />
    );

    return (
        <List
            bordered={true}
            dataSource={props.entries}
            header={<h3>To do:</h3>}
            renderItem={renderItem}
        />
    );
};
