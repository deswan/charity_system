import React, { Component } from 'react';
import './notice.less';
import { Button, Avatar, Row, Col, Divider, List } from 'antd';
import numeral from 'numeral';
import { activity_status } from '../../config';

class Notice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [
                {
                    id: 1,
                    type: 0, //0:义工加入组织申请；1：义工加入活动申请；2：赞助申请
                    user: {
                        id: 1,
                        img: require('../../img/img.jpg'),
                        name: '花花',
                        apply_text: 'apply_text1',
                    },
                    time: '1996-10-17 12:34:54',
                    act: {
                        id: 1,
                        name: 'act1'
                    },
                    sponsor: {
                        img: require('../../img/img.jpg'),
                        name: '恒大地产',
                        money: 10000,
                        address: '123123123'
                    }
                }
            ]
        }
    }
    handleOpen = (page) => {
        window.open('/' + page, '_self')
    }
    componentWillMount() {
        // fetch('/api/').then((res)=>{
        //   console.log(res)
        // })
    }
    render() {
        return (
            <div>
                <List
                    loading={this.state.loading}
                    itemLayout="horizontal"
                    dataSource={this.state.data}
                    renderItem={item => (
                        <List.Item actions={[<Button>同意</Button>, <Button>拒绝</Button>]}>
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
                                        `赞助人：${item.sponsor.name} 赞助金额：${item.sponsor.money} 联系方式：${item.sponsor.address}`
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
