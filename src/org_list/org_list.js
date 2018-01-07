import '../bootstrap.js';
import ReactDOM from 'react-dom';
import registerServiceWorker from '../registerServiceWorker';
import React, { Component } from 'react';
import './org_list.less';
import { Layout, Menu, Card, List, Button, Avatar, Tag, message } from 'antd';
import NumberInfo from 'ant-design-pro/lib/NumberInfo';
import TagSelect from 'ant-design-pro/lib/TagSelect';
import CHeader from '../components/CHeader/CHeader';
import numeral from 'numeral';
import { req } from '../helper';
const { Header, Content, Footer, Sider } = Layout;

class OrgList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedTags: [],
            tags: [],
            orgs: [],
            pagination: {
                pageSize: 15,
                current: 1,
                total: 0,
                onChange: ((page) => {
                    let pagination = this.state.pagination;
                    pagination.current = page;
                    this.setState({ pagination });
                    setTimeout(this.getData.bind(this), 0);
                }),
            }
        }
    }
    componentWillMount = () => {
        req({
            url: '/api/getOrgTags'
        }).then((data) => {
            this.setState({
                tags: data
            })
        }).catch((err) => {
            message.error(err.message)
        })
        this.getData();
    }

    handleTagChange = (checkedTags) => {
        this.setState({ checkedTags },this.getData)
    }

    getData = () => {
        req({
            url: '/api/getOrgList',
            params: {
                page: this.state.pagination.current,
                tag: this.state.checkedTags.join(',')
            }
        }).then((data) => {
            let pagination = this.state.pagination;
            pagination.total = data.total;
            this.setState({
                orgs: data.rows,
                pagination
            })
        }).catch((err) => {
            message.error(err.message)
        })
    }

    handleOpen = (page) => {
        window.open('/' + page, '_self')
    }

    render() {
        return (
            <div className="org-list">
                <Layout style={{ background: 'white' }}>
                    <CHeader pageName="org_list" />
                    <Content className="content">
                        <TagSelect onChange={this.handleTagChange} expandable style={{ marginBottom: '20px' }}>
                            {
                                this.state.tags.map(item => {
                                    return <TagSelect.Option value={item.id} key={item.id}>{item.name}</TagSelect.Option>
                                })
                            }
                        </TagSelect>
                        <List
                            pagination={this.state.pagination}
                            dataSource={this.state.orgs}
                            renderItem={(item, idx) => (
                                <List.Item key={idx}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.logo} />}
                                        title={<a onClick={this.handleOpen.bind(this, 'org/'+item.id)}>{item.name}</a>}
                                        description={item.slogan}
                                    />
                                    <div style={{ flex: 1, paddingLeft: '20px' }}>
                                        {
                                            item.tags.map(item => {
                                                return <Tag color="cyan" key={item.tagId}>{item.tagName}</Tag>
                                            })
                                        }
                                    </div>
                                    <NumberInfo
                                        subTitle={<span>义工人数</span>}
                                        total={numeral(item.vol_count).format('0,0')}
                                    />
                                    <NumberInfo
                                        style={{ marginLeft: '30px' }}
                                        subTitle={<span>受助人数</span>}
                                        total={numeral(item.recipient_count).format('0,0')}
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

