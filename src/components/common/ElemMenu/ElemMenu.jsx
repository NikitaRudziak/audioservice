import React from 'react';
import { Link } from 'react-router-dom';

import style from './ElemMenu.module.scss';

export const ElemMenu = (props) => (
  // <Link to={props.to}>
    <div className={style.element} onClick={props.to}>
      {props.children}
    </div>
  // </Link>
)