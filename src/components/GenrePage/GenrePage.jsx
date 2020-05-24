import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Header } from '../../components/Header';
import { GenreContainer } from '../../components/GenreContainer';
import MusicCardContainer from '../../components/MusicCardContainer/MusicCardContainer';

import style from './GenrePage.module.scss';

export const GenrePage = ({ genreName }) => {
  const [show, setShow] = useState('');

  useEffect(() => {
    if(genreName) {
      setShow('true');

    }
  }, [genreName])

  console.log('djfghkd');

  return (
    <>
      <Header />
      { show ? <MusicCardContainer /> : <GenreContainer/> }
    </>
  )
}

const mapStateToProps = state => ({
  genreName: state.loginReducer.user.genreName,
});

// const mapDispatchToProps = {
//   setNickNameAction: testing,
// };

export default withRouter(connect(mapStateToProps, null)(GenrePage));
