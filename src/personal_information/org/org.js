import React, { Component } from 'react';
import './org.less';
import { Avatar, Form, Input, Button, Icon, Popover, Tabs, List, Row, Col, Badge, DatePicker, Divider, Select, PageHeader, Card, Tag, Rate } from 'antd';
import TagSelect from 'ant-design-pro/lib/TagSelect';
import numeral from 'numeral';
import NumberInfo from 'ant-design-pro/lib/NumberInfo';
import PageHeader from 'ant-design-pro/lib/PageHeader';
import DescriptionList from 'ant-design-pro/lib/DescriptionList';
import LargeDetailListItem from '../components/LargeDetailListItem/LargeDetailListItem';
let ACTIVITYS_STATUS = require('../../config.json').activity_status;
const { Description } = DescriptionList;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Option } = Select;
const FormItem = Form.Item;


class Org extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userStatus:'JOINED',
            id: 23,
            name: 'asdsda',
            img: require('../img/img.jpg'),
            slogan: '123321',
            recipientCount: 12414,
            volunteerCount: 12323,
            tags: [{
                id: 10,
                name: '爱老敬老'
            }],
            currentActivities: [
                {
                    id: 123,
                    name: '撒网群群二无',
                    img: require('../img/img.jpg'),
                    time: '1234-14-124',
                    location: 'asdsadsd'
                },
                {
                    id: 123,
                    name: '撒网群群二无',
                    img: require('../img/img.jpg'),
                    time: '1234-14-124',
                    location: 'asdsadsd'
                }
            ],
            previousActivities: [
                {
                    id: 123,
                    name: '123',
                    tags: [{
                        id: 10,
                        name: '爱老敬老'
                    }],
                    imgs: [
                        require('../img/img.jpg'),
                        require('../img/img.jpg'),
                        require('../img/img.jpg'),
                        require('../img/img.jpg'),
                        require('../img/img.jpg'),
                        require('../img/img.jpg'),
                        require('../img/img.jpg'),
                        require('../img/img.jpg'),
                    ],
                    volunteerCount: 123,
                    recipientCount: 12334,
                    rate: 4
                }
            ]
        }
    }
    handleOpen = (page) => {
        window.open('/' + page + '.html', '_self')
    }
    render() {
        return (
            <div className="c-org">
                <PageHeader
                    logo={<img alt="" src={this.state.img} />}
                    title={
                        this.state.name
                    }
                    content={
                        <div>
                            <Description>{this.state.slogan}</Description>
                            <div style={{ margin: '20px 0' }}>
                                {
                                    this.state.tags.map(item => {
                                        return <Tag color="cyan" key={item.id}>{item.name}</Tag>
                                    })
                                }
                            </div>
                        </div>
                    }
                    extraContent={
                        <div>
                            <NumberInfo
                                className="number-info"
                                subTitle={<span>义工人数</span>}
                                total={numeral(this.state.volunteerCount).format('0,0')}
                            />
                            <NumberInfo
                                className="number-info"
                                subTitle={<span>受助人数</span>}
                                total={numeral(this.state.recipientCount).format('0,0')}
                            />
                        </div>
                    }
                />
                <Card title="当前活动" bordered={false} style={{ marginTop: '24px' }}>
                    <List
                        grid={{ column: 3 }}
                        dataSource={this.state.currentActivities}
                        renderItem={(item, idx) => (
                            <List.Item style={{ alignItems: 'flex-start' }}>
                                <Card
                                    hoverable
                                    style={{ width: 240 }}
                                    cover={<img alt="" src={item.img} />}
                                >
                                    <Card.Meta
                                        title={item.name}
                                        description={
                                            <div>
                                                <p class="current-act-inform">活动时间：{item.time}</p>
                                                <p class="current-act-inform">活动地点：{item.location}</p>
                                            </div>
                                        }
                                    />
                                </Card>
                            </List.Item>
                        )}
                    />
                </Card>
                <Card title="往期活动" bordered={false} style={{ marginTop: '24px' }}>
                    <List
                        dataSource={this.state.previousActivities}
                        renderItem={(item, idx) => (
                            <LargeDetailListItem
                                siderWidth="400px"
                                headmMinHeight="80px"
                                avatar={<Avatar src={item.userImg} />}
                                head={
                                    <div>
                                        <h4>{item.name}</h4>
                                        <div>
                                            {
                                                item.tags.map(item => {
                                                    return <Tag color="cyan" key={item.id}><a href="https://github.com/ant-design/ant-design/issues/1862">{item.name}</a></Tag>
                                                })
                                            }
                                        </div>
                                    </div>
                                }
                                sider={
                                    <div>
                                        <NumberInfo
                                            className="number-info"
                                            subTitle={<span>义工人数</span>}
                                            total={numeral(item.volunteerCount).format('0,0')}
                                        />
                                        <NumberInfo
                                            className="number-info"
                                            subTitle={<span>受助人数</span>}
                                            total={numeral(item.recipientCount).format('0,0')}
                                        />
                                        <Rate disabled defaultValue={item.rate} style={{ display: 'inline-block', verticalAlign: 'middle' }} />
                                    </div>
                                }
                                body={
                                    <div>
                                        {
                                            item.imgs.map(img => {
                                                return (
                                                    <div className="comment-imgContainer">
                                                        <img src={img} alt="" />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                }
                            />
                        )}
                    />
                </Card>
            </div>
        );
    }
}
export default Org;