import '../bootstrap.js';
import ReactDOM from 'react-dom';
import registerServiceWorker from '../registerServiceWorker';
import React, { Component } from 'react';
import './index.less';
import { Layout, Menu, Card, List, Button, Avatar, Tag, Row, Icon, message, Pagination } from 'antd';
import NumberInfo from 'ant-design-pro/lib/NumberInfo';
import TagSelect from 'ant-design-pro/lib/TagSelect';
import CHeader from '../components/CHeader/CHeader';
import ActivityCard from '../components/ActivityCard/ActivityCard';
import ActivitySource from '../components/ActivitySource/ActivitySource';
import { req } from '../helper';
import numeral from 'numeral';
const { Header, Content, Footer, Sider } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedTags: [],
      tags: [],
      activities: [],
      pagination: {
        current: 1,
        total: 100,
        hideOnSinglePage: true,
        onChange(page) {
          let pagination = this.state.pagination;
          pagination.current = page;
          this.setState({ pagination }, this.getActData)
        }
      },
      reviewActivities: []
    }
  }
  handleOpen = (page) => {
    window.open('/' + page, '_self')
  }
  componentWillMount = () => {
    req({
      url: '/api/getCurrentActTags'
    }).then((data) => {
      this.setState({
        tags: data
      })
    }).catch((err) => {
      message.error(err.message)
    })
    req({
      url: '/api/getActReviewList'
    }).then((data) => {
      this.setState({
        reviewActivities: data
      })
    }).catch((err) => {
      message.error(err.message)
    })
    this.getActData();
  }
  handleTagChange = (checkedTags) => {
    this.setState({ checkedTags }, this.getActData)
  }
  getActData = () => {
    req({
      url: '/api/getActList',
      params: {
        page: this.state.pagination.current,
        tag: this.state.checkedTags.join(',')
      }
    }).then((data) => {
      let pagination = this.state.pagination;
      pagination.total = data.total;
      this.setState({
        activities: data.rows,
        pagination
      })
    }).catch((err) => {
      message.error(err.message)
    })
  }
  render() {
    return (
      <div>
        <Layout style={{ background: 'white' }}>
          <CHeader pageName="index" />
          <Content class="content">
          {
            this.state.tags && 
            <TagSelect onChange={this.handleTagChange} expandable style={{ marginBottom: '20px' }}>
              {
                this.state.tags.map(item => {
                  return <TagSelect.Option value={item.id}>{item.name}</TagSelect.Option>
                })
              }
            </TagSelect>
          }
            
            <Row>
              <List
                grid={{ xs: 1, md: 4, gutter: 24 }}
                dataSource={this.state.activities}
                pagination={this.state.pagination}
                renderItem={(item, idx) => (
                  <List.Item>
                    <ActivityCard onClick={this.handleOpen.bind(this, 'activity/' + item.id)} img={item.img} name={item.name} time={item.start_time} location={item.location} />
                  </List.Item>
                )}
              />
            </Row>
            <Card title="往期精彩活动" bordered={false}>
              <Row>
                <List
                  grid={{ gutter: 16, xs: 1, md: 4 }}
                  dataSource={this.state.reviewActivities}
                  renderItem={(item, idx) => (
                    <List.Item>
                      <div onClick={this.handleOpen.bind(this, 'activity/' + item.id)} class="previous-act" style={{ backgroundImage: 'url(' + item.img + ')' }}>
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
        </Layout>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
