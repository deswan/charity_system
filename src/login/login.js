import '../bootstrap.js';
import ReactDOM from 'react-dom';
import registerServiceWorker from '../registerServiceWorker';
import React, { Component } from 'react';
import './login.less';
import CHeader from '../components/CHeader/CHeader';
import { Form, Icon, Input, Button, Checkbox, Layout, Tabs,message } from 'antd';
import { req } from '../helper';
const { TabPane } = Tabs;
const { Content, Sider } = Layout;
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        req({
          url: '/api/login',
          type:'post',
          params: {
            account: values.account,
            password: values.password
          }
        }).then((data) => {
          if(data.code == 0){
            console.log('login success')
            window.location = document.referrer;
          }
        }).catch((err) => {
          message.error(err.message)
        })
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout className="login">
        <CHeader />
        <Content className="login-content">
          <div className="form-wrapper">
            <Tabs defaultActiveKey="1">
              <TabPane tab="邮箱/手机号登陆" key="1">
                <Form onSubmit={this.handleSubmit} className="login-form">
                  <FormItem>
                    {getFieldDecorator('account', {
                      rules: [{ required: true, message: '请输入邮箱或手机号' }],
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
            </Tabs>
          </div>
        </Content>
      </Layout >
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

ReactDOM.render(<WrappedNormalLoginForm />, document.getElementById('root'));