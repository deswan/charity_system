import React, { Component } from 'react';
import './activity.less';
import { Avatar, Form, Input, Button, Icon, Popover, Tabs, List, Row, Col, Badge, DatePicker, Divider, Select } from 'antd';
import TagSelect from 'ant-design-pro/lib/TagSelect';
let ACTIVITYS_STATUS = require('../../config.json').activity_status;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Option } = Select;
const FormItem = Form.Item;

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            processing: {
                loading: false,
                data: [
                    {
                        id: '123',
                        name: 'sdaad',
                        orgName: 'sda',
                        time: '112134-2323-',
                        status: '0'
                    }
                ]
            },
            ended: {
                loading: false,
                data: [{
                    id: '1234',
                    name: 'sdaad',
                    orgName: 'sda',
                    time: '112134-2323-',
                    status: '1'
                }],
                tags: [
                    {
                        id: 123,
                        name: '111'
                    }
                ],
                orgs: [
                    {
                        id: 123,
                        name: '12344124'
                    }
                ]
            }
        }
    }
    handleOpen = (page) => {
        window.open('/' + page + '.html', '_self')
    }
    handleEndedTagSelectChange = (tagId) => {

    }
    onTabChange = (key)=>{

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
                        <Button type="primary" style={{ marginRight: '10px' }}>查询</Button>
                        <Button>重置</Button>
                    </FormItem>
                </Form>
                <Tabs defaultActiveKey="1" onChange={this.onTabChange}>
                    <TabPane tab="未开始" key="1"></TabPane>
                    <TabPane tab="已结束" key="2"></TabPane>
                </Tabs>
                <List
                    loading={this.state.processing.loading}
                    itemLayout="horizontal"
                    dataSource={this.state.processing.data}
                    renderItem={item => (
                        <List.Item actions={[<a>退出</a>]}>
                            <List.Item.Meta
                                title={<a href="https://ant.design">{item.name}</a>}
                            />
                            <div className="list-item-extra">
                                <div>开始时间</div>
                                <div>{item.time}</div>
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
const WrappedProfile = Form.create()(Profile);
export default WrappedProfile;