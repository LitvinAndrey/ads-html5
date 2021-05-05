import { makeAutoObservable } from 'mobx';
import { createContext } from 'react';
import { getQuery, getUrlWithHost, Section, SectionsUrls } from '../suite';
// //STUB
// const stubSection: Section = {
//   name: 'Мастурбация',
// };

// //STUB
// const loadSections = new Promise<Section[]>((resolve) => {
//   const result: Section[] = [];
//   for (let index = 0; index < 7; index++) {
//     result.push({ ...stubSection, id: index, name: `${stubSection.name}${index}` });
//   }
//   setTimeout(() => {
//     resolve(result);
//   }, 1000);
// });

export class SectionStore {
  sections: Section[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  async load(): Promise<void> {
    const sections = await getQuery().get<Section[]>(getUrlWithHost(SectionsUrls.BASE));
    this.sections = sections.data;
  }

  getSectionByIdentity(identity: number): Section {
    return this.sections.find((section) => section.id === identity);
  }
}

export const sectionStore = new SectionStore();

export const sectionStoreContext = createContext(sectionStore);
