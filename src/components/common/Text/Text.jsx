import React from 'react';

import style from './Text.module.scss';

export const Text = (props) => (
  <div className={props.style}>
    {props.children}
  </div>
)