import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from '../../axios';
import { setNickName, setGenreName, showPT } from '../../redux/actions';

import MusicCard from '../../components/MusicCard/MusicCard';

import style from './MusicCardContainer.module.scss';

export const MusicCardContainer = ({ nickName, setNickNameAction, name, id, forTrash, page, nameTrack, forSPT, check, genreName, showAction }) => {

  const [data, setData] = useState({ track: [] });
  const [test, setTest] = useState({ track: []});
  const [playlist, setPlaylist] = useState ({track: []})
  const [top, setTop] = useState ({track: []})

  useEffect(() => {
    if (name === 'HOME') {
      axios.get('/music.json')
        .then(response => setData({track: response.data}))
        .catch(error => console.log(error));
    } else {
      axios.get(`/users/${id}/tracks.json`)
        .then(response => setData({track: response.data}))
        .catch(error => console.log(error));
    }
    if (forSPT) {
      axios.get(`/users/${id}/playlist/${forSPT}/track.json`)
        .then(response => setPlaylist({track: response.data}))
        .catch(error => console.log(error));
      // console.log(playlist);
    }
    if (genreName == 'Popular') {
      let array = [];
      axios.get(`/music.json`)
        .then(response => {
          Object.keys(response.data).map(item => {
            array.push(response.data[item]);
          })
          array.sort(function(a,b) {
            return b.likeCount - a.likeCount
          });
          setTop({track: array.slice(0, 5)});
          console.log(top);
        })
        .catch(error => console.log(error));
    }
    if (genreName == 'Chart') {
      console.log(top);
      let array = [];
      axios.get('/music.json')
        .then(response => {
          Object.keys(response.data).map(item => {
            array.push(response.data[item]);
          })
          array.sort(function(a,b) {
            return b.playCount - a.playCount
          });
          setTop({track: array.slice(0, 5)});

          // setTop({track: response.data});
          // Object.keys(response.data).map(item => {
          //   array.push(response.data[item]);
          // })
          // array.sort(function(a,b) {
          //   return b.playCount - a.playCount;
          // })
          // array = array.slice(6,30);
          // console.log(array)
          // Object.keys(array).map(item => {
          //   if(array[item] === top.track[item]) {
          //     console.log(top.track)
          //   }

          // })
        })
        .catch(error => console.log(error));
    // }



        //   // let temp
        //   // Object.keys(response.data).map(item => {
        //     // array.push(response.data[item]);
        //     Object.keys(array).map(item2 => {
        //     // if(item === array[item2]) {
        //       // console.log(item, array[item2])
        //       // delete response.data[item];
        //     // } else {
        //       delete top.track[item2];
        //     // }
        //     // console.log(response.data[item])
        //     })
        //     console.log(top.track)
        //   // })
        //   setTop({track: top.track});
        // })

        // console.log(top.track)
    }
    if (genreName == 'Hip-Hop') {
      axios.get(`/music.json`)
        .then(response => {
          Object.keys(response.data).map(item => {
            if(response.data[item].genre !== 'Hip-Hop'){
              delete response.data[item]
            }
          })
          setTop({track: response.data});
        })
        .catch(error => console.log(error));
    }
    if (genreName == 'Rock') {
      axios.get(`/music.json`)
        .then(response => {
          Object.keys(response.data).map(item => {
            if(response.data[item].genre !== 'Rock'){
              delete response.data[item]
            }
          })
          setTop({track: response.data});
        })
        .catch(error => console.log(error));
    }
    // console.log(top.track)
  }, []);

  useEffect(() => {
    if(playlist && check === 'true') {
      delete playlist.track[forTrash];
      setPlaylist({track: playlist.track});
    }
    delete data.track[forTrash];
    setData({track: data.track});
  }, [forTrash]);

  useEffect(() => {
    let arr = [];
    Object.keys(data.track).map(item => {
      if(data.track[item].trackName === nameTrack || data.track[item].groupName === nameTrack) {
        arr.push(data.track[item]);
      }
    })
    setTest({track: arr});
  }, [nameTrack])

  useEffect(() => {
    return () => { showAction('')};
  }, [])
  // useEffect(() => {
  //   // if(genreName){
  //   //   axios.get(`/genre.json`)
  //   //     .then(response => setPlaylist({track: response.data}))
  //   //     .catch(error => console.log(error));

  //   // }
  //   console.log('llllll')
  // }, [genreName])

  return (
    <div className={style.container}>
      {(data.track && (test.track.length == 0) && check === 'false') ? Object.keys(data.track).map(item => (
        <MusicCard
          key={data.track[item].trackName}
          itemID={item}
          image={data.track[item].image}
          groupName={data.track[item].groupName}
          trackName={data.track[item].trackName}
          trackUrl={data.track[item].trackUrl}
          likeCount={data.track[item].likeCount}
          playCount={data.track[item].playCount}
        />)) : null}
      {test ? Object.keys(test.track).map(item => (
        <MusicCard
          key={test.track[item].trackName}
          itemID={item}
          image={test.track[item].image}
          groupName={test.track[item].groupName}
          trackName={test.track[item].trackName}
          trackUrl={test.track[item].trackUrl}
          likeCount={test.track[item].likeCount}
          playCount={test.track[item].playCount}
        />)) : null}
      {(playlist && check === 'true') ? Object.keys(playlist.track).map(item => (
        <MusicCard
          key={playlist.track[item].trackName}
          itemID={item}
          image={playlist.track[item].image}
          groupName={playlist.track[item].groupName}
          trackName={playlist.track[item].trackName}
          trackUrl={playlist.track[item].trackUrl}
          likeCount={playlist.track[item].likeCount}
          playCount={playlist.track[item].playCount}
        />)) : null}
      { genreName ? Object.keys(top.track).map(item => (
        <MusicCard
          key={top.track[item].trackName}
          itemID={item}
          image={top.track[item].image}
          groupName={top.track[item].groupName}
          trackName={top.track[item].trackName}
          trackUrl={top.track[item].trackUrl}
          likeCount={top.track[item].likeCount}
          playCount={top.track[item].playCount}
        />)) : null}
    </div>
  )
}

const mapStateToProps = state => ({
  nickName: state.loginReducer.user.nickName,
  name: state.pageReducer.page.name,
  id: state.loginReducer.user.id,
  forTrash: state.loginReducer.user.forTrash,
  nameTrack: state.loginReducer.user.name,
  forSPT: state.loginReducer.user.forSPT,
  genreName: state.loginReducer.user.genreName,
  page:state.pageReducer.page.name,
});

const mapDispatchToProps = {
  setNickNameAction: setNickName,
  setGenreNameAction: setGenreName,
  showAction: showPT,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MusicCardContainer));
