import React, { useState, useEffect } from 'react';
import axios from '../../axios';

import { MusicCard } from '../../components/MusicCard';

import style from './MusicCardContainer.module.scss';

export const MusicCardContainer = () => {

  const [data, setData] = useState({ track: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        '/music.json',
      );
      setData({track: result.data});
      console.log(result.data)
    };
    fetchData();

  }, []);

  return (
    <div className={style.container}>
      {Object.keys(data.track).map(item => (
        <MusicCard
          key={data.track[item].trackName}
          image={data.track[item].image}
          groupName={data.track[item].groupName}
          trackName={data.track[item].trackName}
          trackUrl={data.track[item].trackUrl}
          likeCount={data.track[item].likeCount}
          playCount={data.track[item].playCount}
        />))}
    </div>
  )
}
