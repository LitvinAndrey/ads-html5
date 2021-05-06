import { observer } from 'mobx-react';
import React, { useContext, useRef } from 'react';
import { Button, FormControl, InputGroup, Navbar } from 'react-bootstrap';
import { Route, Switch } from 'react-router';
import { AppStore, appStoreContext } from '../../store/app.store';
import { NavigationTrigger } from '../navigation-trigger/navigation-trigger';
import './navigation-bar.scss';
import { RightButtons } from './right-buttons/right-buttons';

export const NavigationBar: React.FC = observer(() => {
  const controlRef = useRef(null);

  const appStore: AppStore = useContext(appStoreContext);

  const onSearchClick = () => {
    if (controlRef && controlRef.current) {
      appStore.searchByValue(controlRef.current.value || '');
    }
  };
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">
        <img src="./logo512.png" width="30" height="30" className="d-inline-block align-top" alt="Roman here" />
      </Navbar.Brand>
      <NavigationTrigger />
      <Switch>
        <Route path={'/detail/:id'}>
          <div className={'test'} />
        </Route>
        <Route path={'/login'}>
          <div />
        </Route>
        <Route path={'/registration'}>
          <div />
        </Route>
        <Route path={'/user-courses'}>
          <div />
        </Route>
        <Route>
          <InputGroup className={'search-input'}>
            <FormControl
              ref={controlRef}
              placeholder="Введите для поиска курсов"
              aria-label="Введите для поиска курсов"
              aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
              <Button onClick={onSearchClick} variant="outline-secondary">
                Поиск
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Route>
      </Switch>
      <RightButtons />
    </Navbar>
  );
});
