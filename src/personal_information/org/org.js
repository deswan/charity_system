import React, { Component } from 'react';
import './org.less';
import { Avatar, Form, Input, Button, Icon, Popover, Tabs, List, Row, Col, Badge, DatePicker, Divider, Select, Card, Tag, Rate,message } from 'antd';
import TagSelect from 'ant-design-pro/lib/TagSelect';
import numeral from 'numeral';
import NumberInfo from 'ant-design-pro/lib/NumberInfo';
import PageHeader from 'ant-design-pro/lib/PageHeader';
import DescriptionList from 'ant-design-pro/lib/DescriptionList';
import LargeDetailListItem from '../../components/LargeDetailListItem/LargeDetailListItem';
import ActivityCard from '../../components/ActivityCard/ActivityCard';
import { req } from '../../helper';
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
            userStatus: 'JOINED',
            id: 23,
            name: 'asdsda',
            img: require('../../img/img.jpg'),
            slogan: '123321',
            recipientCount: 12414,
            volunteerCount: 12323,
            tags: [],
            currentActivities: [],
            previousActivities: []
        }
    }
    handleOpen = (page) => {
        window.open('/' + page + '.html', '_self')
    }
    componentWillMount = () => {
        let id = this.props.match.params.id;
        req({
            url: '/api/getMyOrgById',
            params: { id }
        }).then((data) => {
            this.setState(data)
        }).catch((err) => {
            message.error(err.message)
        })
    }
    render() {
        return (
            <div className="c-org">
                <PageHeader
                    logo={<img alt="" src={this.state.logo} />}
                    title={
                        this.state.name
                    }
                    content={
                        <div>
                            <Description>{this.state.slogan}</Description>
                            <div style={{ margin: '20px 0' }}>
                                {
                                    this.state.tags.map(item => {
                                        return <Tag color="cyan" key={item.tagId}>{item.tagName}</Tag>
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
                                total={numeral(this.state.vol_count).format('0,0')}
                            />
                            <NumberInfo
                                className="number-info"
                                subTitle={<span>受助人数</span>}
                                total={numeral(this.state.recipient_count).format('0,0')}
                            />
                        </div>
                    }
                />
                <Card title="当前活动" bordered={false} style={{ marginTop: '24px' }}>
                    <Row>
                        <List
                            grid={{ xs: 1, md: 4, gutter: 16 }}
                            dataSource={this.state.currentActs}
                            renderItem={(item, idx) => (
                                <List.Item style={{ alignItems: 'flex-start' }}>
                                    <ActivityCard onClick={this.handleOpen.bind(this, 'activity/' + item.id)} img={item.img} name={item.name} time={item.start_time} location={item.location} />
                                </List.Item>
                            )}
                        />
                    </Row>
                </Card>
                <Card title="我参与的" bordered={false}>
                    <List
                        itemLayout="horizontal"
                        dataSource={this.state.myActs}
                        renderItem={item => (
                            <List.Item actions={[<a>退出</a>]}>
                                <List.Item.Meta
                                    title={<a href="https://ant.design">{item.name}</a>}
                                />
                                <div className="list-item-extra">
                                    <div>开始时间</div>
                                    <div>{item.start_time}</div>
                                </div>
                                <div className="list-item-extra">
                                    <div>活动状态</div>
                                    <div> <Badge status={ACTIVITYS_STATUS[item.status].badge} text={ACTIVITYS_STATUS[item.status].text} /> </div>
                                </div>
                            </List.Item>
                        )}
                    />
                </Card>
                <Card title="往期活动" bordered={false} style={{ marginTop: '24px' }}>
                    <List
                        dataSource={this.state.previousActs}
                        renderItem={(item, idx) => (
                            <LargeDetailListItem
                                siderWidth="200px"
                                headmMinHeight="80px"
                                head={
                                    <div>
                                        <h2>{item.name}</h2>
                                        <div>
                                            {
                                                item.tags.map(item => {
                                                    return <Tag color="cyan" key={item.tagId}><span>{item.tagName}</span></Tag>
                                                })
                                            }
                                        </div>
                                    </div>
                                }
                                sider={
                                    <div>
                                        <Rate disabled defaultValue={item.rate} style={{ display: 'inline-block', verticalAlign: 'middle' }} />
                                    </div>
                                }
                                body={
                                    <div>
                                        {
                                            item.photos && 
                                            item.photos.map((img,idx) => {
                                                return (
                                                    <div className="comment-imgContainer" key={idx}>
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