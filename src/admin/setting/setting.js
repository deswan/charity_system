import React, { Component } from 'react';
import './setting.less';
import { Button, Avatar, Row, Col, Form, Input, DatePicker, Upload, InputNumber, Select, message, Icon, Tag } from 'antd';
import { req } from '../../helper';
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;

class Setting extends Component {
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
            ],
            name: {
                value: 123,
                isEdit: false
            },
            slogan: {
                value: 123,
                isEdit: false
            },
            tags: {
                value: [],
                isEdit: false
            }
        }
    }
    handleOpen = (page) => {
        window.open('/' + page, '_self')
    }
    componentWillMount() {
        let path = window.location.href.slice(0, window.location.href.lastIndexOf('#'));
        let id = parseInt(path.slice(path.lastIndexOf('/') + 1));
        this.setState({ id }, this.getData)
    }
    getData = ()=>{
        req({
            url: '/api/getOrgProfileById',
            params: {
                orgId: this.state.id,
            }
        }).then((data) => {
            this.setState(state=>{
                state.avatarUrl = data.logo;
                state.name.value = data.name;
                state.slogan.value = data.slogan;
                state.tags.value = data.tags;
                return state;
            })
        }).catch((err) => {
            message.error(err.message);
        })
    }
    beforeUpload = (file)=>{
        this.setState({
            isAvatarUploading:true
        })
      }
    handleUploadChange = ({ file, fileList, event }) => {
        if (file.status == 'done') {
            message.success('上传成功');
            this.setState({
                avatarUrl:file.response,
                isAvatarUploading:false
            })
        } else if (file.status == 'error') {
            message.error('上传失败');
            this.setState({
                isAvatarUploading:false
            })
        }
    }
    handleEdit = (field) => {
        this.setState((prev) => {
            prev[field].isEdit = true
            return prev;
        })
    }
    handleCommit = (field) => {
        this.props.form.validateFields([field],(err,values)=>{
            if(err) return;
            console.log(values);
            req({
                url: '/api/updateOrgProfile?orgId='+this.state.id,
                type:'post',
                params: {
                    [field]:values[field]
                }
            }).then((data) => {
                this.setState(state=>{
                    state[field].value = values[field];
                    state[field].isEdit = false
                    return state;
                })
            }).catch((err) => {
                message.error(err.message);
            })

        })
    }
    handleCancel = (field) => {
        this.setState((prev) => {
            prev[field].isEdit = false
            return prev;
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
            <div>
                <Form style={{ margin: '20px 50px' }} hideRequiredMark>
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
                        label="组织名称">
                        {this.state.name.isEdit ?
                            (
                                <span>
                                    {getFieldDecorator('name', {
                                        rules: [
                                            { required: true, message: '请输入组织名称' },
                                            { max: 30, message: '不超过30个字符' }
                                        ],
                                        initialValue: this.state.name.value
                                    })(
                                        <Input style={{ width: '50%' }} />
                                        )}
                                    < a className="edit-commit-btn" onClick={this.handleCommit.bind(this, 'name')}>确定</a>
                                    < a className="edit-commit-btn" onClick={this.handleCancel.bind(this, 'name')}>取消</a>
                                </span>
                            ) :
                            (
                                <span>
                                    {this.state.name.value}
                                    < a className="edit-btn" onClick={this.handleEdit.bind(this, 'name')}><Icon type="edit" /></a>
                                </span>
                            )

                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="slogan">
                        {this.state.slogan.isEdit ?
                            (
                                <span>
                                    {getFieldDecorator('slogan', {
                                        rules: [
                                            { required: true, message: '请输入slogan' },
                                            { max: 50, message: '不超过50个字符' }
                                        ],
                                        initialValue: this.state.slogan.value
                                    })(
                                        <Input style={{ width: '50%' }} />
                                        )}
                                    < a className="edit-commit-btn" onClick={this.handleCommit.bind(this, 'slogan')}>确定</a>
                                    < a className="edit-commit-btn" onClick={this.handleCancel.bind(this, 'slogan')}>取消</a>
                                </span>
                            ) : (
                                <span>
                                    {this.state.slogan.value}
                                    < a className="edit-btn" onClick={this.handleEdit.bind(this, 'slogan')}><Icon type="edit" /></a>
                                </span>
                            )
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="组织类型">
                        {this.state.tags.isEdit ?
                            (
                                <span>
                                    {getFieldDecorator('tags', {
                                        rules: [{ required: true, message: '请选择组织类型' }],
                                        initialValue: this.state.tags.value.map(tag=>{
                                            return tag.id
                                        }).join(',')
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
                                    < a className="edit-commit-btn" onClick={this.handleCommit.bind(this, 'tags')}>确定</a>
                                    < a className="edit-commit-btn" onClick={this.handleCancel.bind(this, 'tags')}>取消</a>
                                </span>
                            ) :
                            (
                                <span>
                                    {this.state.tags.value.map(item => {
                                        return <Tag color="cyan" key={item.tagId}>{item.tagName}</Tag>
                                    })}
                                    <a className="edit-btn" onClick={this.handleEdit.bind(this, 'tags')}><Icon type="edit" /></a>
                                </span>
                            )
                        }
                    </FormItem>
                </Form>
            </div >
        );
    }
}
export default Form.create()(Setting)
