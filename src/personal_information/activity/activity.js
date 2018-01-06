import React, { Component } from 'react';
import './activity.less';
import { Avatar, Form, Input, Button, Icon, Popover, Tabs, List, Row, Col, Badge, DatePicker, Divider, Select, Tag, message } from 'antd';
import TagSelect from 'ant-design-pro/lib/TagSelect';
import { req } from '../../helper';
let ACTIVITYS_STATUS = require('../../config.json').activity_status;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Option } = Select;
const FormItem = Form.Item;

class Activity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: '',
                startTime: '',
                endTime: ''
            },
            loading: false,
            tabKey: '0',
            showTab:true,
            data: [],
            pagination: {
                pageSize: 15,
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
    onTabChange = (tabKey) => {
        this.setState({ tabKey }, this.getData)
    }
    componentWillMount() {
        this.getData();
    }
    handleSearch = () => {
        let values = this.props.form.getFieldsValue();
        console.log('====================================');
        console.log(values);
        console.log('====================================');
        if(!values.name && !values.date){
            this.setState({
                showTab:true
            })
        }
        this.setState((state) => {
            state.pagination.current = 1;
            state.form.name = values.name || '';
            state.form.startTime = values.date && values.date[0].format('YYYY-MM-DD H:m:s') || '';
            state.form.endTime = values.date && values.date[1].format('YYYY-MM-DD H:m:s') || '';
            if(values.name || values.date){
                state.showTab = false
            }else{
                state.showTab = true
            }
            return state;
        }, this.getData)
    }
    handleReset = () => {
        this.props.form.setFieldsValue({
            name: '',
            date: ''
        })
        this.setState((state) => {
            state.pagination.current = 1;
            state.form = {
                name: '',
                startTime: '',
                endTime: ''
            }
            state.showTab = true;
            return state;
        }, this.getData)
    }
    getData = () => {
        this.setState({ loading: true })
        req({
            url: '/api/getMyActs',
            params: {
                status: this.state.tabKey,
                page: this.state.pagination.current,
                name:this.state.form.name,
                startTime:this.state.form.startTime,
                endTime:this.state.form.endTime
            }
        }).then((data) => {
            this.setState({ loading: false })
            let pagination = this.state.pagination;
            pagination.total = data.total;
            this.setState({
                data: data.rows,
                pagination
            })
        }).catch((err) => {
            this.setState({ loading: false })
            message.error(err.message)
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="c-activity">
                <Form
                    layout="inline"
                    onSubmit={this.handleSearch}
                >
                    <FormItem label="活动日期">
                        {getFieldDecorator('date')(
                            <RangePicker />
                        )}
                    </FormItem>
                    <FormItem label="活动名称">
                        {getFieldDecorator('name')(
                            <Input placeholder="placeholder" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" style={{ marginRight: '10px' }} onClick={this.handleSearch}>查询</Button>
                        <Button onClick={this.handleReset}>重置</Button>
                    </FormItem>
                </Form>
                <Tabs defaultActiveKey="1" onChange={this.onTabChange}>
                    <TabPane tab="未开始" key="0"></TabPane>
                    <TabPane tab="已结束" key="1"></TabPane>
                </Tabs>
                <List
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    itemLayout="horizontal"
                    dataSource={this.state.data}
                    renderItem={item => (
                        <List.Item actions={[<a>退出</a>]}>
                            <List.Item.Meta
                                title={
                                    <span>
                                        <a href={`/activity/${item.id}`} style={{marginRight:'10px'}}>{item.name}</a>
                                        {
                                            item.tags.map(item => {
                                                return <Tag color="cyan" key={item.tagId}>{item.tagName}</Tag>
                                            })
                                        }
                                    </span>
                                }
                            />
                            <div className="list-item-extra">
                                <div>开始时间</div>
                                <div>{item.start_time}</div>
                            </div>
                            <div className="list-item-extra">
                                <div>结束时间</div>
                                <div>{item.end_time}</div>
                            </div>
                            <div className="list-item-extra">
                                <div>活动地点</div>
                                <div>{item.location}</div>
                            </div>
                            <div className="list-item-extra">
                                <div>活动状态</div>
                                <div> <Badge status={ACTIVITYS_STATUS[item.status].badge} text={ACTIVITYS_STATUS[item.status].text} /> </div>
                            </div>
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}
export default Form.create()(Activity);