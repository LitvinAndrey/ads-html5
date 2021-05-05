import { Course } from './course';
import { Section } from './section';
import { Subject } from './subject';

export interface RootPath {
  value: string;
  label: string;
}

export const HomePath: RootPath = {
  value: '',
  label: 'Главная',
};

export const LoginPath: RootPath = {
  value: 'login',
  label: 'Авторизация',
};
export const RegistrationPath: RootPath = {
  value: 'registration',
  label: 'Регистрация',
};

export type BreadcrumbsPath = [RootPath, Section?, Subject?, Course?];
