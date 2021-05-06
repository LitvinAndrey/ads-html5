import React, { useContext, useEffect } from 'react';
import { appStoreContext } from '../../store/app.store';
import { RegistrationPath } from '../../suite/models/breadcrumbs-path';
import './registration-page.scss';
import { withRouter } from 'react-router';
import { observer } from 'mobx-react';
import { useForm } from 'react-hook-form';

export const RegistrationPage = observer(
  withRouter((props) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
      const requestData = {
        login: data.login,
        password: data.password,
        profile: {
          firstName: data.firstName,
          lastName: data.lastName,
          numberOfPhone: data.numberOfPhone,
        },
      };
      appStore.register(requestData).then((result) => {
        if (result) {
          props.history.push('/');
        }
      });
    };

    const appStore = useContext(appStoreContext);
    useEffect(() => {
      appStore.setCurrentPath([RegistrationPath]);
    }, []);

    return (
      <>
        <div className={'message'}>Регистрация</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={'form-input'}>
            <label>Логин:</label>
            <input placeholder={'Введите логин'} type={'text'} {...register('login', { required: true })} />
            {errors.login && <span className={'error'}>Логин не должен быть пустым</span>}
          </div>
          <div className={'form-input'}>
            <label>Пароль:</label>
            <input placeholder={'Введите пароль'} type={'password'} {...register('password', { required: true })} />
          </div>
          <div className={'form-input'}>
            <label>Имя:</label>
            <input placeholder={'Введите имя'} type={'text'} {...register('firstName')} />
          </div>
          <div className={'form-input'}>
            <label>Фамилия:</label>
            <input placeholder={'Введите фамилию'} type={'text'} {...register('lastName')} />
          </div>
          <div className={'form-input'}>
            <label>Номер телефона:</label>
            <input placeholder={'Введите номер телефона'} type={'text'} {...register('numberOfPhone')} />
          </div>
          <input type={'submit'} value={'Регистрация'} />
        </form>
      </>
    );
  }),
);
