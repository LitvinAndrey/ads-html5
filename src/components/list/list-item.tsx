import React from 'react';
import { Link } from 'react-router-dom';
import { RatingComponent } from '../rating/rating';
import { ListItem } from './list-item.model';
import { getAttributeValue } from '../../suite';
import { StatusComponent } from '../status/status';

export interface ListItemProps {
  item: ListItem;
  ratingReadonly?: boolean;
}

export const NO_ITEM_PREVIEW_PATH = './not_found.webp';

export const ListItemComponent: React.FC<ListItemProps> = (props) => {
  return (
    <div className={'list-item'}>
      <div>
        <img className={'preview'} src={props.item.previewPath || NO_ITEM_PREVIEW_PATH}></img>
      </div>
      <div className={'description'}>
        <div className={'name'}>
          <Link to={`/detail/${props.item.identity}`}>{props.item.name}</Link>
          <StatusComponent value={props.item.status} />
        </div>
        <div>
          {props.item.attributes.map((attribute) => (
            <div key={attribute.label} className="attribute-container">
              <div className={'attribute-label'}>{attribute.label}</div>
              <div className={'attribute-value'}>{getAttributeValue(attribute.value)}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={'rating'}>
        <RatingComponent readonly={props.ratingReadonly} value={props.item.rating || 0} />
      </div>
    </div>
  );
};
