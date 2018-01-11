import '../bootstrap.js';
import ReactDOM from 'react-dom';
import registerServiceWorker from '../registerServiceWorker';
import React, { Component } from 'react';
import './org.less';
import { Layout, Menu, Card, List, Button, Avatar, Tag, Row, Col, Badge, Rate, message, Popover, Form,Input } from 'antd';
import NumberInfo from 'ant-design-pro/lib/NumberInfo';
import PageHeader from 'ant-design-pro/lib/PageHeader';
import DescriptionList from 'ant-design-pro/lib/DescriptionList';
import CHeader from '../components/CHeader/CHeader';
import ActivitySource from '../components/ActivitySource/ActivitySource';
import ActivityCard from '../components/ActivityCard/ActivityCard';
import LargeDetailListItem from '../components/LargeDetailListItem/LargeDetailListItem';
import numeral from 'numeral';
import { req } from '../helper';

const { Header, Content, Footer, Sider } = Layout;
const { Description } = DescriptionList;
const FormItem = Form.Item;
const { TextArea } = Input;

class Org extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 23,
            userStatus: 'NOT_LOGIN',
            name: '',
            img: '',
            slogan: '0',
            recipientCount: 0,
            volunteerCount: 0,
            tags: [],
            currentActivities: [],
            previousActivities: [],
            isShowJoin:false
        }
    }
    componentWillMount = () => {
        let id = parseInt(window.location.href.slice(window.location.href.lastIndexOf('/') + 1));
        req({
            url: '/api/getOrgById',
            params: { id }
        }).then((data) => {
            this.setState(data)
        }).catch((err) => {
            message.error(err.message)
        })
    }
    handleOpen = (page) => {
        window.open('/' + page, '_self')
    }
    handleJoinVisibleChange = (visible) => {
        this.setState({
            isShowJoin: visible
        });
    }
    handleSubmitApply = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                req({
                    url: '/api/applyOrg',
                    type: 'post',
                    params: {
                        orgId: this.state.id,
                        text: values['apply-text']
                    }
                }).then((data) => {
                    if (data.code === 0) {
                        message.success('申请已提交');
                        this.setState({
                            isShowJoin: false
                        });
                        this.props.form.setFieldsValue({
                            'apply-text': ''
                        })
                    }
                }).catch((err) => {
                    message.error(err.message)
                })
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
        };
        return (
            <div className="org-detail">
                <Layout>
                    <CHeader />
                    <Content className="center-content">
                        <PageHeader
                            logo={<img alt="" src={this.state.logo} />}
                            title={
                                this.state.name
                            }
                            action={
                                <Popover
                                    content={
                                        this.state.userStatus == 'NOT_LOGIN' ?
                                            (<span>您还未登陆，现在 <a onClick={this.handleOpen.bind(this, 'login')}>登陆</a></span>) :
                                            (<Form onSubmit={this.handleSubmitApply}>
                                                <FormItem
                                                    label="申请理由"
                                                    {...formItemLayout}
                                                >
                                                    {getFieldDecorator('apply-text', {
                                                        rules: [{ max: 300, message: '不超过300个字符' }, { required: true, message: '不能为空' }],
                                                        placeholder: '不超过300个字符'
                                                    })(
                                                        <TextArea />
                                                        )}
                                                </FormItem>
                                                <div style={{ textAlign: 'right' }}>
                                                    <Button htmlType="submit" type="primary" size="small" >申请</Button>
                                                </div>
                                            </Form>)
                                    }
                                    title="参与活动"
                                    placement="leftTop"
                                    visible={this.state.isShowJoin}
                                    trigger="click"
                                    onVisibleChange={this.handleJoinVisibleChange}
                                >
                                    {
                                        this.state.userStatus == 'NOT_JOIN' || this.state.userStatus == 'NOT_LOGIN' ?
                                            (<Button type="primary">加入</Button>) :
                                            (<span>您已加入该组织</span>)
                                    }
                                </Popover>
                            }
                            content={
                                <div>
                                    <Description>{this.state.slogan}</Description>
                                    <div style={{ margin: '20px 0' }}>
                                        {
                                            this.state.tags.map(item => {
                                                return <Tag color="cyan" key={item.tagId}><span>{item.tagName}</span></Tag>
                                            })
                                        }
                                    </div>
                                </div>
                            }
                            extraContent={
                                <div>
                                    <NumberInfo
                                        className="number-info"
                                        subTitle={<span>义工人数</span>}
                                        total={numeral(this.state.vol_count).format('0,0')}
                                    />
                                    <NumberInfo
                                        className="number-info"
                                        subTitle={<span>受助人数</span>}
                                        total={numeral(this.state.recipient_count).format('0,0')}
                                    />
                                </div>
                            }
                        />
                        <Card title="当前活动" bordered={false} style={{ marginTop: '24px' }}>
                            <Row>
                                <List
                                    grid={{ xs: 1, md: 4, gutter: 16 }}
                                    dataSource={this.state.currentActs}
                                    renderItem={(item, idx) => (
                                        <List.Item style={{ alignItems: 'flex-start' }}>
                                            <ActivityCard onClick={this.handleOpen.bind(this, 'activity/' + item.id)} img={item.img} name={item.name} time={item.start_time} location={item.location} />
                                        </List.Item>
                                    )}
                                />
                            </Row>
                        </Card>
                        <Card title="往期活动" bordered={false} style={{ marginTop: '24px' }}>
                            <List
                                dataSource={this.state.previousActs}
                                renderItem={(item, idx) => (
                                    <LargeDetailListItem
                                        siderWidth="200px"
                                        headmMinHeight="80px"
                                        head={
                                            <div>
                                                <h2>{item.name}</h2>
                                                <div>
                                                    {
                                                        item.tags.map(item => {
                                                            return <Tag color="cyan" key={item.tagId}><span>{item.tagName}</span></Tag>
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        }
                                        sider={
                                            <div>
                                                <Rate disabled defaultValue={item.rate} style={{ display: 'inline-block', verticalAlign: 'middle' }} />
                                            </div>
                                        }
                                        body={
                                            <div>
                                                {
                                                    item.photos &&
                                                    item.photos.split(',').map(img => {
                                                        return (
                                                            <div className="comment-imgContainer">
                                                                <img src={img} alt="" />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        }
                                    />
                                )}
                            />
                        </Card>
                    </Content>
                </Layout>
            </div >
        );
    }
}
const OrgWrapper = Form.create()(Org);
ReactDOM.render(<OrgWrapper />, document.getElementById('root'));
registerServiceWorker();
