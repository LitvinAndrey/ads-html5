import { observer } from 'mobx-react';
import React, { useContext } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { appStoreContext } from '../../store/app.store';
import './breadcrumbs.scss';

export const BreadcrumbsComponent: React.FC = observer(() => {
  const { currentPath } = useContext(appStoreContext);
  return (
    <div className={'breadcrumbs-container'}>
      <Breadcrumb>
        {currentPath[0] ? (
          <Breadcrumb.Item active={currentPath.length === 1} href={`/${currentPath[0].value}`}>
            {currentPath[0].label}
          </Breadcrumb.Item>
        ) : null}
        {currentPath.length > 1 && currentPath[1] ? (
          <Breadcrumb.Item active={currentPath.length === 2} href={`#/section/${currentPath[1].id}`}>
            {currentPath[1].name}
          </Breadcrumb.Item>
        ) : null}
        {currentPath.length > 2 && currentPath[2] ? (
          <Breadcrumb.Item active={currentPath.length === 3} href={`#/subject/${currentPath[2].id}`}>
            {currentPath[2].name}
          </Breadcrumb.Item>
        ) : null}
        {currentPath.length > 3 && currentPath[3] ? (
          <Breadcrumb.Item active href={`#/detail/${currentPath[3].id}`}>
            {currentPath[3].nameOfCourse}
          </Breadcrumb.Item>
        ) : null}
      </Breadcrumb>
    </div>
  );
});
