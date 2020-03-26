import React from 'react';
import { render } from '@testing-library/react';

export const Input = ({ type, placeholder }) => {
  render (
    console.log(placeholder)
  )
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
      />
    </div>
  )
};
