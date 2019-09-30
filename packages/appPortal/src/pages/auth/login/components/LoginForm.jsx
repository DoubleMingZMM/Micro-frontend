import React from 'react';
import { Form, Input, Icon, Checkbox, Button } from 'antd';

import styles from './LoginForm.less';

const LoginForm = props => {
  const { onSubmit, form, initialValue, loading } = props;
  const { getFieldDecorator } = form;

  const handleSubmit = async e => {
    e.preventDefault();
    await form.validateFields((err, values) => {
      if (!err) {
        onSubmit(values);
      }
    });
  };

  return (
    <Form className={styles.form} onSubmit={handleSubmit}>
      <Form.Item>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: '请输入用户名!' }],
          initialValue: initialValue.username,
        })(<Input prefix={<Icon type="user" />} placeholder="用户名" autoComplete="username" />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: '请输入密码!' }],
        })(
          <Input
            prefix={<Icon type="lock" />}
            type="password"
            placeholder="密码"
            autoComplete="current-password"
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: initialValue.remember,
        })(<Checkbox>记住用户名</Checkbox>)}
        <a className={styles.forgot} href="">
          忘记密码
        </a>
        <Button type="primary" htmlType="submit" className={styles.button} loading={loading}>
          登录
        </Button>
        或 <a href="">现在注册!</a>
      </Form.Item>
    </Form>
  );
};

export default Form.create({ name: 'normal_login' })(LoginForm);
