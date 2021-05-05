import { makeAutoObservable } from 'mobx';
import { createContext } from 'react';
import { Course, CoursesUrls, getQuery, getUrlWithHost } from '../suite';

// //STUB
// const stubCourse: Course = {
//   amountHours: 3,
//   beginDate: new Date(),
//   id: 0,
//   endDate: new Date(),
//   lessons: [
//     {
//       beginTime: new Date(),
//       endTime: new Date(),
//       id: 1,
//       nameLesson: 'Как стать мастером',
//       status: Status.AVAILABLE,
//     },
//     {
//       beginTime: new Date(),
//       endTime: new Date(),
//       id: 2,
//       nameLesson: 'Как не потерять фору',
//       status: Status.UNAVAILABLE,
//     },
//   ],
//   nameOfCourse: 'Курс по мастурбации',
//   reviews: [
//     {
//       id: 1,
//       message: 'Очень круто, спасибо',
//       rating: 3.4,
//     },
//   ],
//   size: 0,
//   status: Status.AVAILABLE,
//   users: [],
// };

// //STUB
// const loadCourses = new Promise<Course[]>((resolve) => {
//   const result: Course[] = [];
//   for (let index = 0; index < 100; index++) {
//     result.push({ ...stubCourse, id: index, nameOfCourse: `${stubCourse.nameOfCourse}${index}` });
//   }
//   result.push({
//     ...stubCourse,
//     id: 101,
//     nameOfCourse: `${stubCourse.nameOfCourse}101`,
//     subject: { name: 'Test', id: 12345 },
//   });
//   setTimeout(() => {
//     resolve(result);
//   }, 1000);
// });

export const DEFAULT_MESSAGE = 'Все курсы';

export class CoursesStore {
  initialCourses: Course[] = [];
  courses: Course[] = [];
  currentCourses: Course[] = [];
  message: string = DEFAULT_MESSAGE;

  constructor() {
    makeAutoObservable(this);
  }

  async load(): Promise<void> {
    const result = await getQuery().get<Course[]>(getUrlWithHost(CoursesUrls.BASE));
    const courses = result.data;
    this.courses = courses;
    this.initialCourses = courses;
    this.currentCourses = courses;
  }

  setMessage(message: string): void {
    this.message = message;
  }

  setCourses(courses: Course[]): void {
    this.courses = courses;
  }

  setCurrentCourses(courses: Course[]): void {
    this.currentCourses = courses;
  }

  getCoursesBySubjectIdentities(identities: number[]): Course[] {
    return this.initialCourses.filter((course) => course.subject && identities.includes(course.subject.id));
  }

  search(value: string): Promise<void> {
    return new Promise<void>((resolver) => {
      if (!value) {
        this.setMessage(DEFAULT_MESSAGE);
        this.setCourses(this.currentCourses);
        resolver();
        return;
      }
      const result = this.currentCourses.filter((course) =>
        course.nameOfCourse.toLowerCase().includes(value.toLowerCase()),
      );
      if (result.length) {
        this.setMessage('Результаты поиска');
      } else {
        this.setMessage('Поиск не дал результатов');
      }
      this.setCourses(result);
      resolver();
    });
  }

  getCourseByIdentity(identity: number): Course {
    return this.initialCourses.find((course) => course.id === identity) || null;
  }
}

export const coursesStore = new CoursesStore();

export const coursesStoreContext = createContext(coursesStore);
