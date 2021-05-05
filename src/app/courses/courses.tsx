import { observer } from 'mobx-react';
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import { List } from '../../components';
import { AppStore, appStoreContext } from '../../store/app.store';
import { CoursesStore, coursesStoreContext } from '../../store/courses.store';
import { convertToListItems } from '../../suite';
import './courses.scss';

interface CourseParams {
  itemId: string;
}

interface CoursesProps {
  type?: 'section' | 'subject';
}

export const Courses: React.FC<CoursesProps> = observer((props) => {
  const coursesStore: CoursesStore = useContext(coursesStoreContext);
  const appStore: AppStore = useContext(appStoreContext);
  const params: CourseParams = useParams();
  useEffect(() => {
    if (params.itemId && props.type) {
      appStore.loadCoursesByIdentityAndType(props.type, params.itemId);
    }
  }, [params.itemId, props.type]);
  return (
    <>
      <div className={'message'}>{coursesStore.message}</div>
      <List ratingReadonly items={convertToListItems(coursesStore.courses)}></List>
    </>
  );
});
