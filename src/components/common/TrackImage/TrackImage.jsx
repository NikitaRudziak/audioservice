import React from 'react';

import style from './TrackImage.module.scss';

export const TrackImage = ({image, alt}) => (
  // <div >
    <img className={style['trackImage--img']} src={image} alt={alt} />
  // </div>
)