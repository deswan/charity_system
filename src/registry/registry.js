import '../bootstrap.js';
import ReactDOM from 'react-dom';
import registerServiceWorker from '../registerServiceWorker';
import React, { Component } from 'react';
import './registry.less';
import CHeader from '../components/CHeader/CHeader';
import { Form, Icon, Input, Button, Checkbox, Layout, Tabs, DatePicker, Cascader, Upload, message,Radio } from 'antd';
const { Content, Sider } = Layout;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;


class RegistryForm extends React.Component {
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
        const options = [{
            value: 'zhejiang',
            label: 'Zhejiang',
            children: [{
                value: 'hangzhou',
                label: 'Hangzhou'
            }],
        }, {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [{
                value: 'nanjing',
                label: 'Nanjing'
            }],
        }];
        const uploadButton = (
            <div>
                <Icon type={this.state.isAvatarUploading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">上传</div>
            </div>
        );
        const confirmPasswordValidator = (rule, value, callback) => {
            if (this.props.form.getFieldValue('password') === value) {
                callback();
            } else {
                callback(new Error('确认密码与密码不一致'));
            }
        }
        return (
            <Layout class="registry">
                <CHeader />
                <Content className="login-content">
                    <div className="form-wrapper">
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem {...tailFormItemLayout}>
                                <span class="form-title">注册成为义工</span>
                            </FormItem>
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
                                label="姓名">
                                {getFieldDecorator('name', {
                                    rules: [
                                        { required: true, message: '请输入真实姓名' },
                                        { max: 30, message: '不超过30个字符' },
                                    ]
                                })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                                    )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="姓别">
                                {getFieldDecorator('gender', {
                                    rules: [
                                        { required: true }
                                    ],
                                    initialValue:0
                                })(
                                    <RadioGroup>
                                        <Radio value={0}>男</Radio>
                                        <Radio value={1}>女</Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="身份证"
                            >
                                {getFieldDecorator('id_card', {
                                    rules: [
                                        { required: true, message: '请输入身份证' },
                                        { max: 30, message: '不超过30个字符' }
                                    ],
                                })(
                                    <Input prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                                    )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="出生日期"
                            >
                                {getFieldDecorator('birthday', {
                                    rules: [
                                        { required: true, message: '请选择出生日期' },
                                    ],
                                })(
                                    <DatePicker />
                                    )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="籍贯"
                            >
                                {getFieldDecorator('native', {
                                    rules: [
                                        { required: true, message: '请选择籍贯' },
                                    ],
                                })(
                                    <Cascader options={options} />
                                    )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="手机号"
                            >
                                {getFieldDecorator('phone', {
                                    rules: [
                                        { required: true, message: '请输入手机号' },
                                        { max: 20, message: '不超过20个字符' },
                                    ],
                                })(
                                    <Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                                    )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="邮箱"
                            >
                                {getFieldDecorator('email', {
                                    rules: [
                                        { required: true, message: '请输入邮箱' },
                                        { type: 'email', message: '请输入正确的邮箱格式' },
                                    ],
                                    validateTrigger: 'onBlur'
                                })(
                                    <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                                    )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="密码"
                            >
                                {getFieldDecorator('password', {
                                    rules: [
                                        { required: true, message: '请输入密码' },
                                        { max: 50, message: '不超过50个字符' },
                                        { min: 6, message: '需大于50个字符' }
                                    ],
                                    validateTrigger:'onBlur'
                                })(
                                    <Input type="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                                    )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="确认密码"
                            >
                                {getFieldDecorator('confirm_password', {
                                    rules: [
                                        { required: true, message: '请输入确认密码' },
                                        { validator: confirmPasswordValidator }
                                    ],
                                    validateTrigger: 'onBlur'
                                })(
                                    <Input type="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                                    )}
                            </FormItem>
                            <FormItem
                                {...tailFormItemLayout}
                            >
                                <Button type="primary" htmlType="submit"> 注册 </Button>
                            </FormItem>
                        </Form>
                    </div>
                </Content>
            </Layout >
        );
    }
}

const WrapperRegistryForm = Form.create()(RegistryForm);

ReactDOM.render(<WrapperRegistryForm />, document.getElementById('root'));