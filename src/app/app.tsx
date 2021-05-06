import React, { useContext, useEffect } from 'react';
import { Courses } from './courses/courses';
import { SpinnerStore, spinnerStoreContext } from '../store/spinner.store';
import { Spinner } from './spinner/spinner';
import './app.scss';
import { AppStore, appStoreContext } from '../store/app.store';
import { LoadPage } from './load-page/load-page';
import { observer } from 'mobx-react';
import { Route, Switch } from 'react-router';
import { Background } from './background/background';
import { NavigationBar } from './navigation-bar/navigation-bar';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs';
import { CourseDetail } from './course-detail/course-detail';
import { LoginPage } from './login-page/login-page';
import { RegistrationPage } from './registration-page/registration-page';
import { UserCourses } from './user-courses/user-courses';

export const App: React.FC = observer(() => {
  const spinnerStore: SpinnerStore = useContext(spinnerStoreContext);
  const appStore: AppStore = useContext(appStoreContext);

  useEffect(() => {
    appStore.init();
  }, []);

  return appStore.loaded ? (
    <div className={`app ${spinnerStore.loading ? 'loading' : ''}`}>
      <NavigationBar />
      <Background>
        <Switch>
          <Route path={'/subject/:itemId'}>
            <Courses type={'subject'} />
          </Route>
          <Route path={'/section/:itemId'}>
            <Courses type={'section'} />
          </Route>
          <Route path={'/detail/:id'}>
            <CourseDetail />
          </Route>
          <Route path={'/user-courses'}>
            <UserCourses />
          </Route>
          <Route path={'/login'}>
            <LoginPage />
          </Route>
          <Route path={'/registration'}>
            <RegistrationPage />
          </Route>
          <Route path={'/'}>
            <Courses />
          </Route>
        </Switch>
      </Background>
      <BreadcrumbsComponent />
      {spinnerStore.loading ? <Spinner /> : null}
    </div>
  ) : (
    <LoadPage />
  );
});
