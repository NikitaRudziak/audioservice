import React from 'react';
import { Link } from 'react-router-dom';
// import { changePage } from '../../redux/actions';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import axios from '../../../axios';

import style from './Button.module.scss';

export const Button = ({change}) => {

  const handleClick = () => {
    const music = {
      groupName: 'Макс Корж',
      image: 'https://i.ytimg.com/vi/FLDE9Pzdoy4/maxresdefault.jpg',
      trackName: '2 типа людей',
      trackUrl: 'https://firebasestorage.googleapis.com/v0/b/somemusic-a36c7.appspot.com/o/Music%2Fmaks-korzh_-_2-tipa-lyudey.mp3?alt=media&token=785a05da-e5a0-4cc2-af9f-3bc0fab4bf51',
      likeCount: 0,
      playCount: 0,
    }

    const genre = {
      name: 'Top5play',
      image: 'https://png.pngtree.com/element_our/png_detail/20181226/music-player-vector-icon-png_276849.jpg',
    }

    const artist = {
      name: 'Макс Корж',
      image: 'https://avatars.yandex.net/get-music-content/2399641/5d26d7e5.p.975699/200x200'
    }

    // axios.post('/genre.json', genre)
    //   .then(response => console.log(response))
    //   .catch(error => console.log(error));
    change();
  }

  return(
      <div className={style.button} onClick={handleClick}>
        Log in
      </div>
  )
}
