import React, { useEffect, useState }from 'react';
import axios from '../../axios';

import { Logo } from '../common/Logo';
import { Button } from '../common/Button';
import { changePage, setName, setGenreName } from '../../redux/actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { MenuContainer } from '../MenuContainer';
import { ElemMenu } from '../common/ElemMenu';

import style from './Header.module.scss';

export const Header = ({ changePageAction, user, setNameAction, setGenreNameAction }) => {
  const [data, setData] = useState({ track: [] });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log(user)
    axios.get('/music.json')
      .then(response => setData({track: response.data}))
      .catch(error => console.log(error));
  }, [])

  const goToLogin = () => {
    changePageAction('LOGIN');
    setGenreNameAction('');
  }

  const goToHome = () => {
    changePageAction('HOME');
    setGenreNameAction('');
  }

  const goToGenre = () => {
    changePageAction('GENRE');
  }

  const goToCabinet = () => {
    changePageAction('CABINET');
    setGenreNameAction('');
  }

  const generateDatalist = () => {
    return (
      Object.keys(data.track).map(item => (
        <>
          <option value={data.track[item].trackName}></option>
          <option value={data.track[item].groupName}></option>
        </>
      ))
    )
  }

  const trackChoose = () => {
    var val = document.getElementById("ti").value;
    var opts = document.getElementById('cocktail').childNodes;
    for (var i = 0; i < opts.length; i++) {
      if (opts[i].value === val) {
        setNameAction(opts[i].value);
        break;
      }
    }
    if (val.trim().length == 0) {setNameAction('')}
  }

  const showMenu = () => {
    setIsOpen(!isOpen);
  }

  return (
  //   <div className={style.hamburger_menu}>
  //   <input className={style.menu_toggle} id="menu__toggle" type="checkbox" />
  //   <label className={style.menu__btn} for="menu__toggle">
  //     <span></span>
  //   </label>

  //   <ul className={style.menu__box}>
  //     <li><a className={style.menu__item} href="#">Главная</a></li>
	// 		<li><a className={style.menu__item} href="#">Проекты</a></li>
	// 		<li><a className={style.menu__item} href="#">Команда</a></li>
	// 		<li><a className={style.menu__item} href="#">Блог</a></li>
	// 		<li><a className={style.menu__item} href="#">Контакты</a></li>
  //   </ul>
  // </div>
  <div className={style.headerContainer}>
    <div className={style.menuButton} onClick={showMenu}>
      {isOpen ? <i className="las la-times"></i> : <i className="las la-bars"></i>}
    </div>
    <div className={style.menuSearch}>
        <input placeholder="Search..." id="ti" className={style.input} type="text" list="cocktail" onChange={trackChoose}/>
        <datalist id="cocktail">
          {generateDatalist()}
        </datalist>
        <button className={style.button}>
          <i className="las la-search"></i>
        </button>
      </div>
    { isOpen ? <div className={style.menuLinks}>
      <div className={style.menuLogo}>
        <Logo/>
      </div>
      <div onClick={showMenu}>
        <MenuContainer home={goToHome} genre={goToGenre} />
      </div>
      <div className={style.lButton} onClick={showMenu}>
        {user ? <ElemMenu to={goToCabinet}>My music</ElemMenu> : <Button change={goToLogin} />}
      </div>

    </div>: null}
    {/* <Logo/>
    <MenuContainer home={goToHome} genre={goToGenre} />
    <div className={style.div}>
      <input placeholder="Search..." id="ti" className={style.input} type="text" list="cocktail" onChange={trackChoose}/>
      <datalist id="cocktail">
        {generateDatalist()}
      </datalist>
      <button className={style.button}>
        <i className="las la-search"></i>
      </button>
    </div>
    {user ? <ElemMenu to={goToCabinet}>My music</ElemMenu> : <Button change={goToLogin} />} */}
  </div>
)};

const mapStateToProps = state => ({
  user: state.loginReducer.user.nickName
});

const mapDispatchToProps = {
  changePageAction: changePage,
  setNameAction: setName,
  setGenreNameAction: setGenreName,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
