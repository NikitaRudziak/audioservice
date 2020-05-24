import React, { useState, useEffect } from 'react';
import axios from '../../axios';

import GenreCard from '../../components/GenreCard/GenreCard';

import style from './GenreContainer.module.scss';

export const GenreContainer = () => {

    const [data, setData] = useState({ genre: [] });

    useEffect(() => {
      axios.get('/genre.json')
        .then(response => setData({genre: response.data}))
        .catch(error => console.log(error));
    }, [])

  return (
    <div className={style.genreContainer}>
      {Object.keys(data.genre).map(item => (
        <GenreCard
          key={data.genre[item].name}
          name={data.genre[item].name}
          image={data.genre[item].image}
        />))}
    </div>
  )
}

// const mapStateToProps = state => ({
//   nickName: state.loginReducer.user.nickName,
// });

// const mapDispatchToProps = {
//   setNickNameAction: testing,
// };

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MusicCardContainer));
