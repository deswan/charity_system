import React, { Component } from 'react';
import './notice.less';
import { Button, Avatar, Row, Col, Divider, List, message } from 'antd';
import numeral from 'numeral';
import { activity_status } from '../../config';
import { req } from '../../helper';

class Notice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: []
        }
    }
    handleOpen = (page) => {
        window.open('/' + page, '_self')
    }
    componentWillMount() {
        let path = window.location.href.slice(0, window.location.href.lastIndexOf('#'));
        let id = parseInt(path.slice(path.lastIndexOf('/') + 1));
        this.setState({ id }, this.getData)
    }
    getData = () => {
        this.setState({
            loading: true
        })
        req({
            url: '/api/getTodos',
            params: {
                orgId: this.state.id,
            }
        }).then((data) => {
            this.setState({
                data,
                loading: false
            })
        }).catch((err) => {
            message.error(err.message);
            this.setState({
                loading: false
            })
        })
    }
    handleAgree = (row) => {
        req({
            url: '/api/updateApplication',
            type: 'post',
            params: {
                id: row.item_id,
                type: row.type,
                action: 2,
                orgId:this.state.id
            }
        }).then((data) => {
            if (data.code == 0) {
                message.success('处理成功');
                this.getData();
            }
        }).catch((err) => {
            message.error(err.message);
        })
    }
    handleDisAgree = (row) => {
        req({
            url: '/api/updateApplication',
            type: 'post',
            params: {
                id: row.item_id,
                type: row.type,
                action: 1,
                orgId:this.state.id
            }
        }).then((data) => {
            if (data.code == 0) {
                message.success('处理成功');
                this.getData();
            }
        }).catch((err) => {
            message.error(err.message);
        })
    }
    render() {
        return (
            <div>
                <List
                    loading={this.state.loading}
                    itemLayout="horizontal"
                    dataSource={this.state.data}
                    renderItem={item => (
                        <List.Item actions={[<Button onClick={this.handleAgree.bind(this, item)}>同意</Button>, <Button onClick={this.handleDisAgree.bind(this, item)}>拒绝</Button>]}>
                            <List.Item.Meta
                                avatar={<Avatar src={(item.type == 0 || item.type == 1) ? item.user.img : item.sponsor.img} />}
                                title={
                                    item.type == 0 ? (
                                        <span>
                                            <a href={item.user.id}>{item.user.name}</a> 申请加入组织
                                        </span>
                                    ) : item.type == 1 ? (
                                        <span>
                                            <a href={item.user.id}>{item.user.name}</a> 申请参加活动 <a href={item.act.id}>{item.act.name}</a>
                                        </span>
                                    ) : (
                                                <span>
                                                    活动 <a href={item.act.id}>{item.act.name}</a> 赞助申请
                                        </span>
                                            )
                                }
                                description={
                                    (item.type == 0 || item.type == 1) ? `申请理由：${item.user.apply_text}` :
                                        `赞助人：${item.sponsor.name} 赞助金额：${item.sponsor.amount} 联系方式：${item.sponsor.address}`
                                }
                            />
                            <div>{item.time}</div>
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}
export default Notice
