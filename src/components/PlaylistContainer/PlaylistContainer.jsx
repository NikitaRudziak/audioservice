import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from '../../axios';
import { showPT, initAttention } from '../../redux/actions';

import PlaylistCard from '../common/PlaylistCard/PlaylistCard';

import style from './PlaylistContainer.module.scss';

export const PlaylistContainer = ({id, showAction, initAttention, initAttentionAction, playTrash}) => {
  const [data, setData] = useState({ playlist: [] });

  useEffect(() => {
    axios.get(`/users/${id}/playlist.json`)
      .then(response => setData({playlist: response.data}))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    if(initAttention === 'Playlist deleted successfully') {
      delete data.playlist[playTrash];
    setData({track: data.playlist});
    // console.log(playTrash)
    }
    // return () => { showAction('')};
  }, [playTrash])

  useEffect(() => {
    return () => {
      initAttentionAction('none', '', '');
    }
  }, [])

  return(
    <div className={style.playlistContainer}>
      {data.playlist ? Object.keys(data.playlist).map(item => (
        <PlaylistCard
          key={item}
          itemID={item}
          name={data.playlist[item].name}
          count={data.playlist[item]}
        />)) : null}
    </div>
  )
}

const mapStateToProps = state => ({
  nickName: state.loginReducer.user.nickName,
  initAttention: state.loginReducer.user.initAttention,
  playTrash: state.loginReducer.user.playTrash,
  id: state.loginReducer.user.id,
});

const mapDispatchToProps = {
  showAction: showPT,
  initAttentionAction: initAttention,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlaylistContainer));