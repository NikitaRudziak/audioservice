import React from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../axios';

import style from './Button.module.scss';

export const Button = () => {

  const handleClick = () => {
    // const music = {
    //   groupName: 'Eminem',
    //   image: 'https://miro.medium.com/max/4000/0*572RXyVtkSg3hTwc.jpg',
    //   trackName: 'Kamikaze',
    //   trackUrl: 'https://gl.githack.com/Nikiru/audioservice/-/raw/master/audioservice/public/music/Eminem -  Kamikaze_(FM-Zaycev_NET).mp3',
    //   likeCount: 0,
    //   playCount: 0,
    // }
    // axios.post('/music.json', music)
    //   .then(responce => console.log(responce))
    //   .catch(error => console.log(error));
  }

  return(
    <Link to='/Login'>
      <div className={style.button} onClick={handleClick}>
        Log in
      </div>
    </ Link>
  )
}
