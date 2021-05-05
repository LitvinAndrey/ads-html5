import { observer } from 'mobx-react';
import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { appStoreContext } from '../../../store/app.store';
import './right-buttons.scss';

export const RightButtons = observer(
  withRouter((props) => {
    const appStore = useContext(appStoreContext);

    const navigateToLogin = () => {
      props.history.push('/login');
    };

    const navigateToRegistration = () => {
      props.history.push('/registration');
    };
    return (
      <div className={'right-buttons-container'}>
        {!appStore.user ? (
          <>
            <Button onClick={navigateToLogin}>Войти</Button>
            <Button onClick={navigateToRegistration}>Регистрация</Button>
          </>
        ) : (
          <span>{appStore.user.login}</span>
        )}
      </div>
    );
  }),
);
