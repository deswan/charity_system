import React, { Component } from 'react';
import './ActivityCard.less';
import { Card, Button,Icon } from 'antd';

export default class ActivityCard extends Component {
  constructor(props) {
    super(props);
  }
  handleOpen = (page) => {
    window.open('/' + page, '_self')
  }
  render() {
    return (
      <Card
        className="c-act"
        hoverable
        onClick={this.props.onClick}
        cover={
          <div className="act-cover" style={{ backgroundImage: `url(${this.props.img})` }}></div>
        }
      >
        <p className="act-title">{this.props.name}</p>
        <div>
          <p className="act-inform"><Icon type="clock-circle-o" /> {this.props.time}</p>
          <p className="act-inform"><Icon type="environment-o" /> {this.props.location}</p>
        </div>
      </Card>
    );
  }
}

