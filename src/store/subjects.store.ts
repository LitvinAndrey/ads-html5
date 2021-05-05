import { makeAutoObservable } from 'mobx';
import { createContext } from 'react';
import { getQuery, getUrlWithHost, Subject, SubjectsUrls } from '../suite';
// //STUB
// const stubSubject: Subject = {
//   name: 'ТемаДрочки',
// };

// //STUB
// const loadSubjects = new Promise<Subject[]>((resolve) => {
//   const result: Subject[] = [];
//   for (let index = 0; index < 7; index++) {
//     const section: Section = {
//       id: index,
//       name: 'Test',
//     };
//     for (let row = 0; row < 10; row++) {
//       result.push({
//         ...stubSubject,
//         id: generateRandomId(),
//         section: section,
//         name: `${stubSubject.name}${row} для ${section.name}${index}`,
//       });
//     }
//   }
//   result.push({
//     ...stubSubject,
//     id: 12345,
//     section: { id: 1, name: 'Test' },
//     name: 'Топовый курс',
//   });
//   setTimeout(() => {
//     resolve(result);
//   }, 1000);
// });

export class SubjectStore {
  subjects: Subject[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async load(): Promise<void> {
    const subjects = await getQuery().get<Subject[]>(getUrlWithHost(SubjectsUrls.BASE));
    this.subjects = subjects.data;
  }

  getSubjectByIdentity(identity: number): Subject {
    return this.subjects.find((subject) => subject.id === identity);
  }

  getSubjectsBySectionIdentity(identity: number): Subject[] {
    return this.subjects.filter((subject) => subject.section && subject.section.id === identity);
  }
}

export const subjectStore = new SubjectStore();

export const subjectStoreContext = createContext(subjectStore);
