import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import style from './TrackImage.module.scss';

export const TrackImage = ({user, image, alt, handleAdd}) => (
  <div className={style.test}>
    {user && <div onClick={handleAdd}><i className="las la-plus"></i></div>}
    <img className={style['trackImage--img']} src={image} alt={alt} />
  </div>
)

const mapStateToProps = state => {
  return {
    user: state.loginReducer.user.nickName,
  }
}

export default withRouter(connect(mapStateToProps, null)(TrackImage));
