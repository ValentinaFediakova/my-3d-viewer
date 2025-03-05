"use client";

import React from 'react';
import '@/styles/globals.scss';


type ButtonProps = {
  text: string;
  onClick?: () => void;
};

export const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button className='left-panel__button' onClick={onClick}>
      {text}
    </button>
  );
};