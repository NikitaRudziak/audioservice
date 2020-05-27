import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from '../../axios';
import { changePage } from '../../redux/actions';
import { setNickName, setID, initAttention } from '../../redux/actions';

import { Header } from '../../components/Header';
import { Text } from '../common/Text';
import { Input } from '../common/Input';
import CurrentTrack from '../../components/CurrentTrack/CurrentTrack';
// import { Button } from '../common/Input';

import style from './Login.module.scss';

export const Login = ({changePageAction, setNickNameAction, setIDAction, nickName, id, initAttentionAction}) => {

  const [signType, setSignType] = useState(true);
  const [data, setData] = useState({ user: [] });
  const [checkId, setCheckId] = useState(true);

  useEffect(()=> {
    axios.get('/users.json')
    .then(response => setData({user: response.data}))
    .catch(error => console.log(error));
  }, [])

  useEffect(()=> {
    console.log(signType)
    if(signType) {
    axios.get('/users.json')
    .then(response => setData({user: response.data}))
    .catch(error => console.log(error));
    }
  }, [signType])

  const handleChangeType = () => {
    setSignType(!signType);
  }

  const goToCabinet = () => {
    changePageAction('CABINET');
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (signType) {
      Object.keys(data.user).map(item => {
        if (data.user[item].nickName === event.target.nickName.value &&
            data.user[item].password === event.target.password.value) {
              setNickNameAction(data.user[item].nickName);
              setIDAction(item);
              goToCabinet();
        }
      });
    } else {
      const user = {
        nickName: event.target.nickName.value,
        password: event.target.password.value,
        email: event.target.email.value,
      }
      axios.post('/users.json', user)
        .then(response => {console.log(response); setSignType(!signType);})
        .catch(error => console.log(error));
    }
    if(!checkId) {
      initAttentionAction('Username or password is incorrect', 'attention');
    }
  };

  useEffect(() => {
    return() => {
      initAttentionAction('none', '');
    }
  }, [])

  // useEffect(() => {
  //   if(!checkId) {
  //     initAttentionAction('Username or password is incorrect');
  //   }
  // }, [checkId])

  return (
    <div className={style.Login}>
      <div className={style.Login__box}>
        <form className={style.Login__form} onSubmit={(event) => handleSubmit(event)}>
          <h1>Login</h1>
          <input type="text" name="nickName" placeholder="Username" required />
          {signType ? null : <input type="text" name="email" placeholder="Email" required /> }
          <input type="password" name="password" placeholder="Password" required />
          <input type="submit" name="Login" value="Login" />
          <div className={style.Login__links}>
            <div>Forgot Password</div>
            {signType ? <div onClick={handleChangeType}>Sign Up</div> : <div onClick={handleChangeType}>Sign in</div>}
          </div>
        </form>
      </div>
    </div>
  )
};

const mapStateToProps = state => {
  return {
    id: state.loginReducer.user.id,
    nickName: state.loginReducer.user.nickName,
  }
}

const mapDispatchToProps = {
  setNickNameAction: nickName => setNickName(nickName),
  setIDAction: id => setID(id),
  changePageAction: changePage,
  initAttentionAction: initAttention,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));