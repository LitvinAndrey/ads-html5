import { Subject } from './subject';

export interface Section {
  subjects?: Subject[];
  id?: number;
  name: string;
}
