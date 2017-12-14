import '../bootstrap.js';
import ReactDOM from 'react-dom';
import registerServiceWorker from '../registerServiceWorker';
import React, { Component } from 'react';
import './activity_list.less';
import { Layout, Menu, Card, List, Button, Avatar, Tag } from 'antd';
import NumberInfo from 'ant-design-pro/lib/NumberInfo';
import TagSelect from 'ant-design-pro/lib/TagSelect';
import CHeader from '../components/CHeader/CHeader';
import numeral from 'numeral';
const { Header, Content, Footer, Sider } = Layout;

class ActivityList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [{
        id: '1',
        name: '123'
      }, {
        id: '1',
        name: '123'
      }],
      activities: [
        {
          id: 1,
          img: require('../img/img.jpg'),
          name: '衣暖人心 旧衣捐赠 再利用环保公益活动1',
          time: '2017-10-17 11:11:12',
          location: '广州市广东工业大学',
          tags: [{
            id: '1',
            name: '123'
          }, {
            id: '1',
            name: '123'
          }],
          orgId: 2,
          orgImg: require('../img/img.jpg'),
          orgName: '爱之花',
          create_time: '2017-10-17 11:11:12'
        },
        {
          id: 1,
          img: require('../img/img.jpg'),
          name: '衣暖人心 旧衣捐赠 再利用环保公益活动1',
          time: '2017-10-17 11:11:12',
          location: '广州市广东工业大学',
          tags: [{
            id: '1',
            name: '123'
          }, {
            id: '1',
            name: '123'
          }],
          orgId: 2,
          orgImg: require('../img/img.jpg'),
          orgName: '爱之花',
          create_time: '2017-10-17 11:11:12'
        }
      ],
      pagination: {
        pageSize: 10,
        current: 1,
        total: 100,
        onChange: ((page) => {
          let pagination = this.state.pagination;
          pagination.current = page;
          this.setState({ pagination })
        }),
      },
      reviewActivities: [
        {
          id: 1,
          img: require('../img/img.jpg'),
          name: '衣暖人心 旧衣捐赠 再利用环保公益活动1'
        },
        {
          id: 1,
          img: require('../img/img.jpg'),
          name: ''
        },
        {
          id: 1,
          img: require('../img/img.jpg'),
          name: ''
        },
        {
          id: 1,
          img: require('../img/img.jpg'),
          name: ''
        }
      ]
    }
  }

  handleTagChange = (checkedTags) => {

  }
  render() {
    return (
      <div class="activity-list">
        <Layout style={{ background: 'white' }}>
          <CHeader pageName="activity_list" />
          <Content className="content">
            <TagSelect onChange={this.handleTagChange} expandable style={{marginBottom:'20px'}}>
              {
                this.state.tags.map(item => {
                  return <TagSelect.Option value={item.id}>{item.name}</TagSelect.Option>
                })
              }
            </TagSelect>
            <List
              itemLayout="vertical"
              size="large"
              pagination={this.state.pagination}
              dataSource={this.state.activities}
              renderItem={item => (
                <List.Item
                  key={item.id}
                  extra={<img height={150} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                >
                  <List.Item.Meta
                    title={<a href={item.id}>{item.name}</a>}
                    description={<div>
                      {
                        item.tags.map(item => {
                          return <Tag color="cyan" key={item.id}><a href="https://github.com/ant-design/ant-design/issues/1862">{item.name}</a></Tag>
                        })
                      }
                    </div>}
                  />

                  <p class="act-text-block">时间：{item.time}</p>
                  <p class="act-text-block">地点：{item.location}</p>
                  <p class="act-source">
                    <Avatar src={item.orgImg} size="small" />
                    <a href={item.orgId} class="act-source-org">{item.orgName}</a>
                    <span>发布于</span>
                    <span href="" class="act-source-time">{item.create_time}</span>
                  </p>
                </List.Item>
              )}
            />
            <Card title="往期精彩活动" extra={<a href="#">More</a>} bordered={false}>
              <List
                grid={{ gutter: 32, xs: 1, sm: 2, md: 4, lg: 4}}
                dataSource={this.state.reviewActivities}
                renderItem={(item, idx) => (
                  <List.Item>
                    <div class="previous-activity" style={{ backgroundImage: 'url(' + item.img + ')' }}>
                    <div class="previous-activity-layer">
                    <span class="previous-activity-layer-text">{item.name}</span>
                    </div>
                    </div>
                  </List.Item>
                )}
              />
            </Card>
          </Content>
        </Layout>
      </div>
    );
  }
}

ReactDOM.render(<ActivityList />, document.getElementById('root'));
registerServiceWorker();

