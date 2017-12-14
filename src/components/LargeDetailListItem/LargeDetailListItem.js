import React, { Component } from 'react';
import './LargeDetailListItem.less';
import { Layout, Menu, Card, List, Button, Avatar, Tag, Row, Col, Badge, Rate, Divider } from 'antd';

export default class LargeDetailList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div class="large-detail-list-item">
                <div class="large-detail-list-item-avatar">
                    {this.props.avatar}
                </div>
                <div class="large-detail-list-item-content">
                    <div class="large-detail-list-item-sider" style={{width:this.props.siderWidth}}>
                        {this.props.sider}
                    </div>
                    <div class="large-detail-list-item-head" style={{marginRight:this.props.siderWidth,minHeight:this.props.headmMinHeight}}>
                        {this.props.head}
                    </div>
                    <div class="large-detail-list-item-body">
                        {this.props.body}
                    </div>
                </div>
            </div>
        )
    }
}

