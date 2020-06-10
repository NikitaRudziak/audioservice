import React, { useState, useEffect } from 'react';
import axios from '../../../axios';

import style from './Table.module.scss';

export const Table = ({dataList, type}) => {

  let ind = 0;

  const deleteTrack = (item) => {
    console.log(item)
  }

  console.log(type)

  const renderTableBody = () => (
    <tbody>
      {type === 'users' ? Object.keys(dataList.user).map(item => {
        ind++;
        return(
          <tr key={dataList.user[item].nickName}>
            <td>{ind}</td>
            <td>{dataList.user[item].nickName}</td>
            <td>{dataList.user[item].email}</td>
            <td className={style.lastCell} onClick={(item) => deleteTrack(item)}>Delete</td>
          </tr>
        )
      }) : null}
      {type === 'trackList' && Object.keys(dataList.track).map(item => {
        ind++;
        return(
          <tr key={item}>
            <td>{ind}</td>
            <td>{dataList.track[item].groupName}</td>
            <td>{dataList.track[item].trackName}</td>
            <td className={style.lastCell}>Delete</td>
            {/* <div onClick={deleteTrack(item)}><td>Delete</td></div> */}
          </tr>
        )
      })}
    </tbody>
  )


  return(
    <table className={style.tableContainer}>
      <thead>
        {type === 'users'
        ? <tr>
              <th><h1>№</h1></th>
              <th><h1>NickName</h1></th>
              <th><h1>Email</h1></th>
          </tr>
        : <tr>
        <th><h1>№</h1></th>
        <th><h1>Group</h1></th>
        <th><h1>Track</h1></th>
          </tr>}
      </thead>
      {renderTableBody()}
    </table>
  )
}
