import '../bootstrap.js';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import registerServiceWorker from '../registerServiceWorker';
import React, { Component } from 'react';
import './index.less';
import { Layout, Menu, Avatar, Icon } from 'antd';
import NoticeIcon from 'ant-design-pro/lib/NoticeIcon';
import ActivityManage from './activity_manage/activity_manage';
import VolunteerManage from './volunteer_manage/volunteer_manage';
import CreateActivity from './create_activity/create_activity';
import PageNotice from './notice/notice';
import PageSetting from './setting/setting';
import PageActivityDetail from './activity_detail/activity_detail';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            org: {
                img: require('../img/img.jpg'),
                name: '爱之花'
            },
            user: {
                img: require('../img/img.jpg'),
                name: '红莲',
                orgs: [
                    {
                        id: 1,
                        name: '爱之花',
                        img: require('../img/img.jpg')
                    }
                ]
            }
        }
    }
    handleOpen = (page) => {
        window.open('/' + page + '.html', '_self')
    }
    render() {
        return (
            <Router>
                <Layout>
                    <Header>
                        <div className="header-title">
                            <span style={{marginRight:'20px'}}>义工组织管理</span>
                            <Avatar src={this.state.org.img} className="middle-avatar" /><span>{this.state.org.name}</span>
                        </div>
                        <Menu
                            mode="horizontal"
                            theme="dark"
                            className="header-menu"
                            onClick={this.handleOpen}
                        >
                            <SubMenu style={{ float: 'right' }} className="header-submenu" title={
                                <div>
                                    <Avatar src={this.state.user.img} style={{ verticalAlign: 'middle', marginRight: '10px' }} />
                                    <span>{this.state.user.name}</span>
                                </div>
                            }>
                                <Menu.Item key="personal_information/#/profile">
                                    <Icon type="pie-chart" />
                                    <span>个人信息</span>
                                </Menu.Item>
                                <Menu.Item key="personal_information/#/activities">
                                    <Icon type="pie-chart" />
                                    <span>我的活动</span>
                                </Menu.Item>
                                <SubMenu title={<span><Icon type="user" />义工组织</span>}>
                                    {
                                        this.state.user.orgs.map(item => {
                                            return (
                                                <Menu.Item key={item.id}>
                                                    <Avatar src={item.img} size="small" className="middle-avatar" />
                                                    <span>{item.name}</span>
                                                </Menu.Item>
                                            )
                                        })
                                    }
                                </SubMenu>
                            </SubMenu>
                        </Menu>
                    </Header>
                    <Content>
                        <Layout style={{ background: '#fff', height: '100%' }}>
                            <Sider width={300}>
                                <Menu
                                    mode="vertical"
                                    selectedKeys={['1']}
                                    style={{ height: '100%', position: 'fixed', width: '300px' }}
                                >
                                    <Menu.Item key="1">
                                        <Link to="/activity-manage">
                                            <Icon type="dashboard" />
                                            <span>活动管理</span>
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key="2">
                                        <Link to="/create-activity">
                                            <Icon type="plus" />
                                            <span>发布活动</span>
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key="3">
                                        <Link to="/volunteer-manage">
                                            <Icon type="user" />
                                            <span>义工管理</span>
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key="4">
                                        <Link to="/notice">
                                            <Icon type="notification" />
                                            <span>消息</span>
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key="5">
                                        <Link to="/setting">
                                            <Icon type="setting" />
                                            <span>设置</span>
                                        </Link>
                                    </Menu.Item>
                                </Menu>
                            </Sider>
                            <Content style={{ padding: '0 24px', minHeight: 400 }}>
                                <Route path="/activity-manage" component={ActivityManage} a={3} />
                                <Route path="/volunteer-manage" component={VolunteerManage} />
                                <Route path="/create-activity" component={CreateActivity} />
                                <Route path="/notice" component={PageNotice} />
                                <Route path="/setting" component={PageSetting} />
                                <Route path="/activity-detail/:id" component={PageActivityDetail} />
                            </Content>
                        </Layout>
                    </Content>
                </Layout>
            </Router>
        );
    }
}
ReactDOM.render(<Admin />, document.getElementById('root'))
registerServiceWorker();
