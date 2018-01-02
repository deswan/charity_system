import '../bootstrap.js';
import ReactDOM from 'react-dom';
import registerServiceWorker from '../registerServiceWorker';
import React, { Component } from 'react';
import './org.less';
import { Layout, Menu, Card, List, Button, Avatar, Tag, Row, Col, Badge, Rate,message } from 'antd';
import NumberInfo from 'ant-design-pro/lib/NumberInfo';
import PageHeader from 'ant-design-pro/lib/PageHeader';
import DescriptionList from 'ant-design-pro/lib/DescriptionList';
import CHeader from '../components/CHeader/CHeader';
import ActivitySource from '../components/ActivitySource/ActivitySource';
import ActivityCard from '../components/ActivityCard/ActivityCard';
import LargeDetailListItem from '../components/LargeDetailListItem/LargeDetailListItem';
import numeral from 'numeral';
import { req } from '../helper';

const { Header, Content, Footer, Sider } = Layout;
const { Description } = DescriptionList;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 23,
            userStatus:'',
            name: 'asdsda',
            img: require('../img/img.jpg'),
            slogan: '123321',
            recipientCount: 12414,
            volunteerCount: 12323,
            tags: [],
            currentActivities: [],
            previousActivities: []
        }
    }
    componentWillMount = () => {
        let id = parseInt(window.location.href.slice(window.location.href.lastIndexOf('/') + 1));
        req({
            url: '/api/getOrgById',
            params: { id }
        }).then((data) => {
            this.setState(data)
        }).catch((err) => {
            message.error(err.message)
        })
    }
    handleOpen = (page) => {
        window.open('/' + page, '_self')
    }
    render() {
        return (
            <div className="org-detail">
                <Layout>
                    <CHeader />
                    <Content className="center-content">
                        <PageHeader
                            logo={<img alt="" src={this.state.logo} />}
                            title={
                                this.state.name
                            }
                            action={
                                this.state.userStatus == 'NO_LOGIN' ? '' :
                                this.state.userStatus == 'NO_JOIN' ?
                                    (<Button type="primary">加入</Button>) :
                                    (<span>您已加入该组织</span>)
                            }
                            content={
                                <div>
                                    <Description>{this.state.slogan}</Description>
                                    <div style={{ margin: '20px 0' }}>
                                        {
                                            this.state.tags.map(item => {
                                                return <Tag color="cyan" key={item.tagId}><span>{item.tagName}</span></Tag>
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
                                    grid={{ xs:1,md:4,gutter:16 }}
                                    dataSource={this.state.currentActs}
                                    renderItem={(item, idx) => (
                                        <List.Item style={{ alignItems: 'flex-start' }}>
                                                <ActivityCard onClick={this.handleOpen.bind(this,'activity/'+item.id)} img={item.img} name={item.name} time={item.start_time} location={item.location}/>
                                        </List.Item>
                                    )}
                                />
                            </Row>
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
                                                    item.photos.map(img => {
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
                    </Content>
                </Layout>
            </div >
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
