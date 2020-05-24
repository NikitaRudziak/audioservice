import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { TrackImage } from '../common/TrackImage';
// import TrackDescription from '../TrackDescription/TrackDescription';
import style from './GenreCard.module.scss';
import { setGenreName, changePage } from '../../redux/actions';

export const GenreCard = ({ name, image, setGenreNameAction, changePageAction }) => {
  // const [data, setData] = useState({ genre: [] });

  // useEffect(() => {
  //   axios.get('/genre.json')
  //     .then(response => setData({genre: response.data}))
  //     .catch(error => console.log(error));
  // }, [])
  const openTrack = () => {
    setGenreNameAction(name)
    changePageAction('GENRETRACK')
  }

  return(
    <div className={style.genreCard} onClick={openTrack}>
      <img className={style.genreCard__img} src={image} alt=""/>
      <div>{name}</div>
    </div>
  )
}

const mapStateToProps = state => ({
  // nickName: state.loginReducer.user.nickName,
  // name: state.pageReducer.page.name,
  // id: state.loginReducer.user.id,
  // forTrash: state.loginReducer.user.forTrash,
  // nameTrack: state.loginReducer.user.name,
  // forSPT: state.loginReducer.user.forSPT,
  genreName: state.loginReducer.user.genreName,
});

const mapDispatchToProps = {
  changePageAction: changePage,
  setGenreNameAction: setGenreName,
};
// const mapDispatchToProps = {

//   setNameAction: setName,
// };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GenreCard));