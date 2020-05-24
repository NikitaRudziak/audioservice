import React, { useState, useEffect } from 'react';

import style from './ArtistCard.module.scss';

export const ArtistCard = ({image, artist}) => {
//   const [data, setData] = useState({artist: []})

  return (
    <div className={style.artistCard}>
      <img src={image} alt="" />
      <div>{artist}</div>
    </div>
  )
}