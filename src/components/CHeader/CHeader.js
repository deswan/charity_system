import React, { Component } from 'react';
import { Menu,Layout } from 'antd';
import NoticeIcon from 'ant-design-pro/lib/NoticeIcon';
import './CHeader.less';
const { Header } = Layout;
export default class CHeader extends Component {
    constructor(props) {
        super(props);
    }
    handleOpen = ({key})=>{
        window.open('/'+key,'_self')
    }
    render() {
        return (
            <Header className="c-header">
                <div className="header-title">公益活动管理系统</div>
                <Menu
                    mode="horizontal"
                    theme="dark"
                    defaultSelectedKeys={[this.props.pageName]}
                    className="header-menu"
                    onClick={this.handleOpen}
                >
                    <Menu.Item key="index">公益活动</Menu.Item>
                    <Menu.Item key="org_list">义工组织</Menu.Item>
                    <Menu.Item key="4" style={{ float: 'right' }}>登陆</Menu.Item>
                    <Menu.Item key="3" style={{ float: 'right' }} className="notice-icon"><NoticeIcon count={5} /></Menu.Item>
                </Menu>
            </Header>
        )
    }
}