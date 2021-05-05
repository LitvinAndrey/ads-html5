import React from 'react';
import { ListItemComponent } from './list-item';
import { ListItem } from './list-item.model';
import './list.scss';

export interface ListProps {
  items: ListItem[];
  ratingReadonly?: boolean;
}

export const List: React.FC<ListProps> = (props) => {
  return (
    <div className={'list'}>
      {props.items.map((item) => (
        <ListItemComponent key={item.identity} ratingReadonly={props.ratingReadonly} item={item} />
      ))}
    </div>
  );
};
