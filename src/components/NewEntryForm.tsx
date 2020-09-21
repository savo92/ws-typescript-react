import { Button, Input, Form } from "antd";
import { FormInstance } from "antd/lib/form/Form";
import { FormOutlined, RocketOutlined } from "@ant-design/icons";
import * as React from "react";

import { EditableTagGroup } from "./EditableTagGroup";

// An interface can extend another one.
interface IFormProps {
    // Here you can see how to declare a callable, just add params into the parenthesis and the return at the end
    // In this case, onCreate accepts 2 required params (description and tags) and an optional param dueDate.
    // onCreate doesn't have a return.
    onCreate(description: string, tags: string[], dueDate?: Date): void;
}

interface IState {
    tags: string[];
}

interface IFormValues {
    description: string;
    tags: string[] | undefined;
}

export class NewEntryForm extends React.PureComponent<IFormProps, IState> {
    private formRef = React.createRef<FormInstance>();

    public constructor(props: IFormProps) {
        super(props);

        this.state = { tags: [] };

        this.onFinish = this.onFinish.bind(this);
        this.onTagsChange = this.onTagsChange.bind(this);
    }

    public render(): JSX.Element {
        return (
            <Form
                layout="inline"
                onFinish={this.onFinish}
                ref={this.formRef}
            >
                <Form.Item
                    name="description"
                    rules={[{required: true, message: "Please provide a description"}]}
                >
                    <Input
                        autoComplete={"off"}
                        prefix={<FormOutlined />}
                        placeholder="Write here..."
                    />
                </Form.Item>
                <Form.Item
                    name="tags"
                >
                    <EditableTagGroup
                        onChange={this.onTagsChange}
                        tags={this.state.tags}
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        icon={<RocketOutlined />}
                        shape="circle"
                        type="primary"
                        htmlType="submit"
                    />
                </Form.Item>
            </Form>
        );
    }

    private onFinish(values: IFormValues): void {
        this.props.onCreate(values.description, values.tags !== undefined ? values.tags : []);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.formRef.current!.resetFields();
        this.setState({ tags: [] });
    }

    private onTagsChange(tags: string[]): void {
        this.setState({ tags });
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.formRef.current!.setFieldsValue(tags);
    }
}
