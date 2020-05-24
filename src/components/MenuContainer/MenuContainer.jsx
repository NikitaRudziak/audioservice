import React from 'react';

import { ElemMenu } from '../common/ElemMenu';

import style from './MenuContainer.module.scss';

export const MenuContainer = ({home, genre}) => (
  <div className={style.menuContainer}>
    <ElemMenu to={home}>
      Home
    </ElemMenu>
    <ElemMenu to={genre}>
      Genres
    </ElemMenu>
  </div>
)