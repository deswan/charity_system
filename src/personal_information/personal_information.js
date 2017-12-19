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

console.log(Profile)

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
                                    defaultSelectedKeys={['1']}
                                    defaultOpenKeys={['sub1']}
                                    style={{ height: '100%' }}
                                >
                                    <Menu.Item key="1">
                                        <Icon type="pie-chart" />
                                        <span><Link to="/profile">个人信息</Link></span>
                                    </Menu.Item>
                                    <Menu.Item key="2">
                                        <Icon type="pie-chart" />
                                        <span><Link to="/activities">我的活动</Link></span>
                                    </Menu.Item>
                                    <SubMenu key="3" title={<span><Icon type="user" />义工组织</span>}>
                                        {
                                            this.state.orgs.map(item => {
                                                return (
                                                    <Menu.Item key={item.id}>
                                                        <Avatar src={item.img} size="small" />
                                                        {item.name}
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
