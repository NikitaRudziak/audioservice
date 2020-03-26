import React from 'react';

import { Logo } from '../common/Logo';
import { Button } from '../common/Button';
// import { SearchBar } from '../common/SearchBar';
import { MenuContainer } from '../MenuContainer';

import style from './Header.module.scss';

export const Header = () => (
  <div className={style.headerContainer}>
    <Logo/>
    <MenuContainer/>
    {/* <SearchBar/> */}
    <Button path='/Login' />
  </div>
)