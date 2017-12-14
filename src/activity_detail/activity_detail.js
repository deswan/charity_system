import '../bootstrap.js';
import ReactDOM from 'react-dom';
import registerServiceWorker from '../registerServiceWorker';
import React, { Component } from 'react';
import './activity_detail.less';
import { Layout, Menu, Card, List, Button, Avatar, Tag, Row, Col, Badge, Rate, Divider } from 'antd';
import NumberInfo from 'ant-design-pro/lib/NumberInfo';
import PageHeader from 'ant-design-pro/lib/PageHeader';
import DescriptionList from 'ant-design-pro/lib/DescriptionList';
import CHeader from '../components/CHeader/CHeader';
import ActivitySource from '../components/ActivitySource/ActivitySource';
import LargeDetailListItem from '../components/LargeDetailListItem/LargeDetailListItem';
import numeral from 'numeral';
const { Header, Content, Footer, Sider } = Layout;
const { Description } = DescriptionList;

class ActivityDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 23,
            name: 'asdsda',
            img: require('../img/img.jpg'),
            tags: [{
                id: 10,
                name: '爱老敬老'
            }],
            status: '0',
            time: '2017-10-17 11:11:12',
            location: '广州市广东工业大学',
            recipientCount: 123,
            recruitCount: 3243,
            joinedCount: 123,
            orgImg: require('../img/img.jpg'),
            orgName: '爱之花',
            orgSlogan: '啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
            orgHelpedCount: 134432,
            create_time: '2017-10-17 11:11:12',
            volunteers: [
                {
                    id: 123,
                    img: require('../img/img.jpg'),
                    name: '花花'
                }
            ],
            sponsors: [
                {
                    id: 1,
                    img: require('../img/img.jpg'),
                    name: '恒大地产',
                    money: 1234
                }
            ],
            comments: [
                {
                    id: 1,
                    userImg: require('../img/img.jpg'),
                    imgs: [
                        require('../img/img.jpg'),
                        require('../img/img.jpg'),
                    ],
                    detail: '恒阿斯顿撒多撒多大地产',
                    name: '花花',
                    time: '1023-10-14',
                    rate: 2
                }
            ]
        }
    }
    handleOpen = (page) => {
        window.open('/' + page + '.html', '_self')
    }
    render() {
        return (
            <div class="activity-detail">
                <Layout >
                    <CHeader />
                    <Content class="content">
                        <div>
                            <PageHeader
                                title={
                                    <div>
                                        {this.state.name}
                                        <Badge style={{ marginLeft: '20px' }} status="success" text="进行中" />
                                    </div>
                                }
                                action={
                                    <Button type="primary">参与</Button>
                                }
                                content={
                                    <div>
                                        <DescriptionList col="2">
                                            <Description term="活动时间">{this.state.time}</Description>
                                            <Description term="活动地点">{this.state.location}</Description>
                                            <Description term="受助人数">{this.state.recipientCount}</Description>
                                            <Description term="招募义工人数">{this.state.recruitCount}</Description>
                                        </DescriptionList>
                                        <div style={{ margin: '20px 0' }}>
                                            {
                                                this.state.tags.map(item => {
                                                    return <Tag color="cyan" key={item.id}><a href="https://github.com/ant-design/ant-design/issues/1862">{item.name}</a></Tag>
                                                })
                                            }
                                        </div>
                                        <ActivitySource img={this.state.orgImg} orgName={this.state.orgName} time={this.state.create_time} onClick={this.handleOpen.bind(this, 'org_detail')} />
                                    </div>
                                }
                                extraContent={
                                    <div className="imgContainer">
                                        <img alt="" src={this.state.img} />
                                    </div>
                                }
                            />
                            <Row gutter={32} style={{ marginTop: '24px' }}>
                                <Col span={6}>
                                    <Card title="爱之花公益组织">
                                        <p className="org-card-text">{this.state.orgSlogan}</p>
                                        <div>
                                            <Avatar src={this.state.orgImg} shape="square" size="large" className="org-card-img" />
                                            <div className="org-card-body">
                                                <NumberInfo
                                                    className="number-info"
                                                    subTitle={<span>受助人数</span>}
                                                    total={numeral(this.state.orgHelpedCount).format('0,0')}
                                                />
                                            </div>
                                            <Rate disabled defaultValue={2} />
                                        </div>
                                    </Card>
                                    <Card title="赞助商" style={{ marginTop: '20px' }}>
                                        <List
                                            dataSource={this.state.sponsors}
                                            renderItem={(item, idx) => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        avatar={<Avatar src={item.img} />}
                                                        title={<a href="https://ant.design">{item.name}</a>}
                                                        description={'赞助总金额：' + numeral(item.money).format('0,0')}
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </Card>
                                </Col>
                                <Col span={18}>
                                    <Card title={`已参与（${this.state.joinedCount} / ${this.state.recruitCount}）`} bordered={false}>
                                        <List
                                            grid={{ column: 4 }}
                                            dataSource={this.state.volunteers}
                                            renderItem={(item, idx) => (
                                                <List.Item>
                                                    <Avatar src={item.img} className="single-list-item-avatar" />
                                                    <a href="https://ant.design" className="single-list-item-text">{item.name}</a>
                                                </List.Item>
                                            )}
                                        />
                                    </Card>
                                    <Card title="评价" bordered={false}>
                                        <List
                                            dataSource={this.state.comments}
                                            renderItem={(item, idx) => (
                                                <LargeDetailListItem
                                                    avatar={<Avatar src={item.userImg} />}
                                                    head={
                                                        <div>
                                                            <h4>花花</h4>
                                                            <p>恒阿斯顿撒多撒多大地产</p>
                                                        </div>
                                                    }
                                                    sider={
                                                        <div>
                                                            <Rate disabled defaultValue={item.rate} />
                                                            <p class="comment-sider-text">{item.time}</p>
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
                                </Col>
                            </Row>
                        </div>
                    </Content>
                </Layout>
            </div >
        );
    }
}

ReactDOM.render(<ActivityDetail />, document.getElementById('root'));
registerServiceWorker();
