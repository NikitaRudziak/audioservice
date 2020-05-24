import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import axios from '../../../axios';
import {initAttention} from '../../../redux/actions/index'
// import { initAttention } from '../../../redux/actions/index';

import style from './AttentionMessage.module.scss';

export const AttentionMessage = ({ initAttention, initAttentionAction, mesType}) => {
  const [show, setShow] = useState(initAttention);
  const [color, setColor] = useState();

  useEffect(() => {
    if(mesType === 'attention') {
      setColor('#cc3131')
    }
    if(mesType === 'success') {
      setColor('#54b14b')
    }
  }, [])

  const close = () => {
    initAttentionAction('none');
  }

  useEffect(() => {
    return () => {
      initAttentionAction('none');
    }
  }, [])

  console.log(mesType)
  return(
        <div className={style.attentionContainer} style={{backgroundColor: color}} onClick={close}>

          {mesType === 'attention' ? <div>Attention</div> : <div>Success</div>}

          <div>
            {show}
          </div>
        </div>
  )
}

const mapStateToProps = state => {
  return {
    // id: state.loginReducer.user.id,
    initAttention: state.loginReducer.user.initAttention,
    mesType: state.loginReducer.user.mesType,
    // trackID: state.loginReducer.user.trackID,
  }
}

const mapDispatchToProps = {
  initAttentionAction: initAttention
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AttentionMessage));