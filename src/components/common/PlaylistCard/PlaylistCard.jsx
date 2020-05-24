import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from '../../../axios';
import { changePage, showPT, initAttention } from '../../../redux/actions';

import style from './PlaylistCard.module.scss';
import { useEffect } from 'react';

export const PlaylistCard = ({image, name, showAction, itemID, count, id, initAttentionAction }) => {

  const [bg, setBg] = useState('green');
  const [naming, setNaming] = useState('');

  const goToPlaylistTracks = () => {
    showAction(itemID);
  }

  const delPlaylist = () => {
    axios.delete(`/users/${id}/playlist/${itemID}.json`);
    initAttentionAction('Playlist deleted successfully', 'success', itemID);
  }

  useEffect(() => {
    setBg('#' + (Math.random().toString(16) + '000000').substring(2,8).toUpperCase());
    let temp = name.toString().substr(0, 2).toUpperCase();
    setNaming(temp);
  }, [])

  return (
    <div className={style.forRem}>
      <div className={style.playlistCardContainer}>
        <div
          className={style.albom}
          style={{backgroundColor: `${bg}`}}
          onClick={goToPlaylistTracks}
        >
          {naming}
        </div>
        <div className={style.playName} onClick={goToPlaylistTracks}>
          {name}
        </div>
        <div className={style.trackCount}>
        { count['track'] ? Object.keys(count['track']).length : 0 } tracks
        </div>
      </div>
      <div className={style.remPlay} onClick={delPlaylist}>
        <i className="las la-times"></i>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    id: state.loginReducer.user.id,
  }
}

const mapDispatchToProps = {
  changePageAction: changePage,
  showAction: showPT,
  initAttentionAction: initAttention,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlaylistCard));
