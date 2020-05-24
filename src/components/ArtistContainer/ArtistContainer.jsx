import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { ArtistCard } from '../common/ArtistCard';

import style from './ArtistContainer.module.scss';

export const ArtistContainer = () => {
  const [data, setData] = useState({artist: []})

  useEffect(() => {
    axios.get('/artist.json')
      .then(response => setData({artist: response.data}))
      .catch(error => console.log(error));
  }, [])

  return (
    <div className={style.artistContainer}>
      {Object.keys(data.artist).map(item => (
        <ArtistCard
          key={data.artist[item].name}
          image={data.artist[item].image}
          artist={data.artist[item].name}
        />))}
    </div>
  )
}

export default withRouter(connect(null, null)(ArtistContainer));