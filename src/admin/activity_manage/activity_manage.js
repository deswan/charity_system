import React, { Component } from 'react';
import './activity_manage.less';
import { Button, Avatar, Row, Col, Form, Input, Radio, DatePicker, Tag, Badge, Table, Divider, Pagination, message, Select,Modal } from 'antd';
import numeral from 'numeral';
import { activity_status } from '../../config';
import DescriptionList from 'ant-design-pro/lib/DescriptionList';
import { req } from '../../helper';
const { Description } = DescriptionList;
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const confirm = Modal.confirm;


class ActivityManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            loading: false,
            form: {
                name: '',
                startTime: '',
                endTime: '',
                status: -1
            },
            activities: [],
            pagination: {
                pageSize: 10,
                current: 1,
                total: 0,
                onChange: ((page) => {
                    let pagination = this.state.pagination;
                    pagination.current = page;
                    this.setState({ pagination });
                    setTimeout(this.getActData.bind(this), 0);
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
        this.setState({ id }, this.getActData)
    }
    getActData = () => {
        let form = this.state.form;
        this.setState({
            loading: true
        })
        req({
            url: '/api/getActListBelongToOrg',
            params: {
                orgId: this.state.id,
                startTime: form.startTime,
                endTime: form.endTime,
                name: form.name,
                status: form.status,
                page: this.state.pagination.current
            }
        }).then((data) => {
            let pagination = this.state.pagination;
            pagination.total = data.total;
            this.setState({
                activities: data.rows,
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
    handleSearch = () => {
        this.setState((state) => {
            state.pagination.current = 1;
            return state;
        }, this.getActData)
    }
    handleReset = () => {
        this.props.form.setFieldsValue({
            name: '',
            date: '',
            status: -1
        })
        this.setState((state) => {
            state.pagination.current = 1;
            state.form = {
                name: '',
                startTime: '',
                endTime: '',
                status: -1
            }
            return state;
        }, this.getActData)
    }
    onStatusChange = (val) => {
        this.setState((state) => {
            state.form.status = val;
            return state;
        }, this.getActData);
    }
    handleEditAct = (row)=>{
        this.props.history.push('/activity-detail/'+row.id)
    }
    handleCancelAct = (row)=>{
        let me = this;
        confirm({
            title: `确定取消活动 ${row.name} ?`,
            onOk() {
                req({
                    url: '/api/cancelAct',
                    type:'post',
                    params: { actId:row.id }
                }).then((data) => {
                    message.success('取消活动成功');
                    me.getActData();
                }).catch((err) => {
                    message.error(err.message)
                })
            }
        });
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
                    <FormItem label="日期" >
                        {getFieldDecorator('date')(
                            <RangePicker onChange={($, [date1, date2]) => {
                                this.setState((state) => {
                                    state.form.startTime = date1;
                                    state.form.endTime = date2;
                                    return state;
                                })
                            }} />
                        )}
                    </FormItem>
                    <Button style={{ marginLeft: 8 }} onClick={this.handleSearch} type="primary">查询</Button>
                    <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>重置</Button>
                    <div>
                        <FormItem label="状态"
                        >
                            {getFieldDecorator('status', {
                                initialValue: -1
                            })(
                                <Select style={{ width: 120 }} onChange={this.onStatusChange}>
                                    <Option value={-1}>全部</Option>
                                    {Object.keys(activity_status).map(key => {
                                        return (
                                            <Option value={key} key={key}>{activity_status[key].text}</Option>
                                        )
                                    })}
                                </Select>
                                )}
                        </FormItem>
                    </div>
                </Form>
                <Table loading={this.state.loading} rowKey="id" columns={[{
                    title: '活动名称',
                    width: '150px',
                    dataIndex: 'name',
                    render: text => <a href="#">{text}</a>,
                }, {
                    title: '开始时间',
                    width: '120px',
                    dataIndex: 'start_time',
                }, {
                    title: '结束时间',
                    width: '120px',
                    dataIndex: 'end_time',
                }, {
                    title: '活动地点',
                    width: '120px',
                    dataIndex: 'location',
                }, {
                    title: '义工数',
                    width: '100px',
                    dataIndex: 'vol_count'
                }, {
                    title: '状态',
                    width: '100px',
                    dataIndex: 'status',
                    render: status => <Badge style={{ marginLeft: '20px' }} status={activity_status[status].badge} text={activity_status[status].text} />
                }, {
                    title: '操作',
                    key: 'action',
                    width: '150px',
                    render: (text, record) => (
                        <span>
                            <Button size="small" onClick={this.handleEditAct.bind(this,record)}  >查看</Button>
                            <Divider type="vertical" />
                            <Button disabled={record.status != 0 && record.status != 1 && record.status != 2}  size="small" onClick={this.handleCancelAct.bind(this,record)} >取消活动</Button>
                        </span>
                    ),
                }]} dataSource={this.state.activities}
                    expandedRowRender={record => <div style={{ margin: 0 }}>
                        <DescriptionList size="small">
                            <Description term="创建时间">{record.create_time}</Description>
                            <Description term="受助人数">{record.recipient_number}</Description>
                            <Description term="赞助金额">{record.sponsor_amount}</Description>
                            <Description term="评价数">{record.score_count}</Description>
                            <Description term="类型">{
                                record.tags.map(item => {
                                    return <Tag color="cyan" key={item.tagId}>{item.tagName}</Tag>
                                })
                            }</Description>
                        </DescriptionList>
                    </div>}
                    pagination={this.state.pagination} />
            </div>
        );
    }
}
export default Form.create()(ActivityManage)
