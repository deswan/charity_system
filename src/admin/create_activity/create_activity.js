import React, { Component } from 'react';
import './create_activity.less';
import { Button, Avatar, Row, Col, Form, Input, DatePicker, Upload, InputNumber, Select, message, Icon } from 'antd';
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;

class CreateActivity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAvatarUploading: false,
            avatarUrl: "",
            typeList: [
                {
                    id: 1,
                    name: 'tag1'
                }
            ]
        }
    }
    handleOpen = (page) => {
        window.open('/' + page, '_self')
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
            }
        });
    }
    handleUploadChange = ({ file, fileList, event }) => {
        if (file.status == 'done') {
            message.success('上传成功');

        } else if (file.status == 'error') {
            message.error('上传失败');
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                sm: { span: 4 },
            },
            wrapperCol: {
                sm: { span: 20 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                sm: {
                    span: 8,
                    offset: 4,
                },
            },
        };
        const uploadButton = (
            <div>
                <Icon type={this.state.isAvatarUploading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">上传</div>
            </div>
        );
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label="头像">
                        {getFieldDecorator('avatar', {})(
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="/api/uploadPhoto"
                                onChange={this.handleUploadChange}
                            >
                                {this.state.avatarUrl ? <img src={this.state.avatarUrl} alt="" /> : uploadButton}
                            </Upload>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="活动名称">
                        {getFieldDecorator('name', {
                            rules: [
                                { required: true, message: '请输入活动名称' },
                                { max: 30, message: '不超过30个字符' },
                            ]
                        })(
                            <Input />
                            )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="开始-结束时间">
                        {getFieldDecorator('date', {
                            rules: [{ required: true,message:'请填写开始-结束时间' }]
                        })(
                            <RangePicker />
                            )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="活动地点">
                        {getFieldDecorator('location', {
                            rules: [
                                { required: true ,message:'请填写活动地点'},
                                { max: 50, message: '不超过50个字符' },
                            ],
                        })(
                            <Input prefix={<Icon type="environment-o" />} />
                            )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="活动类型">
                        {getFieldDecorator('tags', {
                            rules: [{ required: true ,message:'请填写活动类型'}]
                        })(
                            <Select
                                mode="tags"
                                // style={{ width: '100%' }}
                                placeholder="请选择类型"
                            >
                                {
                                    this.state.typeList.map(type => {
                                        return <Option key={type.id}>{type.name}</Option>
                                    })
                                }
                            </Select>
                            )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="受助人数">
                        {getFieldDecorator('recipient_number', {
                            rules: [{ required: true,message:'请填写受助人数' }]
                        })(
                            <InputNumber min={1} />
                            )}
                    </FormItem>
                    <FormItem
                        {...tailFormItemLayout}
                    >
                        <Button type="primary" htmlType="submit"> 创建活动 </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}
export default Form.create()(CreateActivity)
