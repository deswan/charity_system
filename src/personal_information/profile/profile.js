import React, { Component } from 'react';
import './profile.less';
import { Avatar, Form, Input, Button, Icon, Popover, DatePicker, AutoComplete } from 'antd';
import DescriptionList from 'ant-design-pro/lib/DescriptionList';
import moment from 'moment';
const { Description } = DescriptionList;
const FormItem = Form.Item;

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: '大叔的哈苏',
                isEdit: false
            },
            creditCard: {
                value: '12345897438',
                isEdit: false
            },
            birthday: {
                value: '1996-10-16',
                isEdit: false
            },
            origin: {
                value: '广东广州',
                isEdit: false
            },
            phone: {
                value: '18565352229',
                isEdit: false
            },
            email: {
                value: '18565352229@163.com',
                isEdit: false
            },
            resume: '',
            avatar: require('../../img/img.jpg'),
            emailSuffix:['@163.com','@gmail.com'],
            emailDataSource:[]
        }
    }
    handleOpen = (page) => {
        window.open('/' + page + '.html', '_self')
    }
    handleSubmitField = (fieldId) => {
        console.log('submit:', fieldId)

    }
    handleCloseField = (fieldId) => {
        console.log('close:', fieldId)
    }
    handleEmailComplete = (value)=>{
        this.setState({
            emailDataSource:!value ? [] : [
                value,
                ...this.state.emailSuffix.map(item=>{
                    return value+item;
                })
            ]
        }) 
    }
    handleEdit = (fieldId)=>{
        const {setFieldsValue} = this.props.form;
        setFieldsValue({
            [fieldId]:this.state[fieldId].value
        })
        this.setState((prevState, props) => {
            prevState[fieldId].isEdit = true;
            return prevState;
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
        };
        return (
            <div className="c-profile">
                <div className="head">
                    <Avatar src={this.state.avatar} size="large" className="head-avatar" />
                </div>
                <div className="body">
                    <Form onSubmit={this.handleSubmit}>
                        <DescriptionList size="large" col={2} layout="vertical">
                            <Description term="姓名">
                                {this.state.name.value}
                                <Popover
                                    content={
                                        <div>
                                            <FormItem
                                                className="edit-form-item"
                                                {...formItemLayout}
                                            >
                                                {getFieldDecorator('name', {
                                                    rules: [{ max: 20, message: '不超过20个字符' }, { required: true, message: '不能为空' }],
                                                })(
                                                    <Input />
                                                    )}
                                            </FormItem>
                                            <div style={{ textAlign: 'right' }}>
                                                <Button size="small" onClick={this.handleCloseField.bind(this, 'name')}>取消</Button>
                                                <Button onClick={this.handleSubmitField.bind(this, 'name')} class="edit-confirm-btn" type="primary" size="small">确定</Button>
                                            </div>
                                        </div>
                                    }
                                    title="姓名"
                                    visible={this.state.name.isEdit}
                                >
                                    <a className="edit-btn" onClick={this.handleEdit.bind(this,'name')}><Icon type="edit" /></a>
                                </Popover>
                            </Description>
                            <Description term="身份证号码">
                                {this.state.creditCard.value}
                                <Popover
                                    content={
                                        <div>
                                            <FormItem
                                                className="edit-form-item"
                                                {...formItemLayout}
                                            >
                                                {getFieldDecorator('creditCard', {
                                                    rules: [{ max: 30, message: '不超过20个字符' }, { required: true, message: '不能为空' }],
                                                })(
                                                    <Input />
                                                    )}
                                            </FormItem>
                                            <div style={{ textAlign: 'right' }}>
                                                <Button size="small" onClick={this.handleCloseField.bind(this, 'creditCard')}>取消</Button>
                                                <Button onClick={this.handleSubmitField.bind(this, 'creditCard')} class="edit-confirm-btn" type="primary" size="small">确定</Button>
                                            </div>
                                        </div>
                                    }
                                    title="身份证号码"
                                    visible={this.state.creditCard.isEdit}
                                >
                                    <a className="edit-btn" onClick={() => {
                                        this.setState((prevState, props) => {
                                            prevState.creditCard.isEdit = true;
                                            return prevState;
                                        })
                                    }}><Icon type="edit" /></a>
                                </Popover>
                            </Description>
                            <Description term="出生日期">
                                {this.state.birthday.value}
                                <Popover
                                    content={
                                        <div>
                                            <FormItem
                                                className="edit-form-item"
                                                {...formItemLayout}
                                            >
                                                {getFieldDecorator('birthday', {
                                                    rules: [{ required: true, message: '不能为空' }],
                                                })(
                                                    <DatePicker />
                                                    )}
                                            </FormItem>
                                            <div style={{ textAlign: 'right' }}>
                                                <Button size="small" onClick={this.handleCloseField.bind(this, 'birthday')}>取消</Button>
                                                <Button onClick={this.handleSubmitField.bind(this, 'birthday')} className="edit-confirm-btn" type="primary" size="small">确定</Button>
                                            </div>
                                        </div>
                                    }
                                    title="身份证号码"
                                    visible={this.state.birthday.isEdit}
                                >
                                    <a className="edit-btn" onClick={() => {
                                        this.setState((prevState, props) => {
                                            prevState.birthday.isEdit = true;
                                            return prevState;
                                        })
                                    }}><Icon type="edit" /></a>
                                </Popover>
                            </Description>
                            <Description term="籍贯">
                                {this.state.origin.value}
                                <Popover
                                    content={
                                        <div>
                                            <FormItem
                                                className="edit-form-item"
                                                {...formItemLayout}
                                            >
                                                {getFieldDecorator('origin', {
                                                    rules: [{ required: true, message: '不能为空' }],
                                                })(
                                                    <DatePicker />
                                                    )}
                                            </FormItem>
                                            <div style={{ textAlign: 'right' }}>
                                                <Button size="small" onClick={this.handleCloseField.bind(this, 'origin')}>取消</Button>
                                                <Button onClick={this.handleSubmitField.bind(this, 'origin')} className="edit-confirm-btn" type="primary" size="small">确定</Button>
                                            </div>
                                        </div>
                                    }
                                    title="籍贯"
                                    visible={this.state.origin.isEdit}
                                >
                                    <a className="edit-btn" onClick={() => {
                                        this.setState((prevState, props) => {
                                            prevState.origin.isEdit = true;
                                            return prevState;
                                        })
                                    }}><Icon type="edit" /></a>
                                </Popover>
                            </Description>
                            <Description term="手机号">
                                {this.state.phone.value}
                                <Popover
                                    content={
                                        <div>
                                            <FormItem
                                                className="edit-form-item"
                                                {...formItemLayout}
                                            >
                                                {getFieldDecorator('creditCard', {
                                                    rules: [{ max: 20, message: '不超过20个字符' }, { required: true, message: '不能为空' }],
                                                })(
                                                    <Input />
                                                    )}
                                            </FormItem>
                                            <div style={{ textAlign: 'right' }}>
                                                <Button size="small" onClick={this.handleCloseField.bind(this, 'phone')}>取消</Button>
                                                <Button onClick={this.handleSubmitField.bind(this, 'phone')} className="edit-confirm-btn" type="primary" size="small">确定</Button>
                                            </div>
                                        </div>
                                    }
                                    title="手机号"
                                    visible={this.state.phone.isEdit}
                                >
                                    <a className="edit-btn" onClick={() => {
                                        this.setState((prevState, props) => {
                                            prevState.phone.isEdit = true;
                                            return prevState;
                                        })
                                    }}><Icon type="edit" /></a>
                                </Popover>
                            </Description>
                            <Description term="邮箱">
                                {this.state.email.value}
                                <Popover
                                    content={
                                        <div>
                                            <FormItem
                                                className="edit-form-item"
                                                {...formItemLayout}
                                            >
                                                {getFieldDecorator('email', {
                                                    rules: [{ required: true, message: '不能为空' }],
                                                })(
                                                    <AutoComplete
                                                        dataSource={this.state.emailDataSource}
                                                        onSearch={this.handleEmailComplete}
                                                    />
                                                    )}
                                            </FormItem>
                                            <div style={{ textAlign: 'right' }}>
                                                <Button size="small" onClick={this.handleCloseField.bind(this, 'email')}>取消</Button>
                                                <Button onClick={this.handleSubmitField.bind(this, 'email')} className="edit-confirm-btn" type="primary" size="small">确定</Button>
                                            </div>
                                        </div>
                                    }
                                    title="手机号"
                                    visible={this.state.email.isEdit}
                                >
                                    <a className="edit-btn" onClick={() => {
                                        this.setState((prevState, props) => {
                                            prevState.email.isEdit = true;
                                            return prevState;
                                        })
                                    }}><Icon type="edit" /></a>
                                </Popover>
                            </Description>
                        </DescriptionList>
                    </Form>
                </div>
            </div>
        );
    }
}
const WrappedProfile = Form.create()(Profile);
export default WrappedProfile;