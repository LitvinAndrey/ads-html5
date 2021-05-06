import { CourseShort } from './course-short';

export interface Review {
  id?: number;
  rating: number;
  message: string;
  course: CourseShort;
}
