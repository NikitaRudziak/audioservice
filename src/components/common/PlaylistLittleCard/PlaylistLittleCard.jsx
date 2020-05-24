import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from '../../../axios';

import { initAttention } from '../../../redux/actions';

import style from './PlaylistLittleCard.module.scss';

export const PlaylistLittleCard = ({ name, showAction, itemID, count, id, trackID, initAttentionAction }) => {
  const [bg, setBg] = useState('green');
  const [naming, setNaming] = useState('');

  useEffect(() => {
    setBg('#' + (Math.random().toString(16) + '000000').substring(2,8).toUpperCase());
    let temp = name.toString().substr(0, 2).toUpperCase();
    setNaming(temp);
  }, [])

  const saveToDB = () => {
    axios.post(`/users/${id}/playlist/${itemID}/track.json`, trackID)
      .then(response => console.log(response))
      .catch(error => console.log(error));
    initAttentionAction('Track added successfully ', 'success', '');
  }

  useEffect(() => {
    return() => {
      initAttentionAction('none', '', '');
    }
  }, [])

  return (
    <div className={style.littleContainer} onClick={saveToDB}>
      <div className={style.littleAlbom} style={{backgroundColor: `${bg}`}}>
        {naming}
      </div>
      <div className={style.playlistDescription}>
        <div className={style.playLittleName}>
          {name}
        </div>
        <div className={style.trackLittleCount}>
          {count['track'] ? Object.keys(count['track']).length : 0} tracks
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    // user: state.loginReducer.user.nickName,
    id: state.loginReducer.user.id,
    // initModal: state.loginReducer.user.initModal,
    trackID: state.loginReducer.user.trackID,
    initAttentionAction: initAttention,
    // page: state.pageReducer.page.name,
  }
}

const mapDispatchToProps = {
  initAttentionAction: initAttention,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlaylistLittleCard));
