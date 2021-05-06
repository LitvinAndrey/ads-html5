import React from 'react';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Rating from 'react-rating';
import './rating.scss';

export interface RatingComponentProps {
  readonly?: boolean;
  value: number;
  notDispalyRating?: boolean;
  changeRating?: (value: number) => void;
}

export const RatingComponent: React.FC<RatingComponentProps> = (props) => {
  const getRatingValue = (): number => {
    return Math.floor(props.value * 100) / 100;
  };
  return (
    <div className={'rating-container'}>
      {props.notDispalyRating ? null : <div className={'rating-value'}>{getRatingValue()}</div>}
      <Rating
        readonly={props.readonly}
        initialRating={props.value}
        emptySymbol={<FontAwesomeIcon icon={farStar} />}
        fullSymbol={<FontAwesomeIcon icon={fasStar} />}
        onChange={(value) => props.changeRating(value)}
      />
    </div>
  );
};
