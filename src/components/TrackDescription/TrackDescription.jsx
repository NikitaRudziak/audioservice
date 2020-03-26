import React, { useState } from 'react';

import {Text} from '../common/Text';
import Heart_red from './Heart.png'
import Heart_White from './Heart_white.png'

import style from './TrackDescription.module.scss';

export const TrackDescription = ({ groupName, trackName, isPlaying, play, pause }) => {

  const [isLiked, setIsLike] = useState(false);

  const handlePushLike = () => {
    setIsLike(!isLiked)
    console.log(isLiked)
  }

  return (
    <div className={style.trackDescription}>

    <div
      className={style.play}
      onClick={isPlaying ? pause : play}
    >
      {isPlaying
      ? <i className="las la-pause"></i>
      : <i className="las la-play"></i>
      }
    </div>

    <div className={style.column}>
      <Text style='white'>
        {groupName}
      </Text>
      <Text style='white'>
        {trackName}
      </Text>
    </div>
    <div
      className={style.heart}
      onClick={handlePushLike}
    >
      {isLiked
        ? <img src={Heart_red} alt=""/>
        : <img src={Heart_White} alt=""/>
      }
    </div>
  </div>
  )
}