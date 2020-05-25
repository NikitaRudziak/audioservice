import React, { useState, useEffect, useRef } from 'react';
import { setTrack } from '../../redux/actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from '../../axios';

import style from './CurrentTrack.module.scss';

export const CurrentTrack = ({ image, groupName, trackName, trackUrl, itemID, likeCount, playCount, setTrackAction }) => {

  useEffect(() => {
    let item = Object.keys(tracks.track).indexOf(itemID);
    console.log(item)
    if(item === 0) {
      setIsDisL(true);
    } else {
      setIsDisL(false);
    }
    if(item === (Object.keys(tracks.track).length -1)) {
      setIsDisR(true);
    } else {
      setIsDisR(false);
    }
  }, [itemID])

  // useEffect(() => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isDisL, setIsDisL] = useState(false);
  const [isDisR, setIsDisR] = useState(false);

  const [cgroupName, setCgroupName] = useState();
  const [ctrackName, setCtrackName] = useState();
  const [ctrackUrl, setCtrackUrl] = useState();
  const [citemID, setCitemID] = useState();
  const [tracks, setTrack] = useState({track: []});
  // }, [trackName])
  const audio = useRef(null);

  useEffect(() => {
    setCgroupName(groupName);
    setCtrackName(trackName);
    setCtrackUrl(trackUrl);
    setCitemID(itemID);
    setIsPlaying(true);
    // axios.get('/music.json')
      // .then(response => {
      //   Object.keys(response.data).map(item => {

      //   })
      // }setTrack({track: response.data}))
      // .catch(error => console.log(error));
  }, [trackName])

  // console.log(cgroupName);
  // console.log(tracks)

  const playTrack = (e) => {
    audio.current.play();
    setIsPlaying(true);
  }

  const pauseTrack = () => {
    audio.current.pause();
    setIsPlaying(false);
  }

  useEffect(() => {
    axios.get('/music.json')
      .then(response =>
      setTrack({track: response.data}))
      .catch(error => console.log(error));
    setIsPlaying(true);
  }, [])

  const next = () => {
    setIsPlaying(true);
    let item = Object.keys(tracks.track).indexOf(itemID) + 1;
    console.log(item);
    let obj ={
      image: tracks.track[Object.keys(tracks.track)[item]].image,
      groupName: tracks.track[Object.keys(tracks.track)[item]].groupName,
      trackName:tracks.track[Object.keys(tracks.track)[item]].trackName,
      trackUrl: tracks.track[Object.keys(tracks.track)[item]].trackUrl,
      likeCount: tracks.track[Object.keys(tracks.track)[item]].likeCount,
      playCount: tracks.track[Object.keys(tracks.track)[item]].playCount,
      itemID: Object.keys(tracks.track)[item]
    }
    setTrackAction(obj);
  }

  const previous = () => {
    setIsPlaying(true);
    let item = Object.keys(tracks.track).indexOf(itemID) - 1;
    console.log(item);
    let obj ={
      image: tracks.track[Object.keys(tracks.track)[item]].image,
      groupName: tracks.track[Object.keys(tracks.track)[item]].groupName,
      trackName:tracks.track[Object.keys(tracks.track)[item]].trackName,
      trackUrl: tracks.track[Object.keys(tracks.track)[item]].trackUrl,
      likeCount: tracks.track[Object.keys(tracks.track)[item]].likeCount,
      playCount: tracks.track[Object.keys(tracks.track)[item]].playCount,
      itemID: Object.keys(tracks.track)[item]
    }
    setTrackAction(obj);

    // setTrackAction(tracks.track[Object.keys(tracks.track)[item]]);
  }

  // const qwe = () => {
  //   audio.current.volume=audio.current.volume+document.getElementById("size").value;
  // }


  useEffect(() => {
    audio.current.pause();
    audio.current.load();
    audio.current.play();
    if (trackUrl !== '') {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [ctrackUrl])

    return (
      <div className={style.currentTrackContainer}>

          { isVisible ? <div className={style.controlPlay}>
            <div onClick={previous} className={style.reverse}>
              {isDisL ? <i style={{display: 'none'}} className="las la-forward"></i> : <i className="las la-forward"></i>}
            </div>
             <div
              // className={style.play}
              onClick={isPlaying ? pauseTrack : playTrack}
            >

              {isPlaying
                ? <i className="las la-pause"></i>
                : <i className="las la-play"></i>
              }

            </div>
            <div onClick={next}>
            {isDisR ? <i style={{display: 'none'}} className="las la-forward"></i>:<i className="las la-forward"></i>}
            </div>
          </div> : null }
        <img className={style.currentTrackContainer__img} src={image} alt=""/>
        <div className={style.currentTrackContainer__description}>
          <div>
            {cgroupName}
          </div>
          <div>
            {ctrackName}
          </div>
        </div>
        {/* <div className={style.volume}>
          <i class="las la-volume-up"></i>
        </div> */}
        {/* <input type="range" min="0" max="1" step="0.1" id="size"
          onInput={qwe} value='1'></input> */}
        <audio id ='demo' src={ctrackUrl} ref={audio} onEnded={next}/>
      </div>
    )
}

const mapStateToProps = state => ({
    groupName: state.musicReducer.track.groupName,
    trackName: state.musicReducer.track.trackName,
    image: state.musicReducer.track.image,
    trackUrl: state.musicReducer.track.trackUrl,
    playCount: state.musicReducer.track.playCount,
    likeCount: state.musicReducer.track.likeCount,
    itemID: state.musicReducer.track.itemID,
});

const mapDispatchToProps = {
    setTrackAction: setTrack,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CurrentTrack));