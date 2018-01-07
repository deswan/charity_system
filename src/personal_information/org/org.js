import React, { Component } from 'react';
import './org.less';
import { Avatar, Form, Input, Button, Icon, Popover, Tabs, List, Row, Col, Badge, DatePicker, Divider, Select, Card, Tag, Rate, message, Modal } from 'antd';
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
const confirm = Modal.confirm;

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
        this.setState({ id }, this.getData)
    }
    getData = () => {
        req({
            url: '/api/getMyOrgById',
            params: { id:this.state.id }
        }).then((data) => {
            this.setState(data)
        }).catch((err) => {
            message.error(err.message)
        })
    }
    quitAct = (actId, name) => {
        let me = this;
        confirm({
            title: `确定退出活动 ${name} ?`,
            onOk() {
                req({
                    url: '/api/quitAct',
                    type:'post',
                    params: { actId }
                }).then((data) => {
                    message.success('退出活动成功');
                    me.getData();
                }).catch((err) => {
                    message.error(err.message)
                })
            }
        });
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
                <h2 style={{ marginTop: '24px' }}>当前活动</h2>
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
                <h2>我参与的</h2>
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.myActs}
                    renderItem={item => (
                        <List.Item actions={[<a onClick={this.quitAct.bind(this, item.id, item.name)}>退出</a>]}>
                            <List.Item.Meta
                                title={
                                    <span>
                                        <a href={`/activity/${item.id}`} style={{ marginRight: '10px' }}>{item.name}</a>
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
                <h2 style={{ marginTop: '24px' }}>往期活动</h2>
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
                                        item.photos.split(',').map((img, idx) => {
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
            </div>
        );
    }
}
export default Org;