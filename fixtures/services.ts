/**
 * Copyright (C) 2024 Graz University of Technology.
 * 
 * invenio-e2e is free software; you can redistribute it and/or
 * modify it under the terms of the ISC License; see LICENSE file for more
 * details.
 */

import { ServiceConfig, createServiceTest } from '@inveniosoftware/invenio-e2e';

import { locators as tugrazLocators } from '../locators';

export const tuGrazConfig: ServiceConfig = {
  name: 'TU Graz Repository',
  url: 'https://repository.tugraz.at/',
  languages: {
    supported: ['en', 'de'],
    default: 'en'
  },
  translations: {
    en: {
      welcome: 'Welcome',
      search: 'Search',
      browse: 'Browse',
      about: 'About',
      title: 'TU Graz Repository',
      'page.title': 'Home',
      'search.placeholder': 'Search...'
    },
    de: {
      welcome: 'Willkommen',
      search: 'Suchen',
      browse: 'Durchsuchen', 
      about: 'Über uns',
      title: 'TU Graz Repository',
      'page.title': 'Startseite',
      'search.placeholder': 'Suchen...'
    }
  }
};

export const test = createServiceTest(tuGrazConfig, tugrazLocators);
export const { expect } = test;
export { expect as baseExpect } from '@playwright/test'; 