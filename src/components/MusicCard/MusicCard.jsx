import React, { useState, useRef } from 'react';
import { setTrack, setTrash, initModal, setTrackID } from '../../redux/actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from '../../axios';

import TrackImage from '../common/TrackImage/TrackImage';
import TrackDescription from '../TrackDescription/TrackDescription';

import style from './MusicCard.module.scss';

export const MusicCard = ({image, id, groupName, trackName, trackUrl, likeCount, itemID, playCount, forSPT, setTrackAction, setTrashAction, initModalAction, setTrackIDAction, }) => {

  const [isPlaying, setIsPlaying] = useState(false);

  const audio = useRef(null);

  const playTrack = (e) => {
    const audios = document.getElementsByTagName('audio');
    for(var i = 0, len = audios.length; i < len; i++){
      if(audios[i] != e.target){
          audios[i].pause();
      }
    }
    // const plays = document.getElementsByClassName('las la-pause');
    // // console.log(plays);
    // for(var ind = 0, leng = plays.length; ind < leng; ind++){
    //   if(plays[i] != e.target){
    //       // audios[i].pause();
    //       // plays[i].className= 'las la-play';
    //       // console.log(plays[i].className);
    //       console.log(plays)
    //   }
    // }
    const track = {
      image: image,
      groupName: groupName,
      trackName:trackName,
      trackUrl: trackUrl,
      likeCount: likeCount,
      playCount: playCount,
      itemID:itemID
    }
    setTrackAction(track);
    setIsPlaying(true);
    console.log(itemID)
    axios.get(`/music/${itemID}/playCount.json`)
      .then(response => {
        const plays = response.data + 1;
        axios.put(`/music/${itemID}/playCount.json`, plays);
    })

  }


  const pauseTrack = () => {
    const track = {
      image: '',
      groupName: '',
      trackName: '',
      trackUrl: '',
      likeCount: -1,
      playCount: -1
    }
    setTrackAction(track);
    setIsPlaying(false);
  }

  const handlePushTrash = () => {
    setTrashAction(itemID);
    axios.delete(`/users/${id}/tracks/${itemID}.json`);
  }

  const deleteFromPlaylist = () => {
    setTrashAction(itemID);
    axios.delete(`/users/${id}/playlist/${forSPT}/track/${itemID}.json`)
  }

  const addToPlaylist = () => {
    const track = {
      image: image,
      groupName: groupName,
      trackName:trackName,
      trackUrl: trackUrl,
      likeCount: likeCount,
      playCount: playCount
    }
    setTrackIDAction(track);
    initModalAction('flex');
  }

  return(
    <div className={style.card}>

      <TrackImage image={image} alt='Чорт' handleAdd={addToPlaylist} />
      <TrackDescription
        groupName={groupName}
        trackName={trackName}
        isPlaying={isPlaying}
        trackUrl={trackUrl}
        image={image}
        itemID={itemID}
        play={playTrack}
        pause={pauseTrack}
        likeCount={likeCount}
        handlePushTrash={forSPT ? deleteFromPlaylist : handlePushTrash}
      />
      {/* <audio id ='demo' src={trackUrl} ref={audio}/> */}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    id: state.loginReducer.user.id,
    forTrash: state.loginReducer.user.forTresh,
    forSPT: state.loginReducer.user.forSPT,
  }
}

const mapDispatchToProps = {
  setTrackAction: setTrack,
  setTrashAction: setTrash,
  initModalAction: initModal,
  setTrackIDAction: setTrackID,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MusicCard));
