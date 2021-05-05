import { LessonShort } from './lesson-short';
import { ReviewShort } from './review-short';
import { Status } from './status';
import { Subject } from './subject';
import { UserShort } from './user-short';

export interface Course {
  id?: number;
  preview?: string;
  nameOfCourse: string;
  beginDate: Date;
  endDate: Date;
  size: number;
  subject?: Subject;
  amountHours: number;
  status: Status;
  users: UserShort[];
  lessons: LessonShort[];
  reviews: ReviewShort[];
}
