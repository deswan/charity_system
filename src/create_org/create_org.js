import '../bootstrap.js';
import ReactDOM from 'react-dom';
import registerServiceWorker from '../registerServiceWorker';
import React, { Component } from 'react';
import './create_org.less';
import CHeader from '../components/CHeader/CHeader';
import { Form, Icon, Input, Button, Checkbox, Layout, Tabs, DatePicker, Cascader, Upload, message, Radio,Select } from 'antd';
import { req } from '../helper'
const { Content, Sider } = Layout;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class CreateOrgForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAvatarUploading: false,
            avatarUrl: "",
            typeList: []
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
        req({
            url: '/api/getAllTags'
        }).then((data) => {
            this.setState({
                typeList: data
            })
        }).catch((err) => {
            message.error(err.message);
        })
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
            <Layout class="create-org">
                <CHeader />
                <Content className="login-content">
                    <div className="form-wrapper">
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem {...tailFormItemLayout}>
                                <span class="form-title">创建义工组织</span>
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
                                label="名称">
                                {getFieldDecorator('name', {
                                    rules: [
                                        { required: true, message: '请输入名称' },
                                        { max: 30, message: '不超过30个字符' },
                                    ]
                                })(
                                    <Input prefix={<Icon style={{ color: 'rgba(0,0,0,.25)' }} />} />
                                    )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="slogan">
                                {getFieldDecorator('gender', {
                                    rules: [
                                        { required: true, message: '请输入slogan' },
                                        { max: 50, message: '不超过50个字符' },
                                    ],
                                })(
                                    <Input prefix={<Icon style={{ color: 'rgba(0,0,0,.25)' }} />} />
                                    )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="组织类型">
                                {getFieldDecorator('tags', {
                                    rules: [{ required: true, message: '请选择组织类型' }]
                                })(
                                    <Select
                                        mode="tags"
                                        style={{ width: '70%' }}
                                    >
                                        {
                                            this.state.typeList.map(type => {
                                                return <Option key={type.id} value={type.id}>{type.name}</Option>
                                            })
                                        }
                                    </Select>
                                    )}
                            </FormItem>
                            <FormItem
                                {...tailFormItemLayout}
                            >
                                <Button type="primary" htmlType="submit"> 确认 </Button>
                            </FormItem>
                        </Form>
                    </div>
                </Content>
            </Layout >
        );
    }
}

const WrapperCreateOrgForm = Form.create()(CreateOrgForm);

ReactDOM.render(<WrapperCreateOrgForm />, document.getElementById('root'));