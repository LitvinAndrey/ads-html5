import { makeAutoObservable } from 'mobx';
import { createContext } from 'react';
import { AuthorizationUrls, Course, getQuery, getUrlWithHost, User } from '../suite';
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
    } finally {
      this.spinnerStore.setLoading(false);
      return false;
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
