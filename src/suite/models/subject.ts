import { Course } from './course';
import { Section } from './section';

export interface Subject {
  id?: number;
  name: string;
  // TODO: Should be required (STUB SOLUTION)
  section?: Section;
  //Write only
  courses?: Course[];
}
