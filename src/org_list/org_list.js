import '../bootstrap.js';
import ReactDOM from 'react-dom';
import registerServiceWorker from '../registerServiceWorker';
import React, { Component } from 'react';
import './org_list.less';
import { Layout, Menu, Card, List, Button, Avatar, Tag } from 'antd';
import NumberInfo from 'ant-design-pro/lib/NumberInfo';
import TagSelect from 'ant-design-pro/lib/TagSelect';
import CHeader from '../components/CHeader/CHeader';
import numeral from 'numeral';
const { Header, Content, Footer, Sider } = Layout;

class OrgList extends Component {
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
                    recipientCount: 12346,
                    tags: [{
                        id: 10,
                        name: '爱老敬老'
                    }]
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
            }
        }
    }

    handleTagChange = (checkedTags) => {

    }

    handleOpen = (page) => {
        window.open('/' + page + '.html', '_self')
      }

    render() {
        return (
            <div class="org-list">
                <Layout style={{ background: 'white' }}>
                    <CHeader pageName="org_list" />
                    <Content className="content">
                        <TagSelect onChange={this.handleTagChange} expandable style={{ marginBottom: '20px' }}>
                            {
                                this.state.tags.map(item => {
                                    return <TagSelect.Option  value={item.id}>{item.name}</TagSelect.Option>
                                })
                            }
                        </TagSelect>
                        <List
                            pagination={this.state.pagination}
                            dataSource={this.state.orgs}
                            renderItem={(item, idx) => (
                                <List.Item key={idx}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.img} />}
                                        title={<a onClick={this.handleOpen.bind(this,'org_detail')}>{item.name}</a>}
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
                                        subTitle={<span>受助人数</span>}
                                        total={numeral(item.activityCount).format('0,0')}
                                    />
                                </List.Item>
                            )}
                        />
                    </Content>
                </Layout>
            </div>
        );
    }
}

ReactDOM.render(<OrgList />, document.getElementById('root'));
registerServiceWorker();

