import { observer } from 'mobx-react';
import React, { useContext } from 'react';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
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

    const handleLogout = () => {
      appStore.logout().then(() => {
        props.history.push('/');
      });
    };

    const handleUserCourses = () => {
      props.history.push('/user-courses');
    };

    return (
      <div className={'right-buttons-container'}>
        {!appStore.user ? (
          <>
            <Button onClick={navigateToLogin}>Войти</Button>
            <Button onClick={navigateToRegistration}>Регистрация</Button>
          </>
        ) : (
          <OverlayTrigger
            trigger={'click'}
            placement={'bottom'}
            rootClose
            overlay={
              <Popover id={'test'}>
                <Popover.Content>
                  <div className={'buttons-container'}>
                    <Button className={'logout-btn'} onClick={handleUserCourses}>
                      Мои курсы
                    </Button>
                    <Button className={'logout-btn'} onClick={handleLogout}>
                      Выход
                    </Button>
                  </div>
                </Popover.Content>
              </Popover>
            }
          >
            <span className={'trigger noselect'}>{appStore.user.login}</span>
          </OverlayTrigger>
        )}
      </div>
    );
  }),
);
