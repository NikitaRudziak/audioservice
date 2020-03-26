import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Header } from '../../components/Header';
import { Input } from '../common/Input';

import style from './Login.module.scss';

export const Login = () => (
  <div className={style.Login}>
    <Header />
    <div className={style.Login__card}>
      <form action="">
        <Input
          type='text'
          placeholder='test'
        >
        </Input>
      </form>
    </div>
  </div>
)

export default withRouter(connect(null, null)(Login));
