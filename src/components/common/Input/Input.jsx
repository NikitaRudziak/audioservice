import React from 'react';
import { render } from '@testing-library/react';

import style from './Input.module.scss';

export const Input = ({ name, type, placeholder, text }) => {
  render (
    console.log(placeholder)
  )
  return (
    <div className={style.Input}>
      <label>
        {text}
        <input
          name={name}
          type={type}
          placeholder={placeholder}
        />
      </label>
    </div>
  )
};
