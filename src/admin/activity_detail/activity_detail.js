import React, { Component } from 'react';
import './activity_detail.less';
import { Button, Avatar, Row, Col, Form, Input, Radio, DatePicker, Tag, Badge, Table, Divider, Pagination, Card, List, Modal, Upload, Icon, Select, message, Rate } from 'antd';
import numeral from 'numeral';
import { activity_status } from '../../config';
import DescriptionList from 'ant-design-pro/lib/DescriptionList';
import NumberInfo from 'ant-design-pro/lib/NumberInfo';
import PageHeader from 'ant-design-pro/lib/PageHeader';
import LargeDetailListItem from '../../components/LargeDetailListItem/LargeDetailListItem';
import { Steps } from 'antd';
const Step = Steps.Step;
const { Description } = DescriptionList;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;

class ActivityDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabKey: 'detail',
            editModal: {
                show: false,
                isAvatarUploading: false,
                avatarUrl: "",
                typeList: [
                    {
                        id: 1,
                        name: 'tag1'
                    }
                ],
                name: {
                    value: 123,
                    isEdit: false
                },
                slogan: {
                    value: 123,
                    isEdit: false
                },
                tags: {
                    value: [
                        {
                            id: 213,
                            name: 'tag1'
                        }
                    ],
                    isEdit: false
                }
            },
            id: 23,
            name: 'asdsda',
            img: require('../../img/img.jpg'),
            tags: [{
                id: 10,
                name: '爱老敬老'
            }],
            status: '0',
            start_time: '2017-10-17 11:11:12',
            end_time: '2017-10-17 11:11:12',
            location: '广州市广东工业大学',
            recipientCount: 123,
            recruitCount: 3243,
            joinedCount: 123,
            sponsor_count: 132423,

            orgImg: require('../../img/img.jpg'),
            orgName: '爱之花',
            orgSlogan: '啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
            orgHelpedCount: 134432,
            create_time: '2017-10-17 11:11:12',
            volunteerCount: 12334,
            volunteers: [
                {
                    id: 123,
                    img: require('../../img/img.jpg'),
                    name: '花花'
                }
            ],
            sponsors: [
                {
                    id: 1,
                    img: require('../../img/img.jpg'),
                    name: '恒大地产',
                    money: 1234
                }
            ],
            comments: [
                {
                    id: 1,
                    userImg: require('../../img/img.jpg'),
                    imgs: [
                        require('../../img/img.jpg'),
                        require('../../img/img.jpg'),
                    ],
                    detail: '恒阿斯顿撒多撒多大地产',
                    name: '花花',
                    time: '1023-10-14',
                    rate: 2
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
    showModal = () => {
        this.setState(state => {
            state.editModal.show = true;
            return state;
        });
    }
    handleEditOk = () => {
        this.setState(state => {
            state.editModal.show = false;
            return state;
        });
    }
    handleEditCancel = () => {
        this.setState(state => {
            state.editModal.show = false;
            return state;
        });
    }
    handleUploadChange = ({ file, fileList, event }) => {
        if (file.status == 'done') {
            message.success('上传成功');

        } else if (file.status == 'error') {
            message.error('上传失败');
        }
    }
    handleEdit = (field) => {
        this.setState((prev) => {
            prev.editModal[field].isEdit = true
            return prev;
        })
    }
    handleCommit = (field) => {
        this.setState((prev) => {
            prev.editModal[field].isEdit = false
            return prev;
        })
    }
    handleCancel = (field) => {
        this.setState((prev) => {
            prev.editModal[field].isEdit = false
            return prev;
        })
    }
    handleTabChange = (key)=>{
        this.setState({
            tabKey:key
        })
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
                <Icon type={this.state.isAvatarUploading ? 'loading' : 'plus'} />
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
                    title={this.state.name}
                    logo={<img src={this.state.img} />}
                    action={
                        <div>
                            <Button type="primary" onClick={this.showModal}>编辑</Button>
                            <Button type="danger">取消活动</Button>
                        </div>
                    }
                    content={
                        <div>
                            <div style={{ marginBottom: '10px' }}>
                                {
                                    this.state.tags.map(item => {
                                        return <Tag color="cyan" key={item.id}>{item.name}</Tag>
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
                                total={this.state.volunteerCount}
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
                            <div style={{marginTop:'20px'}}>
                                <Card title="活动状态" bordered={false}>
                                    <Steps current={1} progressDot>
                                        <Step title="未开始" description={this.state.create_time} />
                                        <Step title="预备中" description="This is a description." />
                                        <Step title="进行中" description="This is a description." />
                                        <Step title="已完成" description="This is a description." />
                                    </Steps>
                                </Card>
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
                                                    avatar={<Avatar src={item.img} />}
                                                    title={item.name}
                                                    description={'赞助总金额：' + numeral(item.money).format('0,0')}
                                                />
                                            </List.Item>
                                        )}
                                    />
                                </Card>
                            </div>
                        ) :
                        (
                            <List
                                style={{marginTop:'20px'}}
                                dataSource={this.state.comments}
                                renderItem={(item, idx) => (
                                    <LargeDetailListItem
                                        avatar={<Avatar src={item.userImg} />}
                                        head={
                                            <div>
                                                <h4>{item.name}</h4>
                                                <p>{item.detail}</p>
                                            </div>
                                        }
                                        sider={
                                            <div>
                                                <Rate disabled defaultValue={item.rate} />
                                                <p className="comment-sider-text">{item.time}</p>
                                            </div>
                                        }
                                        body={
                                            <div>
                                                {
                                                    item.imgs.map(img => {
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
                                >
                                    {this.state.editModal.avatarUrl ? <img src={this.state.editModal.avatarUrl} alt="" /> : uploadButton}
                                </Upload>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="组织名称">
                            {this.state.editModal.name.isEdit ?
                                (
                                    <span>
                                        {getFieldDecorator('name', {
                                            rules: [
                                                { required: true, message: '请输入组织名称' },
                                                { max: 30, message: '不超过30个字符' }
                                            ],
                                            initialValue: this.state.editModal.name.value
                                        })(
                                            <Input style={{ width: '50%' }} />
                                            )}
                                        < a className="edit-commit-btn" onClick={this.handleCommit.bind(this, 'name')}>确定</a>
                                        < a className="edit-commit-btn" onClick={this.handleCancel.bind(this, 'name')}>取消</a>
                                    </span>
                                ) :
                                (
                                    <span>
                                        {this.state.editModal.name.value}
                                        < a className="edit-btn" onClick={this.handleEdit.bind(this, 'name')}><Icon type="edit" /></a>
                                    </span>
                                )

                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="slogan">
                            {this.state.editModal.slogan.isEdit ?
                                (
                                    <span>
                                        {getFieldDecorator('slogan', {
                                            rules: [
                                                { required: true, message: '请输入slogan' },
                                                { max: 50, message: '不超过50个字符' }
                                            ],
                                            initialValue: this.state.editModal.slogan.value
                                        })(
                                            <Input style={{ width: '50%' }} />
                                            )}
                                        < a className="edit-commit-btn" onClick={this.handleCommit.bind(this, 'slogan')}>确定</a>
                                        < a className="edit-commit-btn" onClick={this.handleCancel.bind(this, 'slogan')}>取消</a>
                                    </span>
                                ) : (
                                    <span>
                                        {this.state.editModal.slogan.value}
                                        < a className="edit-btn" onClick={this.handleEdit.bind(this, 'slogan')}><Icon type="edit" /></a>
                                    </span>
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="组织类型">
                            {this.state.editModal.tags.isEdit ?
                                (
                                    <span>
                                        {getFieldDecorator('tags', {
                                            rules: [{ required: true, message: '请选择组织类型' }],
                                            initialValue: this.state.editModal.tags.value.map(tag => {
                                                return tag.id
                                            }).join(',')
                                        })(
                                            <Select
                                                mode="tags"
                                                style={{ width: '70%' }}
                                            >
                                                {
                                                    this.state.editModal.typeList.map(type => {
                                                        return <Option key={type.id} value={type.id}>{type.name}</Option>
                                                    })
                                                }
                                            </Select>
                                            )}
                                        < a className="edit-commit-btn" onClick={this.handleCommit.bind(this, 'tags')}>确定</a>
                                        < a className="edit-commit-btn" onClick={this.handleCancel.bind(this, 'tags')}>取消</a>
                                    </span>
                                ) :
                                (
                                    <span>
                                        {this.state.editModal.tags.value.map(item => {
                                            return <Tag color="cyan" key={item.id}>{item.name}</Tag>
                                        })}
                                        <a className="edit-btn" onClick={this.handleEdit.bind(this, 'tags')}><Icon type="edit" /></a>
                                    </span>
                                )
                            }
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}
export default Form.create()(ActivityDetail)
