import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from '../../../axios';

import style from './AddEntity.module.scss';
import { initAttention } from '../../../redux/actions';

export const AddEntity = ({entity, id, handleClose, initAttentionAction}) => {

  const [type, setType] = useState(entity);

  const handleSubmit = (event) => {
    event.preventDefault();

    // axios.get('/users.json')
    //   .then(response => setUser({user: response.data}))
    //   .catch(error => console.log(error));

    // if (signType) {
    //   Object.keys(data.user).map(item => {
    //     if (data.user[item].nickName === event.target.nickName.value &&
    //         data.user[item].password === event.target.password.value){
    //       console.log(true);
    //     }
    //   });

    //   localStorage.setItem('nickName', event.target.nickName.value);
    //   // setNickNameAction(localStorage.getItem('nickName'));
    //   console.log(localStorage.getItem('nickName'));
    //   goToCabinet();
    // } else {
    //   Object.keys(data.user).map(item => {
    //     if (data.user[item].nickName === event.target.nickName.value) {
    //       console.log(true);
    //     } else {
    //       const user = {
    //         nickName: event.target.nickName.value,
    //         password: event.target.password.value,
    //         email: event.target.email.value,
    //       }

    //       axios.post('/users.json', user)
    //         .then(response => console.log(response))
    //         .catch(error => console.log(error));
    //     }
    //   });
    // }
    if(type === 'track') {
      const track = {
        trackName: event.target.trackName.value,
        groupName: event.target.groupName.value,
        image: event.target.image.value,
        trackUrl: event.target.trackUrl.value,
        genre: event.target.genre.value
      }

      axios.post('/music.json', track)
        .then(response => {initAttentionAction('New track successfully added to our list of tracks', 'success');console.log(response)})
        .catch(error => console.log(error));
    }
    if(type === 'artists') {
      const artist = {
        name: event.target.name.value,
        image: event.target.image.value,
      }

      axios.post('/artist.json', artist)
        .then(response => console.log(response))
        .catch(error => console.log(error));
    }
    if(type === 'playlist') {
      axios.post(`/users/${id}/playlist.json`, {name: event.target.name.value})
        .then(response => {initAttentionAction('New playlist successfully created', 'success');console.log(response)})
        .catch(error => console.log(error));
    }
  }

  useEffect(() => {
    return() => {
      initAttentionAction('none', '');
    }
  }, [])

  return (
    <div className={style.AddEntity}>
      <div className={style.AddEntity__box}>
        <form className={style.AddEntity__form} onSubmit={(event) => handleSubmit(event)}>
          {type === 'track' &&
            <>
              <div className={style.AddTitle}>
                <div className={style.cross}>Add new track</div>
                <div className={style.cross} onClick={handleClose}>
                  <i className="las la-times"></i>
                </div>
              </div>
              <input type="text" name="trackName" placeholder="Track name" required />
              <input type="text" name="groupName" placeholder="Group name" required />
              <select name="genre">
                <option selected disabled>Choose a genre</option>
                <option value="Rock">Rock</option>
                <option value="Hip-Hop">Hip-Hop</option>
              </select>
              <input type="text" name="image" placeholder="Url of image" required />
              <input type="text" name="trackUrl" placeholder="Url of track" required />
              <input type="submit" name="Add" value="Add" />
            </>}
          {/* {type === 'artist' &&
            <>
              <div className={style.AddTitle}>
                <div className={style.cross}>Add new artist</div>
                <div className={style.cross} onClick={handleClose}>
                  <i className="las la-times"></i>
                </div>
              </div>
              <input type="text" name="name" placeholder="Group name" required />
              <input type="text" name="image" placeholder="Url of image" required />
              <input type="submit" name="Add" value="Add" />
            </>} */}
          {type === 'playlist' &&
            <>
              <div className={style.AddTitle}>
                <div className={style.cross}>Create new playlist</div>
                <div className={style.cross} onClick={handleClose}>
                  <i className="las la-times"></i>
                </div>
              </div>
              <input type="text" name="name" placeholder="Playlist name" required />
              <input type="submit" name="Create" value="Create" />
            </>}

        </form>
      </div>
    </div>
  )
};

const mapStateToProps = state => ({
  id: state.loginReducer.user.id,
});

const mapDispatchToProps = {
  // setNickNameAction: setNickName,
  initAttentionAction: initAttention,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddEntity));