import '../bootstrap.js';
import ReactDOM from 'react-dom';
import registerServiceWorker from '../registerServiceWorker';
import React, { Component } from 'react';
import './create_sponsor.less';
import CHeader from '../components/CHeader/CHeader';
import { Form, Icon, Input, Button, Checkbox, Layout, Tabs, DatePicker, Cascader, Upload, message, Radio,InputNumber } from 'antd';
import { req } from '../helper'
const { Content, Sider } = Layout;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class CreateSponsorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAvatarUploading: false,
            avatarUrl: ""
        }
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
    componentWillMount() {

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
            <Layout class="create-sponsor">
                <CHeader />
                <Content className="login-content">
                    <div className="form-wrapper">
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem {...tailFormItemLayout}>
                                <span class="form-title">赞助活动</span>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="logo">
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
                                label="赞助者名称">
                                {getFieldDecorator('name', {
                                    rules: [
                                        { required: true, message: '请输入名称' },
                                        { max: 50, message: '不超过30个字符' },
                                    ]
                                })(
                                    <Input prefix={<Icon type="suer" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                                    )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="手机号">
                                {getFieldDecorator('phone', {
                                    rules: [
                                        { required: true, message: '请输入手机号' },
                                        { max: 30, message: '不超过30个字符' },
                                    ]
                                })(
                                    <Input prefix={<Icon style={{ color: 'rgba(0,0,0,.25)' }} />} />
                                    )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="赞助金额">
                                {getFieldDecorator('amount', {
                                    rules: [
                                        { required: true, message: '请输入赞助金额' }
                                    ]
                                })(
                                    <InputNumber min={1} />
                                    )}
                            </FormItem>
                            <FormItem
                                {...tailFormItemLayout}
                            >
                                <Button type="primary" htmlType="submit"> 提交 </Button>
                            </FormItem>
                        </Form>
                    </div>
                </Content>
            </Layout >
        );
    }
}

const WrapperCreateSponsorForm = Form.create()(CreateSponsorForm);

ReactDOM.render(<WrapperCreateSponsorForm />, document.getElementById('root'));