import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from '../../axios';

import {Text} from '../common/Text';
import Heart_red from './Heart.png'
import Heart_White from './Heart_white.png'
import Trash from './trash.png'

import style from './TrackDescription.module.scss';

export const TrackDescription = ({ page, itemID, groupName, trackName, trackUrl, handlePushTrash, image, likeCount, isPlaying, play, pause, user, id }) => {

  const [isLiked, setIsLike] = useState(false);

  const handlePushLike = () => {
    setIsLike(!isLiked)
    if (!isLiked) {
      const track = {
        trackName: trackName,
        groupName: groupName,
        image: image,
        trackUrl: trackUrl,
        // likeCount: 0,
        // playCount: 0,
      }

      axios.post(`/users/${id}/tracks.json`, track)
        .then(response => console.log(response))
        .catch(error => console.log(error));

      const likes = likeCount + 1;
      axios.put(`/music/${itemID}/likeCount.json`, likes);
    }
  }

  return (
    <div className={style.trackDescription}>
      <div
        className={style.play}
        onClick={isPlaying ? pause : play}
      >
        {isPlaying
        ? <i className="las la-pause"></i>
        : <i className="las la-play"></i>
        }
      </div>
      <div className={style.column}>
        <Text style='white'>
          {groupName}
        </Text>
        <Text style='white'>
          {trackName}
        </Text>
      </div>
      {user &&
        <div>
          {
            (page === 'HOME' || page === 'GENRETRACK') &&
              <div className={style.heart} onClick={handlePushLike}>
                {isLiked ? <img src={Heart_red} alt=""/> : <img src={Heart_White} alt=""/>}
              </div>
          }
          {
            page === 'CABINET' &&
              <div className={style.trash} onClick={handlePushTrash}>
                <i className="las la-trash"></i>
              </div>
          }
        </div>
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.loginReducer.user.nickName,
    id: state.loginReducer.user.id,
    page: state.pageReducer.page.name,
  }
}

export default withRouter(connect(mapStateToProps, null)(TrackDescription));
