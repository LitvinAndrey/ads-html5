import { Status } from '../../suite';

export interface ListItem {
  identity: number;
  name: string;
  previewPath?: string;
  rating?: number;
  attributes: ListItemAttribute[];
  status: Status;
}

export interface ListItemAttribute {
  label: string;
  value: string | number | Date;
}
