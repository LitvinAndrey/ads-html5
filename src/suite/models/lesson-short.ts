import { Status } from './status';

export interface LessonShort {
  id: number;
  nameLesson: string;
  beginTime: Date;
  endTime: Date;
  status: Status;
}
