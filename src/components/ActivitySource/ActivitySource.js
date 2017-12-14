import React, { Component } from 'react';
import './ActivitySource.less';
import {Avatar} from 'antd';

export default class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <p class="act-source">
                <Avatar src={this.props.img} size="small" />
                <a class="act-source-org" onClick={this.props.onClick}>{this.props.orgName}</a>
                <span>发布于</span>
                <span href="" class="act-source-time">{this.props.time}</span>
            </p>
        );
    }
}
