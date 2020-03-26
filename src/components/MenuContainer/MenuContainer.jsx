import React from 'react';

import { ElemMenu } from '../common/ElemMenu';

import style from './MenuContainer.module.scss';

export const MenuContainer = () => (
  <div className={style.menuContainer}>
    <ElemMenu>
      Home
    </ElemMenu>
    <ElemMenu>
      Genres
    </ElemMenu>
  </div>
)