import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header from '../../components/Header/Header';
import MusicCardContainer from '../../components/MusicCardContainer/MusicCardContainer';
import CurrentTrack from '../../components/CurrentTrack/CurrentTrack';
import Login from '../../components/Login/Login';
import { GenreContainer } from '../../components/GenreContainer/GenreContainer';
import CabinetContainer from '../../components/CabinetContainer/CabinetContainer';
import Modal from '../../components/common/Modal/Modal';
import { useState } from 'react';
import AttentionMessage from '../../components/common/AttentionMessage/AttentionMessage';

export const App = ({ page, id, initModal, initAttention }) => {
  const [blur, setBlur] = useState();
  const [att, setAtt] = useState();

  useEffect(() => {
    if(initAttention !== 'none') {
      setAtt('true');
    } else {
      setAtt();
    }
  }, [initAttention]);

  useEffect(() => {
    // if(initAttention !== 'none') {
      // setAtt('true');
    // } else {
      setAtt();
    // }
  }, [id]);

  useEffect(() => {
    if(initModal === 'flex') {
      setBlur('true')
    } else {
      setBlur();
    }
  }, [initModal]);

  const renderPage = () => {
    if (page == 'HOME') {
      return (<div><MusicCardContainer check='false' /></div>);
    }
    if (page == 'LOGIN') {
      return <Login />;
    }
    if (page == 'GENRE') {
      return <GenreContainer />;
    }
    if (page == 'CABINET') {
      return <CabinetContainer />;
    }
    if (page == 'GENRETRACK') {
      return <MusicCardContainer />;
    }
  }

  // console.log(blur);
  return (
    <>
    {blur
    ? <div style={{backgroundColor: 'black;', opacity: '0.3'}}>
        <Header />
        { renderPage()}
    {/* <MusicCardContainer /> */}
        <CurrentTrack />
      </div>
    :
      <div className="App">
        <Header />
        { renderPage()}
    {/* <MusicCardContainer /> */}
        <CurrentTrack />
      </div>
  }
    <Modal />
    {att ? <AttentionMessage /> : null}
    </>
  );
}

const mapStateToProps = state => {
  return {
    id: state.loginReducer.user.id,
    page: state.pageReducer.page.name,
    initModal: state.loginReducer.user.initModal,
    initAttention: state.loginReducer.user.initAttention,
  }
}

// const mapDispatchToProps = dispatch => {
//   return {

//   }
// }
export default withRouter(connect(mapStateToProps, null)(App));
