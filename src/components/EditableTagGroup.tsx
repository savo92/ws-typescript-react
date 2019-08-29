// tslint:disable: jsx-no-multiline-js
import { Icon, Input, Tag, Tooltip } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import * as React from "react";

interface IProps {
    tags: string[];
    // We need to use WrappedFormUtils["setFieldsValue"],
    // instead of WrappedFormUtils.setFieldsValue,
    // because WrappedFormUtils is a type and not a namespace.
    onChange: WrappedFormUtils["setFieldsValue"];
}

interface IState {
    inputValue: string;
    inputVisible: boolean;
}

export class EditableTagGroup extends React.Component<IProps, IState> {
    private input: Input | null = null;

    constructor(props: IProps) {
        super(props);

        this.state = {
            inputValue: "",
            inputVisible: false,
        };

        this.handleClose = this.handleClose.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputConfirm = this.handleInputConfirm.bind(this);
        this.showInput = this.showInput.bind(this);
        this.saveInputRef = this.saveInputRef.bind(this);
    }

    public render(): JSX.Element {
        return (
            <div>
                {this.renderTags()}
                {this.renderInput()}
            </div>
        );
    }

    private renderTags(): JSX.Element[] {
        return this.props.tags.map((tag) => {
            const isLongTag = tag.length > 20;
            const tagElem = (
                <Tag
                    closable={true}
                    key={tag}
                    onClose={this.handleClose.bind(this, tag)}
                >
                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                </Tag>
            );

            return isLongTag ? (
                <Tooltip title={tag} key={tag}>
                    {tagElem}
                </Tooltip>
            ) : (
                tagElem
            );
        });
    }

    private renderInput(): JSX.Element {
        if (this.state.inputVisible) {
            return (
                <Input
                    ref={this.saveInputRef}
                    type="text"
                    size="small"
                    style={{ width: 78 }}
                    value={this.state.inputValue}
                    onChange={this.handleInputChange}
                    onBlur={this.handleInputConfirm}
                    onPressEnter={this.handleInputConfirm}
                />
            );
        }

        return (
            <Tag
                onClick={this.showInput}
                style={{ background: "#fff", borderStyle: "dashed" }}
            >
                <Icon type="plus" /> New Tag
            </Tag>
        );
    }

    private handleClose(removedTag: string): void {
        const tags = this.props.tags.filter((tag) => tag !== removedTag);
        this.props.onChange(tags);
    }

    private showInput(): void {
        this.setState({ inputVisible: true }, () => this.input!.focus());
    }

    private handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({ inputValue: e.target.value });
    }

    private handleInputConfirm(): void {
        const { inputValue } = this.state;
        let { tags } = this.props;
        if (inputValue !== "" && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }

        this.setState({
            inputValue: "",
            inputVisible: false,
        });
        this.props.onChange(tags);
    }

    private saveInputRef(input: Input): void {
        this.input = input;
    }
}
