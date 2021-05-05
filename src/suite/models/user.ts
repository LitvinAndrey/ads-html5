import { CourseShort } from './course-short';
import { Profile } from './profile';
import { Role } from './role';

export interface User {
  id: number;
  login: string;
  courses: CourseShort[];
  profile: Profile;
  roles: Role[];
}
