import React from 'react';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Rating from 'react-rating';
import './rating.scss';

export interface RatingComponentProps {
  readonly?: boolean;
  value: number;
}

export const RatingComponent: React.FC<RatingComponentProps> = (props) => {
  return (
    <div className={'rating-container'}>
      <div className={'rating-value'}>{props.value}</div>
      <Rating
        readonly={props.readonly}
        initialRating={props.value}
        emptySymbol={<FontAwesomeIcon icon={farStar} />}
        fullSymbol={<FontAwesomeIcon icon={fasStar} />}
      />
    </div>
  );
};
