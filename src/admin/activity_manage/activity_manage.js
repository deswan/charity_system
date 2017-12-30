import React, { Component } from 'react';
import './activity_manage.less';
import { Button, Avatar, Row, Col, Form, Input, Radio, DatePicker, Tag, Badge, Table, Divider, Pagination } from 'antd';
import numeral from 'numeral';
import { activity_status } from '../../config';
import DescriptionList from 'ant-design-pro/lib/DescriptionList';
const { Description } = DescriptionList;
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
                    style={{ padding: '20px 0' }}
                >
                    <FormItem label="名称" >
                        {getFieldDecorator('name')(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="日期" >
                        {getFieldDecorator('date')(
                            <RangePicker onChange={this.onDateChange} />
                        )}
                    </FormItem>
                    <Button style={{ marginLeft: 8 }} onClick={this.handleSearch} type="primary">查询</Button>
                    <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>重置</Button>
                    <div>
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
                    </div>
                </Form>
                <Table columns={[{
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
                    dataIndex: 'recruit_number'
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
                            <a href="#">编辑</a>
                            <Divider type="vertical" />
                            <a href="#">取消活动</a>
                        </span>
                    ),
                }]} dataSource={data}
                    expandedRowRender={record => <p style={{ margin: 0 }}>
                        <DescriptionList size="small">
                            <Description term="创建时间">{record.create_time}</Description>
                            <Description term="受助人数">{record.recipient_number}</Description>
                            <Description term="赞助金额">{record.sponsor_count}</Description>
                            <Description term="评价数">{record.score_count}</Description>
                            <Description term="类型">{
                                record.tags.map(item => {
                                    return <Tag color="cyan" key={item.id}>{item.name}</Tag>
                                })
                            }</Description>
                        </DescriptionList>
                    </p>}
                    pagination={
                        <Pagination defaultCurrent={6} total={500} />
                    } />
            </div>
        );
    }
}
export default Form.create()(ActivityManage)
