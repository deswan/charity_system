import React, { Component } from 'react';
import './activity_manage.less';
import { Button, Avatar, Row, Col, Form, Input, Radio, DatePicker, Tag, Badge, Table, Divider, Pagination } from 'antd';
import numeral from 'numeral';
import { activity_status } from '../../config';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;


class ActivityManage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    handleOpen = (page) => {
        window.open('/' + page, '_self')
    }
    componentWillMount() {
        // fetch('/api/').then((res)=>{
        //   console.log(res)
        // })
    }
    handleSearch = () => {

    }
    handleReset = () => {

    }
    onStatusChange = () => {

    }
    onDateChange = () => {

    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const data = [{
            id: '1',
            name: 'John Brown',
            create_time: 'John Brown',
            start_time: 'John start_time',
            end_time: 'John end_time',
            location: 'John location',
            tags: [
                {
                    id: 1,
                    name: 'tag1'
                }
            ],
            recruit_number: 111,
            recipient_number: 222,
            score_count: 333,
            status: 0,
            sponsor_count: 123
        }];
        return (
            <div>
                <Form
                    className="search-form"
                    layout="inline"
                    onSubmit={this.handleSearch}
                >
                    <Row gutter={48}>
                        <Col span={10}>
                            <FormItem label="名称" >
                                {getFieldDecorator('name')(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={10}>
                            <FormItem label="日期" >
                                {getFieldDecorator('date')(
                                    <RangePicker onChange={this.onDateChange} />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={4}>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>重置</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="状态"
                            >
                                {getFieldDecorator('status', {
                                    initialValue: '0'
                                })(
                                    <RadioGroup onChange={this.onStatusChange}>
                                        {
                                            Object.keys(activity_status).map(key => {
                                                return (
                                                    <Radio value={key}>{activity_status[key].text}</Radio>
                                                )
                                            })
                                        }
                                    </RadioGroup>
                                    )}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
                <Table columns={[{
                    title: '活动名称',
                    dataIndex: 'name',
                    render: text => <a href="#">{text}</a>,
                }, {
                    title: '创建时间',
                    dataIndex: 'create_time',
                }, {
                    title: '开始时间',
                    dataIndex: 'start_time',
                }, {
                    title: '结束时间',
                    dataIndex: 'end_time',
                }, {
                    title: '活动地点',
                    dataIndex: 'location',
                }, {
                    title: '类型',
                    dataIndex: 'tags',
                    render: tags => {
                        return tags.map(item => {
                            return <Tag color="cyan" key={item.id}>{item.name}</Tag>
                        })
                    }
                }, {
                    title: '已招募义工数',
                    dataIndex: 'recruit_number'
                }, {
                    title: '受助人数',
                    dataIndex: 'recipient_number'
                }, {
                    title: '赞助金额',
                    dataIndex: 'sponsor_count'
                }, {
                    title: '评价数',
                    dataIndex: 'score_count'
                }, {
                    title: '状态',
                    dataIndex: 'status',
                    render: status => <Badge style={{ marginLeft: '20px' }} status={activity_status[status].badge} text={activity_status[status].text} />
                }, {
                    title: '操作',
                    key: 'action',
                    render: (text, record) => (
                        <span>
                            <a href="#">编辑</a>
                            <Divider type="vertical" />
                            <a href="#">取消活动</a>
                        </span>
                    ),
                }]} dataSource={data} pagination={
                    <Pagination defaultCurrent={6} total={500} />
                } />
            </div>
        );
    }
}
export default Form.create()(ActivityManage)
