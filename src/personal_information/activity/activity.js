import React, { Component } from 'react';
import './activity.less';
import { Avatar, Form, Input, Button, Icon, Popover, Tabs, List, Row, Col, Badge, DatePicker, Divider, Select, Tag, message, Modal, Rate, Upload, InputNumber } from 'antd';
import TagSelect from 'ant-design-pro/lib/TagSelect';
import { req } from '../../helper';
let ACTIVITYS_STATUS = require('../../config.json').activity_status;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Option } = Select;
const FormItem = Form.Item;
const confirm = Modal.confirm;
const { TextArea } = Input;

class Activity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: '',
                startTime: '',
                endTime: ''
            },
            scoreModal: {
                actId: '',
                actName: '',
                show: false,
                isAvatarUploading: false,
                avatarUrl: "",
                fileList: []
            },
            loading: false,
            tabKey: '0',
            showTab: true,
            data: [],
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
    handleOpen = (page) => {
        window.open('/' + page, '_self')
    }
    onTabChange = (tabKey) => {
        this.setState({ tabKey }, this.getData)
    }
    componentWillMount() {
        this.getData();
    }
    handleQuit = (row) => {
        let me = this;
        confirm({
            title: `确定退出活动 ${row.name} ?`,
            onOk() {
                req({
                    url: '/api/quitAct',
                    type: 'post',
                    params: { actId: row.id }
                }).then((data) => {
                    message.success('退出活动成功');
                    me.getData();
                }).catch((err) => {
                    message.error(err.message)
                })
            }
        });
    }
    getData = () => {
        this.setState({ loading: true })
        req({
            url: '/api/getMyActs',
            params: {
                status: this.state.tabKey,
                page: this.state.pagination.current,
                name: this.state.form.name,
                startTime: this.state.form.startTime,
                endTime: this.state.form.endTime
            }
        }).then((data) => {
            this.setState({ loading: false })
            let pagination = this.state.pagination;
            pagination.total = data.total;
            this.setState({
                data: data.rows,
                pagination
            })
        }).catch((err) => {
            this.setState({ loading: false })
            message.error(err.message)
        })
    }
    beforeUpload = (file) => {
        this.setState((state) => {
            state.scoreModal.isAvatarUploading = true;
            return state;
        })
    }
    handleUploadChange = ({ fileList }) => this.setState(state=>{
        state.scoreModal.fileList = fileList;
        return state;
    })
    handleScore = (row) => {
        this.setState((state) => {
            state.scoreModal.show = true;
            state.scoreModal.actId = row.id;
            state.scoreModal.actName = row.name;
            return state;
        })
    }
    handleScoreOk = () => {
        let scoreModal = this.state.scoreModal;
        this.props.form.validateFields((err, values) => {
            if (err) return;
            console.log(values);
            req({
                url: '/api/score',
                type: 'post',
                params: {
                    actId: scoreModal.actId,
                    comment: values.comment || '',
                    score: values.score,
                    photos: scoreModal.fileList.map(file=>{
                        return file.response
                    }).join()
                }
            }).then((data) => {
                message.success('评价成功');
                this.getData();
                this.setState((state) => {
                    state.scoreModal.show = false;
                    return state;
                })
            }).catch((err) => {
                message.error(err.message);
            })
        })
    }
    handleScoreCancel = () => {

    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const breadcrumbList = [{
            title: '活动管理',
            href: '#/activity-manage',
        }, {
            title: this.state.name
        }];
        const formItemLayout = {
            labelCol: {
                sm: { span: 4 },
            },
            wrapperCol: {
                sm: { span: 20 },
            },
        };
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="c-activity">
                {/* <Form
                    layout="inline"
                    onSubmit={this.handleSearch}
                >
                    <FormItem label="活动日期">
                        {getFieldDecorator('date')(
                            <RangePicker />
                        )}
                    </FormItem>
                    <FormItem label="活动名称">
                        {getFieldDecorator('name')(
                            <Input placeholder="placeholder" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" style={{ marginRight: '10px' }} onClick={this.handleSearch}>查询</Button>
                        <Button onClick={this.handleReset}>重置</Button>
                    </FormItem>
                </Form> */}
                <Tabs defaultActiveKey={this.state.tabKey} onChange={this.onTabChange}>
                    <TabPane tab="未开始" key="0"></TabPane>
                    <TabPane tab="已结束" key="1"></TabPane>
                </Tabs>
                <List
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    itemLayout="horizontal"
                    dataSource={this.state.data}
                    renderItem={item => (
                        <List.Item actions={
                            [
                                this.state.tabKey == '0' ?
                                    <Button size="small" onClick={this.handleQuit.bind(this, item)}>退出</Button> :
                                    item.status === 3 ?
                                        !item.isScored ?
                                            <Button type="primary" size="small" onClick={this.handleScore.bind(this, item)} >评价</Button> :
                                            <span>已评价</span> :
                                        null
                            ]
                        }>
                            <List.Item.Meta
                                title={
                                    <span>
                                        <a href={`/activity/${item.id}`} style={{ marginRight: '10px' }}>{item.name}</a>
                                        {
                                            item.tags.map(item => {
                                                return <Tag color="cyan" key={item.tagId}>{item.tagName}</Tag>
                                            })
                                        }
                                    </span>
                                }
                            />
                            <div className="list-item-extra">
                                <div>开始时间</div>
                                <div>{item.start_time}</div>
                            </div>
                            <div className="list-item-extra">
                                <div>结束时间</div>
                                <div>{item.end_time}</div>
                            </div>
                            <div className="list-item-extra">
                                <div>活动地点</div>
                                <div>{item.location}</div>
                            </div>
                            <div className="list-item-extra">
                                <div>活动状态</div>
                                <div> <Badge status={ACTIVITYS_STATUS[item.status].badge} text={ACTIVITYS_STATUS[item.status].text} /> </div>
                            </div>
                        </List.Item>
                    )}
                />
                <Modal title={`评价活动${this.state.scoreModal.actName}`}
                    visible={this.state.scoreModal.show}
                    onOk={this.handleScoreOk}
                    onCancel={this.handleScoreCancel}
                >
                    <Form>
                        <FormItem
                            {...formItemLayout}
                            label="打分">
                            {getFieldDecorator('score', {
                                rules: [{ required: true, message: '请打分' }]
                            })(
                                <Rate />
                                )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="评论">
                            {getFieldDecorator('comment')(
                                <TextArea rows={4} />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="照片">
                            {getFieldDecorator('avatar')(
                                <Upload
                                    action="/api/uploadPhoto"
                                    listType="picture-card"
                                    fileList={this.state.scoreModal.fileList}
                                    beforeUpload={this.beforeUpload}
                                    onChange={this.handleUploadChange}
                                >
                                    {this.state.scoreModal.fileList.length >= 4 ? null : uploadButton}
                                </Upload>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}
export default Form.create()(Activity);