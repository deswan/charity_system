import '../bootstrap.js';
import ReactDOM from 'react-dom';
import registerServiceWorker from '../registerServiceWorker';
import React, { Component } from 'react';
import './activity.less';
import { Layout, Menu, Card, List, Button, Avatar, Tag, Row, Col, Badge, Rate, Divider, Form, Popover, Input, message, Icon } from 'antd';
import NumberInfo from 'ant-design-pro/lib/NumberInfo';
import PageHeader from 'ant-design-pro/lib/PageHeader';
import DescriptionList from 'ant-design-pro/lib/DescriptionList';
import CHeader from '../components/CHeader/CHeader';
import ActivitySource from '../components/ActivitySource/ActivitySource';
import LargeDetailListItem from '../components/LargeDetailListItem/LargeDetailListItem';
import numeral from 'numeral';
import { req } from '../helper';
import { activity_status } from '../config';
const { Header, Content, Footer, Sider } = Layout;
const { Description } = DescriptionList;
const FormItem = Form.Item;
const { TextArea } = Input;

class ActivityDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userStatus: 'NOT_JOIN',
            isShowJoin: false,
            id: 23,
            name: 'asdsda',
            img: require('../img/img.jpg'),
            tags: [],
            status: 0,
            start_time: '2017-10-17 11:11:12',
            location: '广州市广东工业大学',
            recipient_number: 123,
            recruit_number: 3243,
            joinedCount: 123,
            orgImg: require('../img/img.jpg'),
            orgName: '爱之花',
            orgSlogan: '啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
            orgHelpedCount: 134432,
            create_time: '2017-10-17 11:11:12',
            volunteers: [],
            sponsors: [],
            comments: []
        }
    }
    handleOpen = (page) => {
        window.open('/' + page + '.html', '_self')
    }
    componentWillMount = () => {
        let id = parseInt(window.location.href.slice(window.location.href.lastIndexOf('/') + 1));
        req({
            url: '/api/getActivityById',
            params: { id }
        }).then((data) => {
            this.setState(data)
        }).catch((err) => {
            message.error(err.message)
        })
    }
    handleJoinVisibleChange = (visible) => {
        this.setState({
            isShowJoin: visible
        });
    }
    handleSubmitApply() {
        this.setState({
            isShowJoin: false
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
        };
        return (
            <div className="activity-detail">
                <Layout >
                    <CHeader />
                    <Content className="center-content">
                        <div>
                            <PageHeader
                                title={
                                    <div>
                                        {this.state.name}
                                        <Badge style={{ marginLeft: '20px' }} status={activity_status[this.state.status].badge} text={activity_status[this.state.status].text} />
                                    </div>
                                }
                                action={
                                    <Popover
                                        content={
                                            this.state.userStatus == 'NOT_JOIN' ?
                                                (<Form onSubmit={this.handleSubmit}>
                                                    <FormItem
                                                        label="申请理由"
                                                        {...formItemLayout}
                                                    >
                                                        {getFieldDecorator('apply-text', {
                                                            rules: [{ max: 300, message: '不超过300个字符' }, { required: true, message: '不能为空' }],
                                                            placeholder: '不超过300个字符'
                                                        })(
                                                            <TextArea />
                                                            )}
                                                    </FormItem>
                                                    <div style={{ textAlign: 'right' }}>
                                                        <Button onClick={this.handleSubmitApply.bind(this)} type="primary" size="small">申请</Button>
                                                    </div>
                                                </Form>) :
                                                (<span>您还未加入 {this.state.orgName} ，<a onClick={this.handleOpen.bind(this, 'org/' + this.orgId)}>现在加入</a></span>)
                                        }
                                        title="参与活动"
                                        placement="leftTop"
                                        visible={this.state.isShowJoin}
                                        trigger="click"
                                        onVisibleChange={this.handleJoinVisibleChange}
                                    >
                                        {this.state.userStatus == 'JOINED' ? (<span>您已参与该活动</span>) : (<Button type="primary" onClick={this.handleJoin}>参与</Button>)}
                                    </Popover>
                                }
                                content={
                                    <div>
                                        <DescriptionList col="1">
                                            <Description term={
                                                <span>
                                                    <Icon type="team" /> 已招募义工数
                                                </span>
                                            }>{this.state.joinedCount}</Description>
                                        </DescriptionList>
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
                                    <a>赞助</a>
                                }
                            />
                            <Row gutter={32} style={{ marginTop: '24px' }}>
                                <Col span={6}>
                                    <Card title="义工组织">
                                        <div>
                                            <Avatar src={this.state.orgImg} shape="square" size="large" className="org-card-img" />
                                            <div className="org-card-body">
                                                {this.state.orgName}
                                                <p className="org-card-text">{this.state.orgSlogan}</p>
                                            </div>
                                        </div>
                                    </Card>
                                    <Card title="赞助商" style={{ marginTop: '20px' }}>
                                        <List
                                            dataSource={this.state.sponsors}
                                            renderItem={(item, idx) => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        avatar={<Avatar src={item.logo} />}
                                                        title={item.name}
                                                        description={'赞助总金额：' + numeral(item.amount).format('0,0')}
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </Card>
                                </Col>
                                <Col span={18}>
                                    <Card title="活动详情" bordered={false}>
                                        <Row gutter={16}>

                                            <Col span={10}>
                                                <DescriptionList col="1">
                                                    <Description term={
                                                        <span>
                                                            <Icon type="environment-o" /> 活动时间
                                                </span>
                                                    }>{this.state.start_time} 至 {this.state.end_time}</Description>
                                                    <Description term={
                                                        <span>
                                                            <Icon type="clock-circle-o" /> 活动地点
                                                </span>
                                                    }>{this.state.location}</Description>
                                                    <Description term={
                                                        <span>
                                                            <Icon type="heart-o" /> 受助人数
                                                </span>
                                                    }>{this.state.recipient_number}</Description>
                                                </DescriptionList>
                                            </Col>
                                            <Col span={14}>
                                                <div className="imgContainer">
                                                    <img alt="" src={this.state.img} />
                                                </div>
                                            </Col>
                                        </Row>
                                    </Card>
                                    {
                                        this.state.status == 3 &&
                                        <Card title="评价" bordered={false}>
                                            <List
                                                dataSource={this.state.comments}
                                                renderItem={(item, idx) => (
                                                    <LargeDetailListItem
                                                        avatar={<Avatar src={item.userImg} />}
                                                        head={
                                                            <div>
                                                                <h4>{item.name}</h4>
                                                                <p>{item.detail}</p>
                                                            </div>
                                                        }
                                                        sider={
                                                            <div>
                                                                <Rate disabled defaultValue={item.rate} />
                                                                <p className="comment-sider-text">{item.time}</p>
                                                            </div>
                                                        }
                                                        body={
                                                            <div>
                                                                {
                                                                    item.imgs.map((img, idx) => {
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
                                    }
                                </Col>
                            </Row>
                        </div>
                    </Content>
                </Layout>
            </div >
        );
    }
}
const ActivityDetailWrapper = Form.create()(ActivityDetail);
ReactDOM.render(<ActivityDetailWrapper />, document.getElementById('root'));
registerServiceWorker();
