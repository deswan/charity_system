import '../bootstrap.js';
import ReactDOM from 'react-dom';
import registerServiceWorker from '../registerServiceWorker';
import React, { Component } from 'react';
import './login.less';
import CHeader from '../components/CHeader/CHeader';
import { Form, Icon, Input, Button, Checkbox, Layout, Tabs } from 'antd';
const { TabPane } = Tabs;
const { Content, Sider } = Layout;
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout class="login">
        <CHeader />
        <Content className="login-content">
          <div className="form-wrapper">
            <Tabs defaultActiveKey="1">
              <TabPane tab="邮箱登陆" key="1">
                <Form onSubmit={this.handleSubmit} className="login-form">
                  <FormItem>
                    {getFieldDecorator('userName', {
                      rules: [{ required: true, message: '请输入邮箱' }],
                    })(
                      <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="邮箱" />
                      )}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('password', {
                      rules: [{ required: true, message: '请输入密码' }],
                    })(
                      <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                      )}
                  </FormItem>
                  <FormItem>
                    <a className="login-form-forgot" href="">忘记密码</a>
                    <Button type="primary" htmlType="submit" className="login-form-button"> 登陆 </Button>
                    <div style={{ textAlign: 'right' }}>
                      or <a href="">注册</a>
                    </div>
                  </FormItem>
                </Form>
              </TabPane>
              <TabPane tab="手机号登陆" key="2">
              <Form onSubmit={this.handleSubmit} className="login-form">
                  <FormItem>
                    {getFieldDecorator('userName', {
                      rules: [{ required: true, message: '请输入手机号' }],
                    })(
                      <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号" />
                      )}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('password', {
                      rules: [{ required: true, message: '请输入密码' }],
                    })(
                      <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                      )}
                  </FormItem>
                  <FormItem>
                    <a className="login-form-forgot" href="">忘记密码</a>
                    <Button type="primary" htmlType="submit" className="login-form-button"> 登陆 </Button>
                    <div style={{ textAlign: 'right' }}>
                      or <a href="">注册</a>
                    </div>
                  </FormItem>
                </Form>
              </TabPane>
            </Tabs>
          </div>
        </Content>
      </Layout >
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

ReactDOM.render(<WrappedNormalLoginForm />, document.getElementById('root'));