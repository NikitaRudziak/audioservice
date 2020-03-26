import React from 'react';

import style from './ElemMenu.module.scss';

export const ElemMenu = (props) => (
  <div className={style.element}>
    {props.children}
  </div>
)