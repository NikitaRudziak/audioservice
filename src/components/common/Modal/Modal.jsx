import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from '../../../axios';

import { initModal, initAttention } from '../../../redux/actions/index';
import PlaylistLittleCard from '../PlaylistLittleCard/PlaylistLittleCard';

import style from './Modal.module.scss';

export const Modal = ({ initModal, initModalAction, id, trackID, initAttentionAction }) => {
  const [show, setShow] = useState(initModal);

  const [data, setData] = useState({ playlist: [] });

  // useEffect(() => {

  // }, []);

  useEffect(() => {
    // setShow(initModal);
    // if(show === 'flex') {
      axios.get(`/users/${id}/playlist.json`)
      .then(response => setData({playlist: response.data}))
      .catch(error => console.log(error));
    // }
    // console.log(show)
  }, [initModal])

  const closeModal = () => {
    initModalAction('none');
    initAttentionAction('none', '', '');
  }

  // useEffect(() => {
  //   return() => {

  //   }
  // }, [])

  return (
    <div style={{display: `${initModal}`}} className={style.modalContainer}>
      <div className={style.modalHeader}>
        <div className={style.cross} >
          Playlists
        </div>
        <div className={style.cross} onClick={closeModal}>
          <i className="las la-times"></i>
        </div>
      </div>
      <div className={style.modalContent}>
        {data.playlist ? Object.keys(data.playlist).map(item => (
          <PlaylistLittleCard
            key={item}
            itemID={item}
            track={trackID}
            name={data.playlist[item].name}
            count={data.playlist[item]}
          />
        )) : null}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    id: state.loginReducer.user.id,
    initModal: state.loginReducer.user.initModal,
    trackID: state.loginReducer.user.trackID,
  }
}

const mapDispatchToProps = {
  initModalAction: initModal,
  initAttentionAction: initAttention,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Modal));
