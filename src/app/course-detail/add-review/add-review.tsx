import React, { useContext, useState } from 'react';
import './add-review.scss';
import { RatingComponent } from '../../../components';
import { Button } from 'react-bootstrap';
import { observer } from 'mobx-react';
import { appStoreContext } from '../../../store/app.store';
import { Course } from '../../../suite';

export interface AddReviewProps {
  course: Course;
}

export const AddReviewComponent: React.FC<AddReviewProps> = observer((props) => {
  const [reviewValue, setReviewValue] = useState('');
  const [ratingValue, setRatingValue] = useState(0);

  const appStore = useContext(appStoreContext);

  const handleReviewAdd = () => {
    appStore
      .addReview({
        course: {
          id: props.course.id,
          nameOfCourse: props.course.nameOfCourse,
          status: props.course.status,
        },
        message: reviewValue,
        rating: ratingValue,
      })
      .then((result) => {
        if (result) {
          setReviewValue('');
          setRatingValue(0);
        }
      });
  };

  const onChangeRating = (value: number) => {
    setRatingValue(value);
  };

  return (
    <div className={'add-review-container'}>
      <label>Оставьте свой отзыв:</label>
      <textarea value={reviewValue} onChange={(event) => setReviewValue(event.target.value)} />
      <RatingComponent value={ratingValue} readonly={false} notDispalyRating changeRating={onChangeRating} />
      <Button disabled={!(!!reviewValue && !!ratingValue)} onClick={handleReviewAdd}>
        Отправить
      </Button>
    </div>
  );
});
