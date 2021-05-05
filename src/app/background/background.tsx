import React from 'react';
import './background.scss';

export const Background: React.FC = (props) => {
  return (
    <div
      className={'background'}
      style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.6), rgba(255,255,255,.6)), url(./bg.webp)' }}
    >
      <div className={'content'}>{props.children}</div>
    </div>
  );
};
