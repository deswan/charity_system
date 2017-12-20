import '../bootstrap.js';
import ReactDOM from 'react-dom';
import registerServiceWorker from '../registerServiceWorker';
import React, { Component } from 'react';
import './index.less';
import { Layout, Menu, Card, List, Button, Avatar, Tag,Row,Icon } from 'antd';
import NumberInfo from 'ant-design-pro/lib/NumberInfo';
import TagSelect from 'ant-design-pro/lib/TagSelect';
import CHeader from '../components/CHeader/CHeader';
import ActivitySource from '../components/ActivitySource/ActivitySource';
import numeral from 'numeral';
const { Header, Content, Footer, Sider } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      volCount: 1240812,
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
          img: require('../img/400*150.jpg'),
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
          orgImg: require('../img/400*150.jpg'),
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
      orgs: [
        {
          img: require('../img/img.jpg'),
          name: '爱之花公益团队',
          slogan: '一段假想的简介，这是一段比较长的简介',
          volunteerCount: 8846,
          activityCount: 12346,
          tags: [{
            id: 10,
            name: '爱老敬老'
          }, {
            id: 11,
            name: '爱老敬老'
          }]
        },
        {
          img: require('../img/img.jpg'),
          name: '爱之花公益团队',
          slogan: '一段假想的简介，这是一段比较长的简介',
          volunteerCount: 8846,
          activityCount: 12346,
          tags: [{
            id: 10,
            name: '爱老敬老'
          }]
        },
        {
          img: require('../img/img.jpg'),
          name: '爱之花公益团队',
          slogan: '一段假想的简介，这是一段比较长的简介',
          volunteerCount: 8846,
          activityCount: 12346,
          tags: [{
            id: 10,
            name: '爱老敬老'
          }]
        }
      ],
      volunteers: [
        {
          id: 1,
          img: require('../img/img.jpg'),
          name: '恒大地产',
          score: 200
        },
        {
          id: 1,
          img: require('../img/img.jpg'),
          name: '恒大地产',
          score: 200
        },
        {
          id: 1,
          img: require('../img/img.jpg'),
          name: '恒大地产',
          score: 200
        }, {
          id: 1,
          img: require('../img/img.jpg'),
          name: '恒大地产',
          score: 200
        }
        , {
          id: 1,
          img: require('../img/img.jpg'),
          name: '恒大地产',
          score: 200
        }, {
          id: 1,
          img: require('../img/img.jpg'),
          name: '恒大地产',
          score: 200
        }, {
          id: 1,
          img: require('../img/img.jpg'),
          name: '恒大地产',
          score: 200
        }
      ],
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
  handleOpen = (page) => {
    window.open('/' + page, '_self')
  }
  componentWillMount() {
    // fetch('/api/').then((res)=>{
    //   console.log(res)
    // })
  }
  handleTagChange = (checkedTags) => {

  }
  render() {
    return (
      <div>
        <Layout style={{ background: 'white' }}>
          <CHeader pageName={''} />
          <Layout style={{ background: 'white', width: '1200px', maxWidth: '80%', margin: '0 auto' }} >
            <Content class="content">
              <TagSelect onChange={this.handleTagChange} expandable style={{ marginBottom: '20px' }}>
                {
                  this.state.tags.map(item => {
                    return <TagSelect.Option value={item.id}>{item.name}</TagSelect.Option>
                  })
                }
              </TagSelect>
              <Row>
                <List
                  grid={{ xs: 1,md:3, gutter: 16 }}
                  dataSource={this.state.activities}
                  renderItem={(item, idx) => (
                    <List.Item>
                      <Card
                        hoverable
                        onClick={this.handleOpen.bind(this,'activity/'+item.id)}
                        cover={
                          <div class="act-cover" style={{backgroundImage:`url(${item.img})`}}></div>
                          }
                      >
                        <Card.Meta
                          title={item.name}
                          description={
                            <div>
                              <p class="act-inform"><Icon type="clock-circle-o" /> {item.time}</p>
                              <p class="act-inform"><Icon type="environment-o" /> {item.location}</p>
                            </div>
                          }
                        />
                      </Card>
                    </List.Item>
                  )}
                />
              </Row>
              <Card title="往期精彩活动" bordered={false}>
              <Row>
                <List
                  grid={{ gutter: 32, xs: 1, md: 4 }}
                  dataSource={this.state.reviewActivities}
                  renderItem={(item, idx) => (
                    <List.Item>
                      <div class="previous-act" style={{ backgroundImage: 'url(' + item.img + ')' }}>
                        <div class="previous-act-layer">
                          <span class="previous-act-layer-text">{item.name}</span>
                        </div>
                      </div>
                    </List.Item>
                  )}
                />
              </Row>
              </Card>
            </Content>
            <Sider width="300" style={{ background: 'white'}}>
              <section class="vol-count-shower">
                <NumberInfo
                  class="number-info"
                  subTitle={<span>义工总人数</span>}
                  total={numeral(this.state.volCount).format('0,0')}
                />
              </section>
              <Card title="义工排行" bordered={false}>
                <List
                  size="small"
                  dataSource={this.state.volunteers}
                  renderItem={(item, idx) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={item.img} />}
                        title={<a href="https://ant.design">{item.name}</a>}
                        description={'积分：' + item.score}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Sider>
          </Layout>
        </Layout>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
