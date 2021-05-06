import { LessonShort } from './lesson-short';
import { Status } from './status';

export interface CourseShort {
  id: number;
  nameOfCourse: string;
  status: Status;
  lessons?: LessonShort[];
}
