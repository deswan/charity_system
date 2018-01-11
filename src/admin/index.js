import '../bootstrap.js';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import registerServiceWorker from '../registerServiceWorker';
import React, { Component } from 'react';
import './index.less';
import { Layout, Menu, Avatar, Icon, message } from 'antd';
import NoticeIcon from 'ant-design-pro/lib/NoticeIcon';
import ActivityManage from './activity_manage/activity_manage';
import VolunteerManage from './volunteer_manage/volunteer_manage';
import CreateActivity from './create_activity/create_activity';
import PageNotice from './notice/notice';
import PageSetting from './setting/setting';
import PageActivityDetail from './activity_detail/activity_detail';
import { req } from '../helper';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current:'1',
            user: {},
            orgs: [],
            adminOrgs: [],
            orgName: '',
            orgImg: ''
        }
    }
    componentWillMount = () => {
        let path = window.location.href.slice(0, window.location.href.lastIndexOf('#'));
        let id = parseInt(path.slice(path.lastIndexOf('/') + 1));
        console.log(path,id)
        req({
            url: '/api/getUser'
        }).then((data) => {
            if (data.status == 0) {
                this.setState({
                    user: {
                        name: data.data.name,
                        portrait: data.data.portrait
                    },
                    orgs: data.orgs,
                    adminOrgs: data.adminOrgs
                })
            }
        }).catch(err => {
            message.error(err.message)
        })
        req({
            url: '/api/getOrgProfileById',
            params: { orgId:id }
        }).then((data) => {
            this.setState({
                orgName: data.name,
                orgImg: data.logo
            })
        }).catch(err => {
            message.error(err.message)
        })
    }
    handleOpen = ({ key }) => {
        if(key == 'logout'){
            return this.handleLogout();
        }
        window.open('/' + key, '_self')
    }
    handleLogout = ()=>{
        req({
            url: '/api/logout'
        }).then((data) => {
            if (data.code == 0) {
                window.location = '/';
            }
        }).catch(err => {
            message.error(err.message)
        })
    }
    handleMenuClick = ({key})=>{
        this.setState({
            current:key
        })
    }
    render() {
        return (
            <Router>
                <Layout>
                    <Header>
                        <div className="header-title">
                            <span style={{ marginRight: '20px' }}>义工组织管理</span>
                            <Avatar src={this.state.orgImg} className="middle-avatar" /><span>{this.state.orgName}</span>
                        </div>
                        <Menu
                            mode="horizontal"
                            theme="dark"
                            className="header-menu"
                            onClick={this.handleOpen}
                        >
                            <SubMenu style={{ float: 'right' }} title="管理">
                                {
                                    this.state.adminOrgs.map(i => {
                                        return <Menu.Item key={`admin/${i.id}#/activity-manage`}>
                                            <Avatar src={i.img} size="small" className="middle-avatar" />
                                            <span>{i.name}</span>
                                        </Menu.Item>
                                    })
                                }
                            </SubMenu>
                            <SubMenu style={{ float: 'right' }} title={
                                <div>
                                    <Avatar src={this.state.user.portrait} style={{ verticalAlign: 'middle', marginRight: '10px' }} />
                                    <span>{this.state.user.name}</span>
                                </div>
                            }>
                                {/* <Menu.Item key="personal_information/#/profile">
                                    <Icon type="pie-chart" />
                                    <span>个人信息</span>
                                </Menu.Item> */}
                                <Menu.Item key="personal_information/#/activities">
                                    <Icon type="pie-chart" />
                                    <span>我的活动</span>
                                </Menu.Item>
                                <SubMenu title={<span><Icon type="user" />义工组织</span>}>
                                    {
                                        this.state.orgs.map(item => {
                                            return (
                                                <Menu.Item key={'personal_information/#/org/' + item.id}>
                                                    <Avatar src={item.img} size="small" className="middle-avatar" />
                                                    <span>{item.name}</span>
                                                </Menu.Item>
                                            )
                                        })
                                    }
                                </SubMenu>
                                <Menu.Item key="/createorg">
                                    <Icon type="pie-chart" />
                                    <span>创建组织</span>
                                </Menu.Item>
                                <Menu.Item key="logout">
                                    <Icon type="logout" />
                                    <span>退出</span>
                                </Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Header>
                    <Content>
                        <Layout style={{ background: '#fff', height: '100%' }}>
                            <Sider width={300} style={{ backgroundColor: 'white' }}>
                                <Menu
                                    onClick={this.handleMenuClick}
                                    mode="vertical"
                                    selectedKeys={[this.state.current]}
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
