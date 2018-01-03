import React, { Component } from 'react';
import './volunteer_manage.less';
import { Button, Avatar, Row, Col, Form, Input, Radio, DatePicker, Tag, Badge, Table, Divider, Pagination, message } from 'antd';
import numeral from 'numeral';
import { activity_status } from '../../config';
import { req } from '../../helper';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;

class VolunteerManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            loading: false,
            form: {
                name: ''
            },
            data: [],
            pagination: {
                pageSize: 10,
                current: 1,
                total: 0,
                onChange: ((page) => {
                    let pagination = this.state.pagination;
                    pagination.current = page;
                    this.setState({ pagination });
                    setTimeout(this.getData.bind(this), 0);
                }),
            }
        }
    }
    handleOpen = (page) => {
        window.open('/' + page, '_self')
    }
    componentWillMount() {
        let path = window.location.href.slice(0, window.location.href.lastIndexOf('#'));
        let id = parseInt(path.slice(path.lastIndexOf('/') + 1));
        console.log(id)
        this.setState({ id }, this.getData)
    }
    handleSearch = () => {
        this.setState((state) => {
            state.pagination.current = 1;
            return state;
        }, this.getData)
    }
    handleReset = () => {
        this.props.form.setFieldsValue({
            name: ''
        })
        this.setState((state) => {
            state.pagination.current = 1;
            state.form = {
                name: ''
            }
            return state;
        }, this.getData)
    }
    getData = () => {
        let form = this.state.form;
        this.setState({
            loading: true
        })
        req({
            url: '/api/getVolList',
            params: {
                orgId: this.state.id,
                name: form.name
            }
        }).then((data) => {
            let pagination = this.state.pagination;
            pagination.total = data.total;
            this.setState({
                data: data.rows,
                pagination,
                loading: false
            })
        }).catch((err) => {
            message.error(err.message);
            this.setState({
                loading: false
            })
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form
                    className="search-form"
                    layout="inline"
                    onSubmit={this.handleSearch}
                    style={{ padding: '20px 0' }}
                >
                    <FormItem label="名称" >
                        {getFieldDecorator('name')(
                            <Input onChange={(e) => {
                                this.setState((state) => {
                                    state.form.name = this.props.form.getFieldValue('name');
                                    return state;
                                })
                            }} />
                        )}
                    </FormItem>
                    <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>重置</Button>
                </Form>
                <Table columns={[{
                    title: '姓名',
                    dataIndex: 'name',
                    render: text => <a href="#">{text}</a>,
                }, {
                    title: '年龄',
                    dataIndex: 'age',
                }, {
                    title: '性别',
                    dataIndex: 'gender',
                    render: gender => gender == 0 ? '男' : '女',
                }, {
                    title: '参与活动数',
                    dataIndex: 'act_count',
                }]} dataSource={this.state.data} pagination={this.state.pagination} />
            </div>
        );
    }
}
export default Form.create()(VolunteerManage)
