import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changePage, setNickName, setID } from '../../redux/actions';
// import { Link } from 'react-router-dom';
import axios from '../../axios';
// import { setNickName } from '../../redux/actions';

import { Header } from '../../components/Header';
import { Text } from '../common/Text';
import { Input } from '../common/Input';
import { ElemMenu } from '../common/ElemMenu';
import { Table } from '../common/Table/Table';
import AddEntity from '../common/AddEntity/AddEntity';
import MusicCardContainer from '../MusicCardContainer/MusicCardContainer';
import ArtistContainer from '../ArtistContainer/ArtistContainer';
import PlaylistContainer from '../PlaylistContainer/PlaylistContainer';
// import icon from './addIcon64.png';
// import CurrentTrack from '../../components/CurrentTrack/CurrentTrack';
// import { Button } from '../common/Input';

import style from './CabinetContainer.module.scss';

export const CabinetContainer = ({ nickName, setNickNameAction, changePageAction, forSPT, setIDAction }) => {

  const [data, setData] = useState({ user: [] });
  const [list, setList] = useState({ track: [] });
  const [page, setPage] = useState('track')
  // const [user, setUser] = useState();

  useEffect(() => {
    axios.get('/users.json')
      .then(response => setData({user: response.data}))
      .catch(error => console.log(error));
      axios.get('/music.json')
      .then(response => setList({track: response.data}))
      .catch(error => console.log(error));
    // const nickname = localStorage.getItem('nickName');
  }, [])
  // const goToCabinet = () => {
  //   changePageAction('HOME');
  // }

  // console.log(Object.keys(data).indexOf(Object.keys(data)[1]));

  const goToAddTrack = () => {
    setPage('addTrack');
  }

  const goToAddArtist = () => {
    setPage('addArtist');
  }

  const goToAddPlaylist = () => {
    setPage('addPlaylist');
  }

  const goToTrackList = () => {
    setPage('track');
  }

  const goToUsers = () => {
    setPage('users');
  }

  const goToList = () => {
    setPage('trackList');
  }

  const goToArtists = () => {
    setPage('artists');
  }

  const goToPlaylists = () => {
    setPage('playlists');
  }

  // const goToPlaylistTracks = () => {
  //   setPage('playlistTracks');
  // }

  useEffect(() => {
    if(forSPT !== '') {
      setPage('playlistTracks')
    }
  }, [forSPT])

  const logOut = () => {
    setNickNameAction('');
    setIDAction(0);
    localStorage.clear();
    changePageAction('HOME');
  }

  return(
    <div className={style.cabinetContainer}>
      <div className={style.cabinetContainer__menu}>
        <ElemMenu to={goToTrackList}>Tracks </ElemMenu>
        {/* <ElemMenu to={goToArtists}>Artists</ElemMenu> */}
        <ElemMenu to={goToPlaylists}>Playlists</ElemMenu>
        {nickName === 'admin' ? <ElemMenu to={goToUsers}>Users</ElemMenu> : null}
        {nickName === 'admin' ? <ElemMenu to={goToList}>List of tracks</ElemMenu> : null}
        <div className={style.circleButton} onClick={logOut}>
          Log out
        </div>
      </div>
      <div className={style.cabinetContainer__main}>
        {page === 'artists' &&
          <>
            {nickName === 'admin' ? <div className={style.plusBold} onClick={goToAddArtist}>+Add new artist</div> : null }
            <ArtistContainer />
          </>}
        {page === 'users' && <Table type='users' dataList={data}/>}
        {page === 'trackList' && <Table type='trackList' dataList={list} />}
        {page === 'addTrack' && <AddEntity handleClose={goToTrackList} entity='track'/>}
        {/* {page === 'addArtist' && <AddEntity handleClose={goToArtists} entity='artist'/>} */}
        {page === 'addPlaylist' && <AddEntity handleClose={goToPlaylists} entity='playlist'/>}
        {page === 'track' &&
          <>
            <div className={style.plusBold} onClick={goToAddTrack}>+Add new track</div>
            <MusicCardContainer check='false'/>
          </>}
        {page === 'playlists' &&
          <>
            <div className={style.plusBold} onClick={goToAddPlaylist}>+Create new playlist</div>
            <PlaylistContainer />
          </>}
        {page === 'playlistTracks' &&
          <>
            {/* <div className={style.plusBold} onClick={goT}>+Create new playlist</div> */}
            <MusicCardContainer check='true'/>
          </>}
      </div>
    </div>
  )
};

const mapStateToProps = state => ({
  forSPT: state.loginReducer.user.forSPT,
  nickName: state.loginReducer.user.nickName,
});

const mapDispatchToProps = {
  changePageAction: changePage,
  setNickNameAction: nickName => setNickName(nickName),
  setIDAction: id => setID(id),
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CabinetContainer));
