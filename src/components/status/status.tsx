import React from 'react';
import { Status } from '../../suite';
import './status.scss';

export interface StatusComponentProps {
  value: Status;
}

export const StatusComponent: React.FC<StatusComponentProps> = (props) => {
  return (
    <div className={props.value === Status.AVAILABLE ? 'available' : 'unavailable'}>
      {props.value === Status.AVAILABLE ? 'Доступно' : 'Недоступно'}
    </div>
  );
};
