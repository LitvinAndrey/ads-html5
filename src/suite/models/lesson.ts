import { CourseShort } from './course-short';
import { Status } from './status';

export interface Lesson {
  id: number;
  nameLesson: string;
  course: CourseShort;
  beginTime: Date;
  endTime: Date;
  status: Status;
}
