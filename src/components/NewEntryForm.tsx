// tslint:disable jsx-no-multiline-js
import { Button, Form, Icon, Input } from "antd";
import { FormComponentProps, WrappedFormUtils } from "antd/lib/form/Form";
import * as React from "react";

import { EditableTagGroup } from "./EditableTagGroup";

interface IFormProps extends FormComponentProps {
    onCreate(description: string, tags: string[], dueDate?: Date): void;
}

interface IDescriptionInputProps {
    getFieldDecorator: WrappedFormUtils["getFieldDecorator"];
}

interface ITagInputProps {
    form: WrappedFormUtils;
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
        <EditableTagGroup onChange={props.form.setFieldsValue} />,
    )}
    </>
);

class NewEntryFormContent extends React.PureComponent<IFormProps, {}> {

    constructor(props: IFormProps) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    public componentDidMount(): void {
        // To disabled submit button at the beginning (from antd doc).
        this.props.form.validateFields();
    }

    public render(): JSX.Element {
        const { getFieldDecorator, getFieldError, isFieldTouched } = this.props.form;
        const descrError = isFieldTouched("description")
            && getFieldError("description") !== undefined
            && getFieldError("description")!.length > 0;

        return (
            <Form layout="inline" onSubmit={this.onSubmit}>
                <Form.Item
                    help={/* tslint:disable strict-boolean-expressions */descrError ? getFieldError("description") : ""}
                    validateStatus={descrError ? "error" : ""}
                >
                    <DescriptionInput getFieldDecorator={getFieldDecorator} />
                </Form.Item>
                <Form.Item>
                    <TagInput form={this.props.form} />
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

    private onSubmit(e: React.FormEvent): void {
        e.preventDefault();
        this.props.form.validateFields((errors) => {
            if (!errors) {
                const descr = this.props.form.getFieldValue("description");
                const tags = this.props.form.getFieldValue("tags");
                this.props.onCreate(descr, tags);
                this.props.form.resetFields();
            }
        });
    }

}

export const NewEntryForm = Form.create<IFormProps>({ name: "new_entry_form" })(NewEntryFormContent);
