import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import './navigation-trigger.scss';
import { SectionNavigation } from './section-navigation/section-navigation';

export const NavigationTrigger: React.FC = () => {
  return (
    <OverlayTrigger
      trigger={'click'}
      placement={'bottom'}
      rootClose
      overlay={
        <Popover id={'test'}>
          <Popover.Content>
            <SectionNavigation />
          </Popover.Content>
        </Popover>
      }
    >
      <span className={'trigger noselect'}>Категории</span>
    </OverlayTrigger>
  );
};
