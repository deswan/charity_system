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
import Org from './org/org';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class PersonalInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orgs: [],
            current:'',
        }
    }
    handleOpen = (page) => {
        window.open('/' + page, '_self')
    }
    getUser = data => {
        this.setState({
            orgs:data.orgs
        })
    }
    onMenuClick = ({key})=>{
        this.setState({
            current:key
        })
    }
    render() {
        return (
            <Router>
                <Layout>
                    <CHeader userLoaded={this.getUser} />
                    <Content style={{ padding: '24px 50px' }}>
                        <Layout style={{ padding: '24px 0', background: '#fff' }}>
                            <Sider width={200} style={{ background: '#fff' }}>
                                <Menu
                                    mode="inline"
                                    onClick={this.onMenuClick}
                                    selectedKeys={[this.state.current]}
                                    defaultOpenKeys={['org-list']}
                                    style={{ height: '100%' }}
                                >
                                    <Menu.Item key="0">
                                        <Link to="/profile">
                                            <Icon type="pie-chart" />
                                            <span>个人信息</span>
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key="1">
                                        <Link to="/activities">
                                            <Icon type="pie-chart" />
                                            <span>我的活动</span>
                                        </Link>
                                    </Menu.Item>
                                    <SubMenu key="org-list" title={<span><Icon type="user" />义工组织</span>}>
                                        {
                                            this.state.orgs.map(item => {
                                                return (
                                                    <Menu.Item key="2">
                                                        <Link to={`/org/${item.id}`}>
                                                            <Avatar src={item.img} size="small" className="middle-avatar" />
                                                            <span>{item.name}</span>
                                                        </Link>
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
                                <Route exact path='/org/:id' component={Org} />
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
