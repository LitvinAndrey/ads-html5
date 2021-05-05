export const getHostUrl = (): string => {
  return process.env['REACT_APP_HOST_URL'] || '/api';
};

export const getUrlWithHost = (url: string): string => {
  return getHostUrl() + url;
};

export enum CoursesUrls {
  BASE = '/courses',
}

export enum SubjectsUrls {
  BASE = '/subjects',
}

export enum SectionsUrls {
  BASE = '/sections',
}

export enum AuthorizationUrls {
  LOGIN = '/login',
  LOGGED = '/logged',
  REGISTRATION = '/registration',
}
