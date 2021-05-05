import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react';
import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router';
import { sectionStoreContext } from '../../../store/sections.store';
import { subjectStoreContext } from '../../../store/subjects.store';
import { Section, Subject } from '../../../suite';
import './section-navigation.scss';

export const SectionNavigation = observer(
  withRouter((props) => {
    const [hoveredSection, setHoveredSection] = useState<Section | null>(null);
    const sectionStore = useContext(sectionStoreContext);
    const subjectStore = useContext(subjectStoreContext);
    const onSectionMouseEnter = (section: Section) => {
      setHoveredSection(section);
    };
    const onSectionClick = (item: Section | Subject, type: 'section' | 'subject') => {
      props.history.push(`/${type}/${item.id}`);
    };
    return (
      <div className={'sections-container'}>
        <div className={'sections'}>
          {sectionStore.sections.map((section) => (
            <div
              key={section.id}
              onMouseEnter={() => onSectionMouseEnter(section)}
              className={`section-container ${hoveredSection && hoveredSection.id === section.id ? 'active' : ''}`}
              onClick={() => onSectionClick(section, 'section')}
            >
              <div className={'section-name noselect'}>{section.name}</div>
              <div className={'section-icon'}>
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
            </div>
          ))}
        </div>
        {hoveredSection &&
        subjectStore.subjects.length &&
        getSubjectsBySection(subjectStore.subjects, hoveredSection).length ? (
          <div className={'subjects'}>
            {getSubjectsBySection(subjectStore.subjects, hoveredSection).map((subject) => (
              <div key={subject.id} className={'subject-container'} onClick={() => onSectionClick(subject, 'subject')}>
                <div className={'subject-name noselect'}>{subject.name}</div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }),
);

const getSubjectsBySection = (subjects: Subject[], activeSection: Section) => {
  return subjects.filter((subject) => subject.section && subject.section.id === activeSection.id);
};
