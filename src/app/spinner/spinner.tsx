import React from 'react';
import Loader from 'react-loader-spinner';
import './spinner.scss';

export const Spinner: React.FC = () => {
  return (
    <div className={'spinner'}>
      <Loader type="Puff" color="#00BFFF" visible height={100} width={100} />
    </div>
  );
};
