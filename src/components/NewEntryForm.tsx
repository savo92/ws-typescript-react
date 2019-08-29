// tslint:disable jsx-no-multiline-js
import { Button, Form, Icon, Input } from "antd";
// You can also import from package internal files
import { FormComponentProps, WrappedFormUtils } from "antd/lib/form/Form";
import * as React from "react";

import { EditableTagGroup } from "./EditableTagGroup";

// An interface can extend another one.
interface IFormProps extends FormComponentProps {
    // Here you can see how to declare a callable, just add params into the parenthesis and the return at the end
    // In this case, onCreate accepts 2 required params (description and tags) and an optional param dueDate.
    // onCreate doesn't have a return.
    onCreate(description: string, tags: string[], dueDate?: Date): void;
}

interface IState {
    tags: string[];
}

interface IDescriptionInputProps {
    // The form WrappedFormUtils["getFieldDecorator"] is needed here
    // because WrappedFormUtils is a type, not a namespace.
    getFieldDecorator: WrappedFormUtils["getFieldDecorator"];
}

interface ITagInputProps {
    form: WrappedFormUtils;
    tags: string[];
    onTagsChange(tags: string[]): void;
}

const DescriptionInput = (props: IDescriptionInputProps): JSX.Element => (
    <>
        {props.getFieldDecorator("description", {
            rules: [{ required: true, message: "Please input a description!" }],
        })(
            <Input
                autoComplete={"off"}
                prefix={<Icon type="form" />}
                placeholder="Write here..."
            />,
        )}
    </>
);

const TagInput = (props: ITagInputProps): JSX.Element => (
    <>
        {props.form.getFieldDecorator("tags")(
            <EditableTagGroup
                onChange={props.onTagsChange}
                tags={props.tags}
            />,
        )}
    </>
);

class NewEntryFormContent extends React.PureComponent<IFormProps, IState> {
    constructor(props: IFormProps) {
        super(props);

        this.state = { tags: [] };

        this.onSubmit = this.onSubmit.bind(this);
        this.onTagsChange = this.onTagsChange.bind(this);
    }

    public componentDidMount(): void {
        // To disabled submit button at the beginning (from antd doc).
        this.props.form.validateFields();
    }

    public render(): JSX.Element {
        const {
            getFieldDecorator,
            getFieldError,
            isFieldTouched,
        } = this.props.form;
        const descrError =
            isFieldTouched("description") &&
            getFieldError("description") !== undefined &&
            getFieldError("description")!.length > 0;

        return (
            <Form layout="inline" onSubmit={this.onSubmit}>
                <Form.Item
                    help={
                        /* tslint:disable strict-boolean-expressions */ descrError
                            ? getFieldError("description")
                            : ""
                    }
                    validateStatus={descrError ? "error" : ""}
                >
                    <DescriptionInput getFieldDecorator={getFieldDecorator} />
                </Form.Item>
                <Form.Item>
                    <TagInput
                        form={this.props.form}
                        tags={this.state.tags}
                        onTagsChange={this.onTagsChange}
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        disabled={descrError}
                        icon="rocket"
                        shape="circle"
                        type="primary"
                        htmlType="submit"
                    />
                </Form.Item>
            </Form>
        );
    }

    private onSubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        this.props.form.validateFields((errors) => {
            if (!errors) {
                const descr: string = this.props.form.getFieldValue(
                    "description",
                );
                const tags:
                    | string[]
                    | undefined = this.props.form.getFieldValue("tags");

                this.props.onCreate(descr, tags !== undefined ? tags : []);
                this.props.form.resetFields();
                this.setState({ tags: [] });
            }
        });
    }

    private onTagsChange(tags: string[]): void {
        this.setState({ tags });
        this.props.form.setFieldsValue(tags);
    }
}

// Form.create accepts a type variable that we provide here inside as <IFormProps>.
// This allows Form.create to capture the type the we provided and use it as props for the NewEntryFormContent,
// which it's wrapping inside NewEntryForm.
// This allows TypeScript to know the props it accepts and that providing `onCreate` is valid.
// For more details, see https://www.typescriptlang.org/docs/handbook/generics.html#hello-world-of-generics.
export const NewEntryForm = Form.create<IFormProps>({ name: "new_entry_form" })(
    NewEntryFormContent,
);
