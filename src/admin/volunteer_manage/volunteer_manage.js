import React, { Component } from 'react';
import './volunteer_manage.less';
import { Button, Avatar, Row, Col, Form, Input, Radio, DatePicker, Tag, Badge, Table, Divider, Pagination } from 'antd';
import numeral from 'numeral';
import { activity_status } from '../../config';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;

class VolunteerManage extends Component {
    constructor(props) {
        super(props);
        this.state = {

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
    handleSearch = () => {

    }
    handleReset = () => {

    }
    onStatusChange = () => {

    }
    onDateChange = () => {

    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const data = [{
            id: '1',
            name: 'John Brown',
            age:123,
            gender:'女',
            activity_count:123
        }];
        return (
            <div>
                <Form
                    className="search-form"
                    layout="inline"
                    onSubmit={this.handleSearch}
                >
                    <Row gutter={48}>
                        <Col span={10}>
                            <FormItem label="名称" >
                                {getFieldDecorator('name')(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={4} style={{ textAlign: 'right' }}>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>重置</Button>
                        </Col>
                    </Row>
                </Form>
                <Table columns={[{
                    title: '姓名',
                    dataIndex: 'name',
                    render: text => <a href="#">{text}</a>,
                }, {
                    title: '年龄',
                    dataIndex: 'age',
                }, {
                    title: '性别',
                    dataIndex: 'gender',
                }, {
                    title: '参与活动数',
                    dataIndex: 'activity_count',
                }]} dataSource={data} pagination={
                    <Pagination defaultCurrent={6} total={500} />
                } />
            </div>
        );
    }
}
export default Form.create()(VolunteerManage)
