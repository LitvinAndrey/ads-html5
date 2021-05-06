import { makeAutoObservable } from 'mobx';
import { createContext } from 'react';
import {
  AuthorizationUrls,
  Course,
  CoursesUrls,
  getQuery,
  getUrlWithHost,
  Review,
  ReviewsUrls,
  User,
  UserUrls,
} from '../suite';
import { BreadcrumbsPath, HomePath } from '../suite/models/breadcrumbs-path';
import { CoursesStore, coursesStore, DEFAULT_MESSAGE } from './courses.store';
import { SectionStore, sectionStore } from './sections.store';
import { SpinnerStore, spinnerStore } from './spinner.store';
import { SubjectStore, subjectStore } from './subjects.store';

export class AppStore {
  loaded = false;
  currentPath: BreadcrumbsPath = [HomePath];
  course: Course = null;
  user: User = null;

  constructor(
    private spinnerStore: SpinnerStore,
    private coursesStore: CoursesStore,
    private sectionStore: SectionStore,
    private subjectStore: SubjectStore,
  ) {
    makeAutoObservable(this);
  }

  setLoaded(loaded: boolean): void {
    this.loaded = loaded;
  }

  async init(): Promise<void> {
    await this.getCurrentUser();
    await this.coursesStore.load();
    await this.sectionStore.load();
    await this.subjectStore.load();
    this.setLoaded(true);
    this.spinnerStore.setLoading(false);
  }

  setCurrentPath(path: BreadcrumbsPath): void {
    this.currentPath = path;
  }

  setCourse(course: Course): void {
    this.course = course;
  }

  async searchByValue(value: string): Promise<void> {
    this.spinnerStore.setLoading(true);
    await this.coursesStore.search(value);
    this.spinnerStore.setLoading(false);
  }

  async getCurrentUser(): Promise<void> {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const result = await getQuery().get<User>(getUrlWithHost(AuthorizationUrls.LOGGED));
        if (result.status === 200) {
          this.user = result.data;
        } else {
          localStorage.removeItem('token');
        }
      } catch {
        localStorage.removeItem('token');
      }
    }
  }

  async addReview(data: Review): Promise<boolean> {
    this.spinnerStore.setLoading(true);
    try {
      const result = await getQuery().post<Review>(getUrlWithHost(ReviewsUrls.BASE), data);
      if (result.status === 201) {
        const course = await getQuery().get<Course>(getUrlWithHost(CoursesUrls.BASE + `/${this.course.id}`));
        await this.coursesStore.load();
        this.setCourse(course.data);
      }
      return result.status === 201;
    } catch {
      return false;
    } finally {
      this.spinnerStore.setLoading(false);
    }
  }

  async logout(): Promise<void> {
    localStorage.removeItem('token');
    this.user = null;
  }

  async register(data: unknown): Promise<boolean> {
    this.spinnerStore.setLoading(true);
    try {
      const result = await getQuery().post<User>(getUrlWithHost(AuthorizationUrls.REGISTRATION), data);
      return result.status === 201;
    } catch {
      return false;
    } finally {
      this.spinnerStore.setLoading(false);
    }
  }

  async subscribeToCourse(): Promise<void> {
    this.spinnerStore.setLoading(true);
    try {
      const result = await getQuery().put<unknown>(getUrlWithHost(UserUrls.SUBSCRIBE + this.course.id));
      if (result.status === 200) {
        const userLoggedResult = await getQuery().get<User>(getUrlWithHost(AuthorizationUrls.LOGGED));
        const courseResult = await getQuery().get<Course>(getUrlWithHost(CoursesUrls.BASE + `/${this.course.id}`));
        await this.coursesStore.load();
        this.user = userLoggedResult.data;
        this.setCourse(courseResult.data);
      }
    } finally {
      this.spinnerStore.setLoading(false);
    }
  }

  async login(data: unknown): Promise<boolean> {
    this.spinnerStore.setLoading(true);
    try {
      const result = await getQuery().post<{ username: string; token: string }>(
        getUrlWithHost(AuthorizationUrls.LOGIN),
        data,
      );
      if (result.status === 200) {
        localStorage.setItem('token', result.data.token);
        const userResponse = await getQuery().get<User>(getUrlWithHost(AuthorizationUrls.LOGGED));
        this.user = userResponse.data;
        this.spinnerStore.setLoading(false);
        return true;
      } else {
        this.spinnerStore.setLoading(false);
        return false;
      }
    } catch {
      return false;
    } finally {
      this.spinnerStore.setLoading(false);
    }
  }

  loadCourseById(id: number): void {
    const result = this.coursesStore.getCourseByIdentity(id);
    if (this.currentPath.length > 1) {
      this.setCurrentPath(getPathWithDetailedCourse(this.currentPath, result));
    } else {
      this.setCurrentPath([HomePath, null, null, result]);
    }
    this.setCourse(result);
  }

  loadCoursesByIdentityAndType(type: 'section' | 'subject', id: string): void {
    const identity = +id;
    this.spinnerStore.setLoading(true);
    switch (type) {
      case 'section':
        const section = this.sectionStore.getSectionByIdentity(identity);
        const subjects = this.subjectStore.getSubjectsBySectionIdentity(identity);
        const courses = this.coursesStore.getCoursesBySubjectIdentities(subjects.map((subject) => subject.id));
        this.coursesStore.setCourses(courses);
        this.coursesStore.setCurrentCourses(courses);
        if (!courses.length) {
          this.coursesStore.setMessage('Ничего не найдено');
        } else {
          this.coursesStore.setMessage(DEFAULT_MESSAGE);
        }
        this.setCurrentPath([HomePath, section]);
        break;
      default:
        const subject = this.subjectStore.getSubjectByIdentity(identity);
        const sectionForSubject = this.sectionStore.getSectionByIdentity(subject.section.id);
        const coursesForSubject = this.coursesStore.getCoursesBySubjectIdentities([subject.id]);
        this.coursesStore.setCourses(coursesForSubject);
        this.coursesStore.setCurrentCourses(coursesForSubject);
        if (!coursesForSubject.length) {
          this.coursesStore.setMessage('Ничего не найдено');
        } else {
          this.coursesStore.setMessage(DEFAULT_MESSAGE);
        }
        this.setCurrentPath([HomePath, sectionForSubject, subject]);
        break;
    }
    this.spinnerStore.setLoading(false);
  }
}

export const appStoreContext = createContext(new AppStore(spinnerStore, coursesStore, sectionStore, subjectStore));

const getPathWithDetailedCourse = (currentPath: BreadcrumbsPath, course: Course): BreadcrumbsPath => {
  const result: BreadcrumbsPath = [HomePath];
  if (currentPath.length === 2) {
    result.push(currentPath[1]);
    result.push(null);
    result.push(course);
  }
  if (currentPath.length === 3) {
    result.push(currentPath[1]);
    result.push(currentPath[2]);
    result.push(course);
  }
  return result;
};
