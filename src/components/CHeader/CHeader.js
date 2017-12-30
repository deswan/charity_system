import React, { Component } from 'react';
import { Menu, Layout, Avatar, Icon, message } from 'antd';
import NoticeIcon from 'ant-design-pro/lib/NoticeIcon';
import './CHeader.less';
import { req } from '../../helper';

const SubMenu = Menu.SubMenu;
const { Header } = Layout;
export default class CHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 0,
            user: {
                id:0,
                img: require('../../img/img.jpg'),
                name: '红莲',
                orgs: [
                    {
                        id: 1,
                        name: '爱之花',
                        img: require('../../img/img.jpg')
                    }
                ]
            },
            notice: {
                information: [
                    {
                        key: '',
                        title: 'asd',
                        description: '123'
                    }
                ],
                todos: [
                    {
                        key: '',
                        title: 'asd',
                        description: '123'
                    }
                ]
            }
        }
    }
    componentWillMount = () => {
        req({
            url:'/api/getUser'
        }).then((data) => {
            this.setState({ status: data.status })
            if (data.status == 0) {
                this.setState({
                    user: {
                        img:data.data.portrait,
                        name:data.data.name,
                        orgs:data.orgs
                    },
                })
            }
        }).catch(err => {
            message.error(err.message)
        })
    }
    handleOpen = ({ key }) => {
        if (key == 'notice') return;
        window.open('/' + key, '_self')
    }
    handlePerson = ({ key }) => {

    }
    render() {
        return (
            <Header className="c-header">
                <div className="header-title">公益活动管理系统</div>
                <Menu
                    mode="horizontal"
                    theme="light"
                    className="header-menu"
                    selectedKeys={[this.props.pageName]}
                    onClick={this.handleOpen}
                >
                    <Menu.Item key="index">公益活动</Menu.Item>
                    <Menu.Item key="org_list">义工组织</Menu.Item>
                    {
                        this.state.user == null ?
                            (<Menu.Item key="login" style={{ float: 'right' }}>登陆</Menu.Item>) :
                            (
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
                            )
                    }
                    <Menu.Item key="notice" style={{ float: 'right' }} className="notice-icon">
                        <NoticeIcon count={5}>
                            <NoticeIcon.Tab
                                list={this.state.notice.information}
                                title="通知"
                                emptyText="你已查看所有通知"
                                emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
                            />
                            <NoticeIcon.Tab
                                list={this.state.notice.todos}
                                title="待办"
                                emptyText="你已查看所有待办"
                                emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
                            />
                        </NoticeIcon>
                    </Menu.Item>
                </Menu>
            </Header>
        )
    }
}