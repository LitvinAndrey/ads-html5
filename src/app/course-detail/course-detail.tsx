import { observer } from 'mobx-react';
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import { NO_ITEM_PREVIEW_PATH, StatusComponent } from '../../components';
import { RatingComponent } from '../../components/rating/rating';
import { AppStore, appStoreContext } from '../../store/app.store';
import { calculateRating, getAttributesForCourse, getAttributeValue } from '../../suite';
import './course-detail.scss';

interface CourseDetailParams {
  id: string;
}

export const CourseDetail: React.FC = observer(() => {
  const { id } = useParams<CourseDetailParams>();
  const appStore: AppStore = useContext(appStoreContext);
  useEffect(() => {
    if (id) {
      appStore.loadCourseById(+id);
    }
    return () => {
      appStore.loadCourseById(-10000);
    };
  }, [id]);
  return appStore.course ? (
    <div className={'course-detail-container'}>
      <div className={'course-detail-name'}>{appStore.course.nameOfCourse}</div>
      <div className={'course-details'}>
        <img className={'preview'} src={appStore.course.preview || NO_ITEM_PREVIEW_PATH}></img>
        <div className={'attributes'}>
          {getAttributesForCourse(appStore.course).map((attribute) => (
            <div key={attribute.label} className="attribute-container">
              <div className={'attribute-label'}>{attribute.label}</div>
              <div className={'attribute-value'}>{getAttributeValue(attribute.value)}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={'rating'}>
        <div>Рейтинг - </div>
        <RatingComponent readonly value={calculateRating(appStore.course.reviews)} />
      </div>
      <div className={'lessons-name'}>Содержание</div>
      <div className={'lessons'}>
        {appStore.course.lessons.map((lesson, index) => (
          <div key={lesson.id} className={'lesson'}>
            <div className={'lesson-name'}>
              {`${index + 1}. ${lesson.nameLesson}`}
              <StatusComponent value={lesson.status} />
            </div>
          </div>
        ))}
        {appStore.course.lessons.length ? null : (
          <div className={'empty-lessons'}>В данный момент курс не содержит уроков</div>
        )}
      </div>
      <div className={'reviews-name'}>Отзывы</div>
      <div className={'reviews-unavailable'}>Только пользователи могут оставлять отзыв</div>
      <div className={'reviews'}>
        {appStore.course.reviews.map((review) => (
          <div key={review.id} className="review">
            <div className={'review-rating'}>
              <RatingComponent readonly value={review.rating} />
            </div>
            <div className={'review-message'}>{review.message}</div>
          </div>
        ))}
      </div>
    </div>
  ) : null;
});
