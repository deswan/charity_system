import React, { Component } from 'react';
import './activity_detail.less';
import { Button, Avatar, Row, Col, Form, Input, Radio, DatePicker, Tag, Badge, Table, Divider, Pagination, Card, List, Modal, Upload, Icon, Select, message, Rate, InputNumber } from 'antd';
import numeral from 'numeral';
import moment from 'moment';
import { activity_status } from '../../config';
import DescriptionList from 'ant-design-pro/lib/DescriptionList';
import NumberInfo from 'ant-design-pro/lib/NumberInfo';
import PageHeader from 'ant-design-pro/lib/PageHeader';
import LargeDetailListItem from '../../components/LargeDetailListItem/LargeDetailListItem';
import { Steps } from 'antd';
import { req } from '../../helper';
const Step = Steps.Step;
const { Description } = DescriptionList;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const confirm = Modal.confirm;

class ActivityDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabKey: 'detail',
            editModal: {
                show: false,
                isAvatarUploading: false,
                avatarUrl: "",
                typeList: []
            },
            id: 0,
            name: '',
            img: '',
            tags: [],
            status: '0',
            start_time: '',
            end_time: '',
            location: '',
            recipientCount: 0,

            recruitCount: 0,
            sponsor_count: 0,

            create_time: '',
            volunteers: [],

            sponsors: [],
            comments: []
        }
    }
    handleOpen = (page) => {
        window.open('/' + page, '_self')
    }
    componentWillMount() {
        req({
            url: '/api/getAllTags'
        }).then((data) => {
            this.setState((state) => {
                state.editModal.typeList = data;
                return state;
            })
        }).catch((err) => {
            message.error(err.message);
        })
        let path = window.location.href.slice(0, window.location.href.lastIndexOf('#'));
        let id = parseInt(path.slice(path.lastIndexOf('/') + 1));
        console.log(id)
        this.setState({ orgId:id }, this.getData)
    }
    getData = () => {
        req({
            url: '/api/getActByIdInAdmin',
            params: {
                orgId: this.state.orgId,
                actId: this.props.match.params.id,
            }
        }).then((data) => {
            this.setState(data)
        }).catch((err) => {
            message.error(err.message);
        })
    }
    showModal = () => {
        this.props.form.setFieldsValue({
            name: this.state.name,
            date: [moment(this.state.start_time), moment(this.state.end_time)],
            location: this.state.location,
            recipient_number: this.state.recipient_number,
            tags: this.state.tags.map((tag) => {
                return tag.tagId
            })
        })
        this.setState(state => {
            state.editModal.show = true;
            state.editModal.avatarUrl = this.state.img;
            return state;
        });
    }
    handleEditOk = () => {
        this.props.form.validateFields((err, values) => {
            if (err) return;
            console.log(values);
            req({
                url: '/api/updateActProfile',
                type: 'post',
                params: {
                    actId: this.state.id,
                    img: this.state.editModal.avatarUrl,
                    start_time: values.date && values.date[0].format('YYYY-MM-DD H:m:s') || '',
                    end_time: values.date && values.date[1].format('YYYY-MM-DD H:m:s') || '',
                    name: values.name,
                    location: values.location,
                    recipient_number: values.recipient_number,
                    tags: values.tags.join(','),
                    orgId:this.state.orgId
                }
            }).then((data) => {
                message.success('修改成功');
                this.getData();
                this.setState((state) => {
                    state.editModal.show = false;
                    return state;
                })
            }).catch((err) => {
                message.error(err.message);
            })
        })
    }
    handleEditCancel = () => {
        this.setState(state => {
            state.editModal.show = false;
            return state;
        });
    }
    beforeUpload = (file) => {
        this.setState((state) => {
            state.editModal.isAvatarUploading = true;
            return state;
        })
    }
    handleUploadChange = ({ file, fileList, event }) => {
        if (file.status == 'done') {
            message.success('上传成功');
            this.setState((state) => {
                state.editModal.isAvatarUploading = false;
                state.editModal.avatarUrl = file.response;
                return state;
            })
        } else if (file.status == 'error') {
            message.error('上传失败');
            this.setState(state => {
                state.editModal.isAvatarUploading = false;
                return state;
            });
        }
    }
    handleTabChange = (key) => {
        this.setState({
            tabKey: key
        })
    }
    handleCancelAct = () => {
        let me = this;
        confirm({
            title: `确定取消活动 ${this.state.name} ?`,
            onOk() {
                req({
                    url: '/api/cancelAct',
                    type: 'post',
                    params: { actId: me.state.id,orgId:me.state.orgId }
                }).then((data) => {
                    message.success('取消活动成功');
                    me.getData();
                }).catch((err) => {
                    message.error(err.message)
                })
            }
        });
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
                sm: { span: 6 },
            },
            wrapperCol: {
                sm: { span: 18 },
            },
        };
        const uploadButton = (
            <div>
                <Icon type={this.state.editModal.isAvatarUploading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">上传</div>
            </div>
        );
        const tabList = [{
            key: 'detail',
            tab: '详情'
        }, {
            key: 'comments',
            tab: '评价'
        }];
        return (
            <div>
                <PageHeader
                    title={
                        <span>
                            {this.state.name}
                            <Badge style={{ marginLeft: '20px' }} status={activity_status[this.state.status].badge} text={activity_status[this.state.status].text} />
                        </span>
                    }
                    logo={<img src={this.state.img} />}
                    action={
                        <div>
                            <Button disabled={this.state.status != 0} type="primary" onClick={this.showModal}>编辑</Button>
                            <Button disabled={this.state.status != 0 && this.state.status != 1 && this.state.status != 2} type="danger" onClick={this.handleCancelAct}>取消活动</Button>
                        </div>
                    }
                    content={
                        <div>
                            <div style={{ marginBottom: '10px' }}>
                                {
                                    this.state.tags.map(item => {
                                        return <Tag color="cyan" key={item.tagId}>{item.tagName}</Tag>
                                    })
                                }
                            </div>
                            <DescriptionList size="small" col={2}>
                                <Description term="开始时间">{this.state.start_time}</Description>
                                <Description term="结束时间">{this.state.end_time}</Description>
                                <Description term="活动地点">{this.state.location}</Description>
                                <Description term="创建时间">{this.state.create_time}</Description>
                                <Description term="受助人数">{this.state.recipient_number}</Description>
                            </DescriptionList>
                        </div>
                    }
                    extraContent={
                        <div>
                            <NumberInfo
                                className="number-info"
                                subTitle={<span>义工数</span>}
                                total={this.state.vol_count}
                            />
                            <NumberInfo
                                className="number-info"
                                subTitle={<span>赞助金额</span>}
                                total={numeral(this.state.sponsor_count).format('0,0')}
                            />
                        </div>
                    }
                    breadcrumbList={breadcrumbList}
                    tabList={tabList}
                    onTabChange={this.handleTabChange}
                />
                {
                    this.state.tabKey == 'detail' ?
                        (
                            <div style={{ marginTop: '20px' }}>
                                <Card title="义工列表" bordered={false}>
                                    <List
                                        grid={{ column: 4 }}
                                        dataSource={this.state.volunteers}
                                        renderItem={(item, idx) => (
                                            <List.Item>
                                                <Avatar src={item.img} className="single-list-item-avatar" />
                                                <a href="https://ant.design" className="single-list-item-text">{item.name}</a>
                                            </List.Item>
                                        )}
                                    />
                                </Card>
                                <Card title="赞助商列表" style={{ marginTop: '20px' }} bordered={false}>
                                    <List
                                        grid={{ column: 4 }}
                                        dataSource={this.state.sponsors}
                                        renderItem={(item, idx) => (
                                            <List.Item>
                                                <List.Item.Meta
                                                    avatar={<Avatar src={item.logo} />}
                                                    title={item.name}
                                                    description={'赞助总金额：' + numeral(item.amount).format('0,0')}
                                                />
                                            </List.Item>
                                        )}
                                    />
                                </Card>
                            </div>
                        ) :
                        (
                            <List
                                style={{ marginTop: '20px' }}
                                dataSource={this.state.comments}
                                renderItem={(item, idx) => (
                                    <LargeDetailListItem
                                        avatar={<Avatar src={item.portrait} />}
                                        head={
                                            <div>
                                                <h4>{item.name}</h4>
                                                <p>{item.comment}</p>
                                            </div>
                                        }
                                        sider={
                                            <div>
                                                <Rate disabled defaultValue={item.score} />
                                                <p className="comment-sider-text">{item.score_time}</p>
                                            </div>
                                        }
                                        body={
                                            <div>
                                                {
                                                    item.photos &&
                                                    item.photos.map(img => {
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
                        )
                }

                <Modal title="编辑活动"
                    visible={this.state.editModal.show}
                    onOk={this.handleEditOk}
                    onCancel={this.handleEditCancel}
                >
                    <Form style={{ margin: '20px 50px' }} hideRequiredMark>
                        <FormItem
                            {...formItemLayout}
                            label="头像">
                            {getFieldDecorator('avatar', {})(
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="/api/uploadPhoto"
                                    onChange={this.handleUploadChange}
                                    beforeUpload={this.beforeUpload}
                                >
                                    {this.state.editModal.avatarUrl ? <img src={this.state.editModal.avatarUrl} alt="" style={{ maxWidth: '100px' }} /> : uploadButton}
                                </Upload>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="活动名称">
                            {getFieldDecorator('name', {
                                rules: [
                                    { required: true, message: '请输入活动名称' },
                                    { max: 30, message: '不超过30个字符' },
                                ]
                            })(
                                <Input />
                                )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="开始-结束时间">
                            {getFieldDecorator('date', {
                                rules: [{ required: true, message: '请填写开始-结束时间' }]
                            })(
                                <RangePicker />
                                )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="活动地点">
                            {getFieldDecorator('location', {
                                rules: [
                                    { required: true, message: '请填写活动地点' },
                                    { max: 50, message: '不超过50个字符' },
                                ],
                            })(
                                <Input prefix={<Icon type="environment-o" />} />
                                )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="活动类型">
                            {getFieldDecorator('tags', {
                                rules: [{ required: true, message: '请填写活动类型' }]
                            })(
                                <Select
                                    showSearch
                                    mode="multiple"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    optionFilterProp="children"
                                    // style={{ width: '100%' }}
                                    placeholder="请选择类型"
                                >
                                    {
                                        this.state.editModal.typeList.map(type => {
                                            return <Option key={type.id}>{type.name}</Option>
                                        })
                                    }
                                </Select>
                                )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="受助人数">
                            {getFieldDecorator('recipient_number', {
                                rules: [{ required: true, message: '请填写受助人数' }]
                            })(
                                <InputNumber min={1} />
                                )}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}
export default Form.create()(ActivityDetail)
