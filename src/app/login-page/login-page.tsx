import { observer } from 'mobx-react';
import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router';
import { appStoreContext } from '../../store/app.store';
import { LoginPath } from '../../suite/models/breadcrumbs-path';
import './login-page.scss';

export const LoginPage = observer(
  withRouter((props) => {
    const appStore = useContext(appStoreContext);

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    useEffect(() => {
      appStore.setCurrentPath([LoginPath]);
    }, []);

    const onSubmit = (data) => {
      appStore.login(data).then((result) => {
        if (result) {
          props.history.push('/');
        }
      });
    };

    return (
      <>
        <div className={'message'}>Авторизация</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={'form-input'}>
            <label>Логин:</label>
            <input placeholder={'Введите логин'} type={'text'} {...register('login', { required: true })} />
          </div>
          {errors.username && <span className={'error'}>Логин не должен быть пустым</span>}
          <div className={'form-input'}>
            <label>Пароль:</label>
            <input placeholder={'Введите пароль'} type={'password'} {...register('password', { required: true })} />
          </div>
          {errors.password && <span className={'error'}>Пароль не должен быть пустым</span>}
          <input type={'submit'} value={'Войти'} />
        </form>
      </>
    );
  }),
);
