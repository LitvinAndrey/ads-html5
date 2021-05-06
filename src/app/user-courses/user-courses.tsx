import React, { useContext, useEffect } from 'react';
import '../courses/courses.scss';
import { CoursesStore, coursesStoreContext } from '../../store/courses.store';
import { AppStore, appStoreContext } from '../../store/app.store';
import { List } from '../../components';
import { convertToListItems, Course } from '../../suite';
import { observer } from 'mobx-react';
import { UserCoursesPath } from '../../suite/models/breadcrumbs-path';

export const UserCourses: React.FC = observer(() => {
  const coursesStore: CoursesStore = useContext(coursesStoreContext);
  const appStore: AppStore = useContext(appStoreContext);

  useEffect(() => {
    appStore.setCurrentPath([UserCoursesPath]);
  });

  const getCoursesFromUser = (): Course[] => {
    return appStore.user
      ? appStore.user.courses.map((course) => {
          return coursesStore.getCourseByIdentity(course.id);
        })
      : [];
  };

  return (
    <>
      <div className={'message'}>Курсы пользователя</div>
      <List ratingReadonly items={convertToListItems(getCoursesFromUser())} />
    </>
  );
});
