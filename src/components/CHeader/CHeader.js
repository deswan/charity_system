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
            status: 1,
            user: {},
            orgs: [],
            adminOrgs: [],
            notice: []
        }
    }
    componentWillMount = () => {
        req({
            url: '/api/getUser'
        }).then((data) => {
            if (data.status == 0) {
                this.setState({
                    status: data.status,
                    user: {
                        name: data.data.name,
                        portrait: data.data.portrait
                    },
                    orgs: data.orgs,
                    adminOrgs: data.adminOrgs
                })
            } else {
                this.setState({ status: data.status })

            }
            this.props.userLoaded && this.props.userLoaded(data);
            return data.status;
        }).then((status) => {
            if (status == 0) {
                return req({
                    url: '/api/getNotice'
                }).then((data) => {
                    this.setState({
                        notice: data,
                    })
                }).catch(err => {
                    message.error(err.message)
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
    render() {
        return (
            <Header className="c-header" style={{ opacity: 0.9 }}>
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
                        this.state.adminOrgs.length && (
                            <SubMenu style={{ float: 'right' }} className="header-submenu" title="管理">
                                {
                                    this.state.adminOrgs.map(i => {
                                        return <Menu.Item key={`admin/${i.id}`}>
                                            <Avatar src={i.img} size="small" className="middle-avatar" />
                                            <span>{i.name}</span>
                                        </Menu.Item>
                                    })
                                }
                            </SubMenu>
                        )
                    }
                    {
                        this.state.status == 0 ?
                            (
                                <SubMenu style={{ float: 'right' }} className="header-submenu" title={
                                    <div>
                                        <Avatar src={this.state.user.portrait} style={{ verticalAlign: 'middle', marginRight: '10px' }} />
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
                            )
                            : (<Menu.Item key="login" style={{ float: 'right' }}>登陆</Menu.Item>)
                    }
                    {
                        this.state.notice.length && (
                            <Menu.Item key="notice" style={{ float: 'right' }} className="notice-icon">
                                <NoticeIcon count={this.state.notice.length}>
                                {
                                    [
                                        <NoticeIcon.Tab
                                        list={this.state.notice.map(i=>{
                                            return {
                                                title:i.type == 0 ? '活动进度提醒' : '申请结果',
                                                description:i.type == 0 ? `活动 ${i.target_name} 状态已变为 ${i.statusText}` : `您的申请加入 ${i.target_name} ${i.target_type == 0 ? '组织' : '活动'} 已变为 ${i.statusText}`,
                                                datetime:i.create_time
                                            }
                                        })}
                                        title="通知"
                                        emptyText="你已查看所有通知"
                                        emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
                                    />
                                    ]
                                }
                                </NoticeIcon>
                            </Menu.Item>
                        )
                    }
                </Menu>
            </Header>
        )
    }
}