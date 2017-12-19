import '../bootstrap.js';
import ReactDOM from 'react-dom';
import registerServiceWorker from '../registerServiceWorker';
import React, { Component } from 'react';
import './index.less';
import { Layout, Menu, Card, List, Button, Avatar, Tag } from 'antd';
import NumberInfo from 'ant-design-pro/lib/NumberInfo';
import CHeader from '../components/CHeader/CHeader';
import numeral from 'numeral';
const { Header, Content, Footer, Sider } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      volCount: 1240812,
      activityList: [{
        img: require('../img/img.jpg'),
        name: '衣暖人心 旧ads衣捐赠 再利用环',
        time: '2017-10-17 11:11:12',
        location: '广州市广东工业大学'
      }, {
        img: require('../img/img.jpg'),
        name: '衣暖人心 旧衣捐赠 再利用环',
        time: '2017-10-17 11:11:12',
        location: '广州市广东工业大学'
      }, {
        img: require('../img/img.jpg'),
        name: '衣暖人心 旧衣捐赠 再利用环',
        time: '2017-10-17 11:11:12',
        location: '广州市广东工业大学'
      }, {
        img: require('../img/img.jpg'),
        name: '衣暖人心 旧衣捐赠 再利用环',
        time: '2017-10-17 11:11:12',
        location: '广州市广东工业大学'
      }],
      orgList: [
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
      sponsorList: [
        {
          id: 1,
          img: require('../img/img.jpg'),
          name: '恒大地产',
          money: 10000
        }
      ],
      volunteerList: [
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
      ]
    }
  }
  handleOpen = (page) => {
    window.open('/' + page + '.html', '_self')
  }
  componentWillMount(){
    fetch('/api/').then((res)=>{
      console.log(res)
    })
  }
  render() {
    return (
      <div>
        <Layout>
          <CHeader pageName={''} />
          <Layout style={{ background: 'white' }}>
            <Content style={{ padding: '20px 30px 0 70px' }}>
              <Card title="推荐活动" extra={<a href="#">More</a>} bordered={false} onClick={this.handleOpen.bind(this, 'activity_detail')}>
                <List
                  grid={{ xs: 1, sm: 1, md: 2 }}
                  dataSource={this.state.activityList}
                  renderItem={(item, idx) => (
                    <List.Item>
                      <Card className="introduce-card" hoverable bordered={false}>
                        <div className="introduce-card-img" style={{ backgroundImage: 'url(' + item.img + ')' }}></div>
                        <div className="introduce-card-block">
                          <h4>{item.name}</h4>
                          <p className="introduce-card-text">时间：{item.time}</p>
                          <p className="introduce-card-text">地点：{item.location}</p>
                        </div>
                      </Card>
                    </List.Item>
                  )}
                />
              </Card>
              <Card title="义工组织" extra={<a href="#">More</a>} bordered={false}>
                <List
                  dataSource={this.state.orgList}
                  renderItem={(item, idx) => (
                    <List.Item key={idx}>
                      <List.Item.Meta
                        avatar={<Avatar src={item.img} />}
                        title={<a href="https://ant.design">{item.name}</a>}
                        description={item.slogan}
                      />
                      <div style={{ flex: 1, paddingLeft: '20px' }}>
                        {
                          item.tags.map(item => {
                            return <Tag color="cyan" key={item.id}><a href="https://github.com/ant-design/ant-design/issues/1862">{item.name}</a></Tag>
                          })
                        }
                      </div>
                      <NumberInfo
                        subTitle={<span>义工人数</span>}
                        total={numeral(item.volunteerCount).format('0,0')}
                      />
                      <NumberInfo
                        style={{ marginLeft: '30px' }}
                        subTitle={<span>活动数</span>}
                        total={numeral(item.activityCount).format('0,0')}
                      />
                    </List.Item>
                  )}
                />
              </Card>
              <Card title="赞助商" bordered={false}>
                <List
                  grid={{ column: 3 }}
                  dataSource={this.state.sponsorList}
                  renderItem={(item, idx) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={item.img} />}
                        title={<a href="https://ant.design">{item.name}</a>}
                        description={'赞助总金额：' + item.money}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Content>
            <Sider width="300" style={{ background: 'white', padding: '0 20px' }}>
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
                  dataSource={this.state.volunteerList}
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
