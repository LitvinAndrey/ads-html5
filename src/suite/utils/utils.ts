import moment from 'moment';
import { ListItem, ListItemAttribute } from '../../components';
import { Course } from '../models/course';
import { ReviewShort } from '../models/review-short';

export const generateRandomId = (): number => {
  return Math.floor(Math.random() * 100000000);
};

export const getAttributeValue = (value: string | number | Date): string | number => {
  switch (typeof value) {
    case 'string':
    case 'number':
      return value;
    default:
      return moment(value).format('DD-MM-YYYY');
  }
};

export const convertToListItems = (courses: Course[]): ListItem[] => {
  return courses.map((course) => ({
    identity: course.id || Date.now(),
    rating: calculateRating(course.reviews),
    name: course.nameOfCourse,
    attributes: getAttributesForCourse(course),
    status: course.status,
  }));
};

export const calculateRating = (reviews: ReviewShort[]): number => {
  if (!reviews.length) {
    return 0;
  }
  return (
    reviews.map((review) => review.rating).reduce((accumulator, currentValue) => accumulator + currentValue) /
    (reviews.length || 1)
  );
};

export const getAttributesForCourse = (course: Course): ListItemAttribute[] => {
  return [
    {
      label: 'Количество часов:',
      value: course.amountHours,
    },
    {
      label: 'Начало курса:',
      value: course.beginDate,
    },
    {
      label: 'Конец курса:',
      value: course.endDate,
    },
    {
      label: 'Количество уроков:',
      value: course.size,
    },
    {
      label: 'Количество записанных участников:',
      value: course.users.length,
    },
  ];
};
