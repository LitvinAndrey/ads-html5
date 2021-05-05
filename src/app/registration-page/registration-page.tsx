import React, { useContext, useEffect } from 'react';
import { appStoreContext } from '../../store/app.store';
import { RegistrationPath } from '../../suite/models/breadcrumbs-path';
import './registration-page.scss';

export const RegistrationPage: React.FC = () => {
  const appStore = useContext(appStoreContext);
  useEffect(() => {
    appStore.setCurrentPath([RegistrationPath]);
  }, []);
  return <div className={'message'}>Регистрация</div>;
};
