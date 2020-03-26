import React, { useState } from 'react';

import { TrackImage } from '../common/TrackImage';
import { TrackDescription } from '../TrackDescription';
import style from './MusicCard.module.scss';

export const MusicCard = ({image, groupName, trackName, trackUrl, likeCount, playCount}) => {

  const [isPlaying, setIsPlaying] = useState(false);

  const playTrack = () => {
    document.getElementById('demo').play();
    setIsPlaying(true);
  }

  const pauseTrack = () => {
    document.getElementById('demo').pause();
    setIsPlaying(false);
  }

  return(
    <div className={style.card}>
      <TrackImage image={image} alt='Чорт'/>
      <TrackDescription
        groupName={groupName}
        trackName={trackName}
        isPlaying={isPlaying}
        play={playTrack}
        pause={pauseTrack}/>
      <audio id ='demo' src={trackUrl} />
    </div>
  )
}
