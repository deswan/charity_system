import '../bootstrap.js';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import registerServiceWorker from '../registerServiceWorker';
import React, { Component } from 'react';
import './personal_information.less';
import { Layout, Menu, Avatar, Icon } from 'antd';
import CHeader from '../components/CHeader/CHeader';
import Profile from './profile/profile';
import Activity from './activity/activity';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class PersonalInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orgs: [
                {
                    id: 1,
                    name: '爱之花',
                    img: require('../img/img.jpg')
                }
            ]
        }
    }
    handleOpen = (page) => {
        window.open('/' + page + '.html', '_self')
    }
    render() {
        return (
            <Router>
                <Layout>
                    <CHeader />
                    <Content style={{ padding: '24px 50px' }}>
                        <Layout style={{ padding: '24px 0', background: '#fff' }}>
                            <Sider width={200} style={{ background: '#fff' }}>
                                <Menu
                                    mode="inline"
                                    selectedKeys={['1']}
                                    defaultOpenKeys={['org-list']}
                                    style={{ height: '100%' }}
                                >
                                    <Menu.Item key="profile">
                                        <Icon type="pie-chart" />
                                        <span>个人信息</span>
                                    </Menu.Item>
                                    <Menu.Item key="activities">
                                        <Icon type="pie-chart" />
                                        <span>我的活动</span>
                                    </Menu.Item>
                                    <SubMenu key="org-list" title={<span><Icon type="user" />义工组织</span>}>
                                        {
                                            this.state.orgs.map(item => {
                                                return (
                                                    <Menu.Item key={item.id}>
                                                        <Avatar src={item.img} size="small" className="middle-avatar" />
                                                        <span>{item.name}</span>
                                                    </Menu.Item>
                                                )
                                            })
                                        }
                                    </SubMenu>
                                </Menu>
                            </Sider>
                            <Content style={{ padding: '0 24px', minHeight: 280 }}>
                                <Route exact path='/profile' component={Profile} />
                                <Route exact path='/activities' component={Activity} />
                            </Content>
                        </Layout>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2016 Created by Ant UED
                   </Footer>
                </Layout>
            </Router>

        );
    }
}

ReactDOM.render(<PersonalInformation />, document.getElementById('root'))
registerServiceWorker();
