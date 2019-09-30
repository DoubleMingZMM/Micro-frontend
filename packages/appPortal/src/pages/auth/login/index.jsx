/**
 * title: 登录
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import LoginForm from './components/LoginForm';
import styles from './index.less';
import Logo from '@/assets/logo.png';
import store from 'store';
import bgImg from '@/assets/login-bg.jpg';

export const REMEMBER_KEY = 'login.remember';
export const USERNAME_KEY = 'login.username';

const Page = props => {
  const { dispatch, loading } = props;

  const [initialValue, setInitialValue] = useState({});

  useEffect(() => {
    const remember = store.get(REMEMBER_KEY, false);
    const username = store.get(USERNAME_KEY, '');
    setInitialValue({
      remember,
      username: remember && username ? username : '',
    });
  }, []);

  const handleSubmit = async values => {
    const { username, remember, password } = values;
    store.set(REMEMBER_KEY, remember);
    remember ? store.set(USERNAME_KEY, username) : store.set(USERNAME_KEY, '');
    // 提交后端
    await dispatch({ type: 'login/login', payload: { username, password } });
  };
  return (
    <>
      <img src={bgImg} alt="背景" className={styles.background} />
      <div className={styles.login}>
        <div className={styles.title}>
          <img src={Logo} alt="logo" />
          <h1>前端基座</h1>
        </div>
        <LoginForm
          {...props}
          onSubmit={handleSubmit}
          initialValue={initialValue}
          loading={loading}
        />
      </div>
    </>
  );
};

export default connect(({ login, loading }) => ({ login, loading: loading.global }))(Page);
